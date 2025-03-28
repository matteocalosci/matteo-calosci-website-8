"use client"

import { useState, useEffect } from "react"

export function useImagePreload(src: string) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (!src) return

    const img = new Image()
    img.src = src

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
  }, [src])

  return { isLoaded, dimensions }
}

