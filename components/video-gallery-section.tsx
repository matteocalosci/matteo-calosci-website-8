"use client"

import { useState, useRef } from "react"
import { useInView } from "framer-motion"
import { Play, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import ScrollReveal from "./scroll-reveal"
import { useMobile } from "@/hooks/use-mobile"

interface VideoItem {
  id: string
  title: string
  thumbnail: string
  category: string
}

export default function VideoGallerySection() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const isMobile = useMobile()

  // Updated video data with the specified videos
  const videos: VideoItem[] = [
    {
      id: "7bgyvRFdCXk",
      title: "Estrellita - Ponce",
      thumbnail: "/images/masterclass-1.jpg",
      category: "concerti",
    },
    {
      id: "6Occvm-a0Oo",
      title: "Beethoven Quartet",
      thumbnail: "/images/masterclass-2.jpg",
      category: "masterclass",
    },
  ]

  // Memoize filtered videos to avoid recalculation on every render
  const filteredVideos = activeFilter === "all" ? videos : videos.filter((video) => video.category === activeFilter)

  const filters = [
    { id: "all", label: "Tutti" },
    { id: "concerti", label: "Concerti" },
    { id: "masterclass", label: "Masterclass" },
    { id: "interviste", label: "Interviste" },
    { id: "backstage", label: "Backstage" },
  ]

  return (
    <section id="videos" className="py-16 md:py-20 px-4 md:px-6 lg:px-8 bg-white" ref={ref}>
      <div className="container mx-auto max-w-5xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center">Video</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-8">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                size={isMobile ? "sm" : "default"}
                onClick={() => setActiveFilter(filter.id)}
                className="transition-all duration-300 text-xs sm:text-sm"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {filteredVideos.map((video, index) => (
            <ScrollReveal key={`${video.id}-${index}`} delay={0.1 * index}>
              <div
                className="relative overflow-hidden rounded-lg cursor-pointer h-48 sm:h-56 md:h-64"
                onClick={() => setSelectedVideo(video.id)}
              >
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={`Thumbnail per ${video.title}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-primary/80 hover:bg-primary text-black h-12 w-12"
                  >
                    <Play className="h-6 w-6" />
                    <span className="sr-only">Riproduci video</span>
                  </Button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-white font-medium text-sm sm:text-base">{video.title}</h3>
                  <div className="absolute top-2 right-2 bg-primary text-black text-xs px-2 py-1 rounded-full capitalize">
                    {video.category}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {selectedVideo && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/10 z-10"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedVideo(null)
              }}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Chiudi</span>
            </Button>

            <div className="w-full max-w-4xl aspect-video" onClick={(e) => e.stopPropagation()}>
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

