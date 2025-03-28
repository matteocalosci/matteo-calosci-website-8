"use client"

import { useState, useEffect, useRef } from "react"
import Script from "next/script"
import { Play } from "lucide-react"

import { Button } from "@/components/ui/button"

interface MobileOptimizedVideoProps {
  videoId: string
  fallbackImageUrl: string
}

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

export default function MobileOptimizedVideo({ videoId, fallbackImageUrl }: MobileOptimizedVideoProps) {
  const [isApiReady, setIsApiReady] = useState(false)
  const [isPlayerReady, setIsPlayerReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [autoplayFailed, setAutoplayFailed] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const playerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const playerCheckIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const apiLoadAttemptedRef = useRef(false)

  // Initialize YouTube API
  useEffect(() => {
    if (typeof window === "undefined") return

    if (apiLoadAttemptedRef.current) return
    apiLoadAttemptedRef.current = true

    // Define callback for when API is ready
    window.onYouTubeIframeAPIReady = () => {
      setIsApiReady(true)
    }

    // Check if API is already loaded
    if (window.YT && window.YT.Player) {
      setIsApiReady(true)
    }

    return () => {
      if (window.onYouTubeIframeAPIReady) {
        window.onYouTubeIframeAPIReady = () => {}
      }
    }
  }, [])

  // Initialize player when API is ready
  useEffect(() => {
    if (!isApiReady || !containerRef.current) return

    const initializePlayer = () => {
      if (!containerRef.current) return

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
          playsinline: 1, // Critical for iOS
          rel: 0,
          showinfo: 0,
          mute: 1, // Muted for autoplay to work
          playlist: videoId, // Required for looping
          enablejsapi: 1,
        },
        height,
        width,
        events: {
          onReady: (event: any) => {
            // Store reference to player
            playerRef.current = event.target
            setIsPlayerReady(true)

            // Try to play the video
            event.target.playVideo()

            // Set up a check to see if the video actually started playing
            // This helps detect if autoplay was blocked
            playerCheckIntervalRef.current = setTimeout(() => {
              if (playerRef.current && playerRef.current.getPlayerState) {
                const playerState = playerRef.current.getPlayerState()
                // If not playing (1 is PLAYING state in YouTube API)
                if (playerState !== 1) {
                  setAutoplayFailed(true)
                } else {
                  setIsPlaying(true)
                }
              }
            }, 2500) // Give it some time to start
          },
          onStateChange: (event: any) => {
            // Update playing state
            const isNowPlaying = event.data === window.YT.PlayerState.PLAYING
            setIsPlaying(isNowPlaying)

            if (isNowPlaying) {
              setAutoplayFailed(false)
            }

            // If video ends, restart it (additional safety for looping)
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.playVideo()
            }
          },
          onError: (event: any) => {
            console.error("YouTube player error:", event.data)
            setAutoplayFailed(true)
          },
        },
      })
    }

    initializePlayer()

    // Handle window resize
    const handleResize = () => {
      if (containerRef.current && playerRef.current && playerRef.current.setSize) {
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

    // Handle orientation change specifically
    const handleOrientationChange = () => {
      setTimeout(handleResize, 300) // Delay to allow orientation to complete
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("orientationchange", handleOrientationChange)

    // Initial sizing
    setTimeout(handleResize, 100)

    return () => {
      if (playerCheckIntervalRef.current) {
        clearTimeout(playerCheckIntervalRef.current)
      }

      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy()
      }

      window.removeEventListener("resize", handleResize)
      window.removeEventListener("orientationchange", handleOrientationChange)
    }
  }, [isApiReady, videoId])

  // Handle play button click
  const handlePlayClick = () => {
    setHasInteracted(true)

    if (playerRef.current && playerRef.current.playVideo) {
      playerRef.current.playVideo()
      setAutoplayFailed(false)
    } else {
      // If player isn't ready yet, we'll need to reinitialize
      setIsApiReady(true)
    }

    // Add a class to the document body to indicate user has interacted
    // This can be useful for other components that need to know
    if (typeof document !== "undefined") {
      document.body.classList.add("user-has-interacted")
    }
  }

  // Handle document visibility changes to pause/resume video
  // This improves performance when tab is not visible
  useEffect(() => {
    if (typeof document === "undefined") return

    const handleVisibilityChange = () => {
      if (!playerRef.current || !playerRef.current.getPlayerState) return

      if (document.hidden) {
        // Page is hidden, pause video to save resources
        if (playerRef.current.getPlayerState() === 1) {
          // 1 = playing
          playerRef.current.pauseVideo()
        }
      } else {
        // Page is visible again, resume if it was playing
        if (isPlaying) {
          playerRef.current.playVideo()
        }
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [isPlaying])

  // Add touch event listeners to help with autoplay on some mobile browsers
  useEffect(() => {
    if (typeof document === "undefined") return

    const handleTouch = () => {
      if (autoplayFailed && playerRef.current && playerRef.current.playVideo) {
        playerRef.current.playVideo()
        setHasInteracted(true)
      }
    }

    if (autoplayFailed) {
      document.addEventListener("touchstart", handleTouch, { once: true })
    }

    return () => {
      document.removeEventListener("touchstart", handleTouch)
    }
  }, [autoplayFailed])

  return (
    <>
      <Script src="https://www.youtube.com/iframe_api" strategy="afterInteractive" />

      <div className="absolute inset-0 overflow-hidden" ref={containerRef}>
        {/* Fallback image that shows while video is loading */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${isPlaying ? "opacity-0" : "opacity-100"}`}
          style={{ backgroundImage: `url(${fallbackImageUrl})` }}
        />

        <div className="absolute inset-0 bg-black/40 z-10" aria-hidden="true"></div>

        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div id="youtube-player" className="absolute inset-0"></div>
        </div>

        {!isPlayerReady && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {(autoplayFailed || hasInteracted === false) && isPlayerReady && (
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <Button
              onClick={handlePlayClick}
              size="lg"
              className="rounded-full w-20 h-20 bg-primary/80 hover:bg-primary text-black shadow-lg transform transition-transform hover:scale-110"
            >
              <Play className="h-10 w-10" />
              <span className="sr-only">Play Video</span>
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

