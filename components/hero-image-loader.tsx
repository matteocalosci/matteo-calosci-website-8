"use client"

import { useState, useEffect } from "react"

interface HeroImageLoaderProps {
  imageUrl: string
  isMobile: boolean
}

export default function HeroImageLoader({ imageUrl, isMobile }: HeroImageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const img = new Image()
    img.src = imageUrl
    img.onload = () => {
      setIsLoading(false)
      setImageDimensions({
        width: img.width,
        height: img.height,
      })
    }

    return () => {
      img.onload = null
    }
  }, [imageUrl])

  // Calculate the appropriate background size to ensure the entire image is visible
  const getBackgroundSize = () => {
    if (typeof window === "undefined") return "contain"

    const containerHeight = window.innerHeight
    const containerWidth = window.innerWidth

    const containerAspect = containerWidth / containerHeight
    const imageAspect = imageDimensions.width / imageDimensions.height

    // If image is wider than container (relative to height), use 'auto 100%'
    // Otherwise use '100% auto'
    return imageAspect > containerAspect ? "auto 100%" : "100% auto"
  }

  if (isLoading) {
    return (
      <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-white text-sm">Caricamento immagine...</p>
        </div>
      </div>
    )
  }

  if (isMobile) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" aria-hidden="true"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="infinite-scroll-container">
            <div
              className="infinite-scroll-image"
              style={{
                backgroundImage: `url('${imageUrl}')`,
                backgroundSize: getBackgroundSize(),
              }}
            ></div>
            <div
              className="infinite-scroll-image"
              style={{
                backgroundImage: `url('${imageUrl}')`,
                backgroundSize: getBackgroundSize(),
              }}
            ></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: `url('${imageUrl}')`,
      }}
    >
      <div className="absolute inset-0 bg-black/60" aria-hidden="true"></div>
    </div>
  )
}

