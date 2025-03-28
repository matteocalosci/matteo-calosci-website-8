"use client"

import { useState, useEffect, useRef } from "react"
import Script from "next/script"

interface VideoBackgroundProps {
  videoId: string
  fallbackImageUrl: string
}

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

export default function VideoBackground({ videoId, fallbackImageUrl }: VideoBackgroundProps) {
  const [isApiReady, setIsApiReady] = useState(false)
  const [isPlayerReady, setIsPlayerReady] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const playerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Check device type
  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const mobile = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(userAgent)
      const ios = /iphone|ipad|ipod/i.test(userAgent)

      setIsMobile(mobile)
      setIsIOS(ios)
    }

    checkDevice()
  }, [])

  // Initialize YouTube API
  useEffect(() => {
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
      window.onYouTubeIframeAPIReady = () => {}
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
        onReady: (event) => {
          event.target.playVideo()
          setIsPlayerReady(true)
        },
        onStateChange: (event) => {
          // If video ends, restart it (additional safety for looping)
          if (event.data === window.YT.PlayerState.ENDED) {
            event.target.playVideo()
          }
        },
        onError: (event) => {
          console.error("YouTube player error:", event.data)
        },
      },
    })

    // Handle window resize
    const handleResize = () => {
      if (containerRef.current && playerRef.current) {
        const container = containerRef.current
        const width = container.clientWidth
        const height = container.clientHeight

        // Calculate the appropriate size to maintain aspect ratio
        // while filling the container
        const aspectRatio = 16 / 9 // Standard YouTube aspect ratio
        let newWidth = width
        let newHeight = width / aspectRatio

        if (newHeight < height) {
          newHeight = height
          newWidth = height * aspectRatio
        }

        playerRef.current.setSize(newWidth, newHeight)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Initial sizing

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy()
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [isApiReady, videoId])

  // If on iOS, show fallback image
  if (isIOS) {
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

