"use client"

import { useState, useEffect, useRef } from "react"
import { useYouTubePlayer } from "@/hooks/use-youtube-player"

interface EnhancedYouTubeBackgroundProps {
  videoId: string
  fallbackImageUrl: string
}

// Declare YT as a global variable to avoid Typescript errors
declare global {
  interface Window {
    YT: any
  }
}

export default function EnhancedYouTubeBackground({ videoId, fallbackImageUrl }: EnhancedYouTubeBackgroundProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Check device type
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
  }, [])

  // Handle container resizing
  useEffect(() => {
    if (typeof window === "undefined") return

    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        })
      }
    }

    updateSize()
    window.addEventListener("resize", updateSize)

    return () => window.removeEventListener("resize", updateSize)
  }, [])

  // Initialize YouTube player
  const { isPlayerReady } = useYouTubePlayer("youtube-background-player", {
    videoId,
    autoplay: true,
    loop: true,
    mute: true,
    controls: false,
    onReady: (player) => {
      // Ensure video is playing
      player.playVideo()

      // Set player size to match container
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current
        player.setSize(clientWidth, clientHeight)
      }
    },
    onStateChange: (event) => {
      // Additional handling for state changes if needed
      if (event.data === window.YT.PlayerState.ENDED) {
        event.target.playVideo()
      }
    },
  })

  // For iOS devices, show fallback image (iOS has strict autoplay policies)
  if (isIOS) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${fallbackImageUrl})` }} />
      </div>
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 bg-black/40 z-10" aria-hidden="true"></div>

      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div id="youtube-background-player" className="absolute inset-0"></div>
      </div>

      {!isPlayerReady && (
        <div className="absolute inset-0 bg-black flex items-center justify-center z-20">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
}

