"use client"

import { useState, useEffect, useRef } from "react"
import Script from "next/script"

interface YouTubeVideoBackgroundProps {
  videoId: string
  fallbackImageUrl: string
}

// Declare YT as a global variable to satisfy TypeScript
declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

export default function YouTubeVideoBackground({ videoId, fallbackImageUrl }: YouTubeVideoBackgroundProps) {
  const [isApiReady, setIsApiReady] = useState(false)
  const [isPlayerReady, setIsPlayerReady] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const playerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Check if device is mobile or iOS
  useEffect(() => {
    if (typeof window === "undefined") return

    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const mobile = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(userAgent)
      const ios = /iphone|ipad|ipod/i.test(userAgent)

      setIsMobile(mobile)
      setIsIOS(ios)
    }

    checkDevice()

    // Handle window resize
    const handleResize = () => {
      if (containerRef.current && playerRef.current) {
        const container = containerRef.current
        const width = container.clientWidth
        const height = container.clientHeight

        playerRef.current.setSize(width, height)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Initialize YouTube API
  useEffect(() => {
    if (typeof window === "undefined") return

    if (!window.YT) {
      // YouTube API will call this function when ready
      window.onYouTubeIframeAPIReady = () => {
        setIsApiReady(true)
      }
    } else {
      setIsApiReady(true)
    }

    return () => {
      // Cleanup
      if (window.onYouTubeIframeAPIReady) {
        window.onYouTubeIframeAPIReady = () => {}
      }
    }
  }, [])

  // Initialize player when API is ready
  useEffect(() => {
    if (!isApiReady || !containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Create YouTube player
    playerRef.current = new window.YT.Player("youtube-player", {
      videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3, // Hide annotations
        loop: 1,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
        showinfo: 0,
        mute: 1, // Muted for autoplay to work
        playlist: videoId, // Required for looping
      },
      height,
      width,
      events: {
        onReady: (event: any) => {
          event.target.playVideo()
          setIsPlayerReady(true)
        },
        onStateChange: (event: any) => {
          // If video ends, restart it (additional safety for looping)
          if (event.data === window.YT.PlayerState.ENDED) {
            event.target.playVideo()
          }
        },
        onError: (event: any) => {
          console.error("YouTube player error:", event.data)
        },
      },
    })

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy()
      }
    }
  }, [isApiReady, videoId])

  // If on iOS or mobile with autoplay restrictions, show fallback image
  if (isIOS || (isMobile && !isPlayerReady)) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${fallbackImageUrl})` }} />
      </div>
    )
  }

  return (
    <>
      <Script src="https://www.youtube.com/iframe_api" strategy="afterInteractive" />

      <div className="absolute inset-0 overflow-hidden" ref={containerRef}>
        <div className="absolute inset-0 bg-black/40 z-10" aria-hidden="true"></div>

        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div id="youtube-player" className="absolute inset-0"></div>
        </div>

        {!isPlayerReady && (
          <div className="absolute inset-0 bg-black flex items-center justify-center z-20">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </>
  )
}

