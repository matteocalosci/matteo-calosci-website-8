"use client"

import { useSeamlessScroll } from "@/hooks/use-seamless-scroll"

interface SeamlessScrollBackgroundProps {
  imageUrl: string
}

export default function SeamlessScrollBackground({ imageUrl }: SeamlessScrollBackgroundProps) {
  const { isLoaded } = useSeamlessScroll(imageUrl)

  if (!isLoaded) {
    return (
      <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-black/60 z-10" aria-hidden="true"></div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="infinite-scroll-container">
          <div
            className="infinite-scroll-image"
            style={{
              backgroundImage: `url('${imageUrl}')`,
            }}
          ></div>
          <div
            className="infinite-scroll-image"
            style={{
              backgroundImage: `url('${imageUrl}')`,
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

