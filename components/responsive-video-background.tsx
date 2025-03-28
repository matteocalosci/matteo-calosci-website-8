"use client"

import { useState, useEffect, useRef } from "react"
import Script from "next/script"
import { Play } from "lucide-react"

import { Button } from "@/components/ui/button"

interface ResponsiveVideoBackgroundProps {
  videoId: string
  fallbackImageUrl: string
}

declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

export default function ResponsiveVideoBackground({ videoId, fallbackImageUrl }: ResponsiveVideoBackgroundProps) {
  const [isApiReady, setIsApiReady] = useState(false)
  const [isPlayerReady, setIsPlayerReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [showPlayButton, setShowPlayButton] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const playerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const apiLoadAttemptedRef = useRef(false)

  // Check device type and browser capabilities
  useEffect(() => {
    if (typeof window === "undefined") return

    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const mobile = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(userAgent)
      const ios = /iphone|ipad|ipod/i.test(userAgent)

      setIsMobile(mobile)
      setIsIOS(ios)

      // On mobile, we'll likely need user interaction
      if (mobile) {
        setShowPlayButton(true)
      }
    }

    checkDevice()
  }, [])

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
          autoplay: hasInteracted || !isMobile ? 1 : 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3, // Hide annotations
          loop: 1,
          modestbranding: 1,
          playsinline: 1, // Important for mobile
          rel: 0,
          showinfo: 0,
          mute: 1, // Muted for autoplay to work
          playlist: videoId, // Required for looping
        },
        height,
        width,
        events: {
          onReady: (event: any) => {
            // Store reference to player
            playerRef.current = event.target
            setIsPlayerReady(true)

            // On desktop or after interaction, play automatically
            if (!isMobile || hasInteracted) {
              event.target.playVideo()
              setIsPlaying(true)
            }
          },
          onStateChange: (event: any) => {
            // Update playing state
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING)

            // If video ends, restart it (additional safety for looping)
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.playVideo()
            }

            // Hide play button once video starts playing
            if (event.data === window.YT.PlayerState.PLAYING) {
              setShowPlayButton(false)
            }
          },
          onError: (event: any) => {
            console.error("YouTube player error:", event.data)
            // Show fallback on error
            setShowPlayButton(true)
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

    window.addEventListener("resize", handleResize)

    // Initial sizing
    setTimeout(handleResize, 100)

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy()
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [isApiReady, videoId, isMobile, hasInteracted])

  // Handle play button click
  const handlePlayClick = () => {
    setHasInteracted(true)

    if (playerRef.current && playerRef.current.playVideo) {
      playerRef.current.playVideo()
      setIsPlaying(true)
      setShowPlayButton(false)
    }

    // For iOS, we might need to reload the component
    if (isIOS && !isPlaying) {
      // Force a reload of the player
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy()
        playerRef.current = null

        // Small timeout to ensure DOM is updated
        setTimeout(() => {
          if (isApiReady && containerRef.current) {
            const container = containerRef.current
            const width = container.clientWidth
            const height = container.clientHeight

            playerRef.current = new window.YT.Player("youtube-player", {
              videoId,
              playerVars: {
                autoplay: 1,
                controls: 0,
                disablekb: 1,
                fs: 0,
                iv_load_policy: 3,
                loop: 1,
                modestbranding: 1,
                playsinline: 1,
                rel: 0,
                showinfo: 0,
                mute: 1,
                playlist: videoId,
              },
              height,
              width,
              events: {
                onReady: (event: any) => {
                  event.target.playVideo()
                  setIsPlayerReady(true)
                  setIsPlaying(true)
                },
                onStateChange: (event: any) => {
                  if (event.data === window.YT.PlayerState.PLAYING) {
                    setShowPlayButton(false)
                  }
                  if (event.data === window.YT.PlayerState.ENDED) {
                    event.target.playVideo()
                  }
                },
              },
            })
          }
        }, 100)
      }
    }
  }

  // For iOS devices where YouTube embedding is problematic, show a fallback image with play button
  if (isIOS && !hasInteracted) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${fallbackImageUrl})` }} />
        {showPlayButton && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <Button
              onClick={handlePlayClick}
              size="lg"
              className="rounded-full w-16 h-16 bg-primary/80 hover:bg-primary text-black"
            >
              <Play className="h-8 w-8" />
              <span className="sr-only">Play Video</span>
            </Button>
          </div>
        )}
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

        {showPlayButton && isPlayerReady && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <Button
              onClick={handlePlayClick}
              size="lg"
              className="rounded-full w-16 h-16 bg-primary/80 hover:bg-primary text-black"
            >
              <Play className="h-8 w-8" />
              <span className="sr-only">Play Video</span>
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

