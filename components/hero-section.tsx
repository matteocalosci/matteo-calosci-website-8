"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

// Using the image from prossimi eventi section
const HERO_IMAGE_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WEBSITE%20BG.tiff-5WyRsAlX0AiMAQGA9c4V92cQZviGpF.jpeg"
const HERO_MOBILE_IMAGE_URL = "/images/bg-mobile.jpg"

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  const isMobile = useMobile()

  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    // Only add mousemove effect on desktop
    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return

      const { clientX, clientY } = e
      const { width, height } = heroRef.current.getBoundingClientRect()

      setMousePosition({
        x: clientX / width - 0.5,
        y: clientY / height - 0.5,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isMobile])

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("biography")
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      ref={heroRef}
      className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden"
      aria-label="Sezione introduttiva di Matteo Calosci"
    >
      {/* Static image background instead of video */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/60 z-10" aria-hidden="true"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${isMobile ? HERO_MOBILE_IMAGE_URL : HERO_IMAGE_URL})`,
          }}
        />
      </div>

      <motion.div className="container relative z-20 text-center px-4" style={{ opacity }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Matteo Calosci
          </motion.h1>

          <motion.div
            className="h-0.5 w-20 bg-primary mx-auto"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          ></motion.div>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-white max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Violinista
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="pt-6 md:pt-8 flex justify-center"
          >
            <Button size={isMobile ? "default" : "lg"} className="bg-primary text-black hover:bg-primary/90" asChild>
              <Link href="/eventi" target="_blank">
                Next Masterclass
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 1.2,
        }}
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-white hover:bg-white/10"
            onClick={scrollToNextSection}
            aria-label="Scorri alla sezione biografia"
          >
            <ChevronDown className="h-6 w-6 md:h-8 md:w-8" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}

