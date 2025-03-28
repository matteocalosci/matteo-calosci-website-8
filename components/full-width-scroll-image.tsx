"use client"

import { useState, useEffect, useRef } from "react"

interface FullWidthScrollImageProps {
  imageUrl: string
}

export default function FullWidthScrollImage({ imageUrl }: FullWidthScrollImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Preload the image and get its dimensions
  useEffect(() => {
    const img = new Image()
    img.src = imageUrl
    img.onload = () => {
      setIsLoaded(true)
      setImageDimensions({
        width: img.width,
        height: img.height,
      })
    }

    return () => {
      img.onload = null
    }
  }, [imageUrl])

  if (!isLoaded) {
    return (
      <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  // Calculate the crop dimensions to make the image square
  const getSquareCropStyles = () => {
    if (imageDimensions.width <= 0 || imageDimensions.height <= 0) {
      return {}
    }

    // For landscape images (wider than tall)
    if (imageDimensions.width > imageDimensions.height) {
      // Use the height as the square dimension
      // Calculate how much to trim from each side
      const squareSize = imageDimensions.height
      const trimFromEachSide = (imageDimensions.width - squareSize) / 2
      const trimPercentage = (trimFromEachSide / imageDimensions.width) * 100

      return {
        // Crop equal amounts from left and right to make it square
        clipPath: `inset(0 ${trimPercentage}% 0 ${trimPercentage}%)`,
      }
    }
    // For portrait images (taller than wide)
    else if (imageDimensions.height > imageDimensions.width) {
      // Use the width as the square dimension
      // Calculate how much to trim from top and bottom
      const squareSize = imageDimensions.width
      const trimFromTopBottom = (imageDimensions.height - squareSize) / 2
      const trimPercentage = (trimFromTopBottom / imageDimensions.height) * 100

      return {
        // Crop equal amounts from top and bottom to make it square
        clipPath: `inset(${trimPercentage}% 0 ${trimPercentage}% 0)`,
      }
    }

    // If the image is already square, no cropping needed
    return {}
  }

  const squareCropStyles = getSquareCropStyles()

  return (
    <div className="absolute inset-0 overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 bg-black/60 z-10" aria-hidden="true"></div>

      <div className="absolute inset-0 overflow-hidden">
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            width: "200%",
            animation: "infiniteScroll 20s linear infinite",
            willChange: "transform",
          }}
        >
          {/* First copy of the image */}
          <div
            style={{
              width: "50%",
              height: "100%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <img
              src={imageUrl || "/placeholder.svg"}
              alt="Background"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                ...squareCropStyles,
              }}
            />
          </div>

          {/* Second copy of the image for seamless looping */}
          <div
            style={{
              width: "50%",
              height: "100%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <img
              src={imageUrl || "/placeholder.svg"}
              alt="Background"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                ...squareCropStyles,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

