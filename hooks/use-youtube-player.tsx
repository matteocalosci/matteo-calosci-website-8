"use client"

import { useState, useEffect, useRef } from "react"

interface UseYouTubePlayerOptions {
  videoId: string
  autoplay?: boolean
  loop?: boolean
  mute?: boolean
  controls?: boolean
  onReady?: (player: any) => void
  onStateChange?: (event: any) => void
  onError?: (event: any) => void
}

// Declare the YT variable to avoid TypeScript errors
declare global {
  interface Window {
    YT: any
    onYouTubeIframeAPIReady: () => void
  }
}

export function useYouTubePlayer(elementId: string, options: UseYouTubePlayerOptions) {
  const [isApiReady, setIsApiReady] = useState(false)
  const [isPlayerReady, setIsPlayerReady] = useState(false)
  const playerRef = useRef<any>(null)

  // Initialize YouTube API
  useEffect(() => {
    // Check if the API is already loaded
    if (window.YT && window.YT.Player) {
      setIsApiReady(true)
      return
    }

    // Define callback for when API is ready
    window.onYouTubeIframeAPIReady = () => {
      setIsApiReady(true)
    }

    // Load the API if it's not already loaded
    if (!document.getElementById("youtube-iframe-api")) {
      const tag = document.createElement("script")
      tag.id = "youtube-iframe-api"
      tag.src = "https://www.youtube.com/iframe_api"
      const firstScriptTag = document.getElementsByTagName("script")[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)
    }

    return () => {
      window.onYouTubeIframeAPIReady = () => {}
    }
  }, [])

  // Initialize player when API is ready
  useEffect(() => {
    if (!isApiReady || !document.getElementById(elementId)) return

    const {
      videoId,
      autoplay = true,
      loop = true,
      mute = true,
      controls = false,
      onReady,
      onStateChange,
      onError,
    } = options

    playerRef.current = new window.YT.Player(elementId, {
      videoId,
      playerVars: {
        autoplay: autoplay ? 1 : 0,
        controls: controls ? 1 : 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3, // Hide annotations
        loop: loop ? 1 : 0,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
        showinfo: 0,
        mute: mute ? 1 : 0,
        playlist: loop ? videoId : undefined, // Required for looping
      },
      events: {
        onReady: (event: any) => {
          setIsPlayerReady(true)
          if (onReady) onReady(event.target)
        },
        onStateChange: (event: any) => {
          // If video ends and loop is enabled, restart it
          if (loop && event.data === window.YT.PlayerState.ENDED) {
            event.target.playVideo()
          }
          if (onStateChange) onStateChange(event)
        },
        onError: (event: any) => {
          console.error("YouTube player error:", event.data)
          if (onError) onError(event)
        },
      },
    })

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy()
        playerRef.current = null
      }
    }
  }, [isApiReady, elementId, options])

  return {
    isApiReady,
    isPlayerReady,
    player: playerRef.current,
  }
}

