"use client"

import { useState, useEffect } from "react"

export function useSeamlessScroll(imageUrl: string) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (!imageUrl) return

    const img = new Image()
    img.src = imageUrl

    img.onload = () => {
      setIsLoaded(true)
      setDimensions({
        width: img.width,
        height: img.height,
      })
    }

    return () => {
      img.onload = null
    }
  }, [imageUrl])

  return { isLoaded, dimensions }
}

