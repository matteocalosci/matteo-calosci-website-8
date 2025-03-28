"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import ScrollReveal from "./scroll-reveal"
import { useMobile } from "@/hooks/use-mobile"

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const isMobile = useMobile()

  const images = [
    {
      src: "/images/masterclass-1.jpg",
      category: "masterclass",
    },
    {
      src: "/images/masterclass-2.jpg",
      category: "masterclass",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WEBSITE%20BG.tiff-5WyRsAlX0AiMAQGA9c4V92cQZviGpF.jpeg",
      category: "concerti",
    },
  ]

  const filteredImages = activeFilter === "all" ? images : images.filter((img) => img.category === activeFilter)

  const filters = [
    { id: "all", label: "Tutti" },
    { id: "masterclass", label: "Masterclass" },
    { id: "concerti", label: "Concerti" },
    { id: "backstage", label: "Backstage" },
  ]

  return (
    <section id="gallery" className="py-16 md:py-20 px-4 md:px-6 lg:px-8 bg-gray-50" ref={ref}>
      <div className="container mx-auto max-w-5xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center">Galleria</h2>
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

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4" layout>
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={`${image.src}-${index}`}
                className="relative overflow-hidden rounded-lg cursor-pointer h-48 sm:h-56 md:h-64"
                whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                onClick={() => setSelectedImage(image.src)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isInView ? 1 : 0,
                  scale: isInView ? 1 : 0.8,
                  transition: { delay: 0.1 * index },
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                layout
              >
                <motion.img
                  src={image.src}
                  alt={`Immagine galleria ${index + 1}`}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  layoutId={`image-${image.src}`}
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-medium">Visualizza</span>
                </div>

                <div className="absolute top-2 right-2 bg-primary text-black text-xs px-2 py-1 rounded-full capitalize">
                  {image.category}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/10 z-10"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Chiudi</span>
              </Button>

              <motion.img
                src={selectedImage}
                alt="Immagine galleria ingrandita"
                className="max-w-full max-h-[90vh] object-contain"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                layoutId={`image-${selectedImage}`}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

