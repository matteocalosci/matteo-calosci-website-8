"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Pause, Play, Volume2, VolumeX } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useMobile } from "@/hooks/use-mobile"

interface MusicPlayerProps {
  title: string
  duration: string
  audioSrc?: string
}

export default function MusicPlayer({ title, duration, audioSrc }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(70)
  const [isMuted, setIsMuted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [audioData, setAudioData] = useState<number[]>([])
  const [showVolumeControls, setShowVolumeControls] = useState(false)

  const isMobile = useMobile()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const animationRef = useRef<number>()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Create audio element
  useEffect(() => {
    audioRef.current = new Audio(audioSrc || "/audio/sample.mp3")
    audioRef.current.volume = volume / 100

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [audioSrc])

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.play()

      // Update progress
      const updateProgress = () => {
        if (!audioRef.current) return

        const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100
        setProgress(currentProgress)

        if (currentProgress >= 100) {
          setIsPlaying(false)
          setProgress(0)
          return
        }

        animationRef.current = requestAnimationFrame(updateProgress)
      }

      animationRef.current = requestAnimationFrame(updateProgress)
    } else {
      audioRef.current.pause()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying])

  // Handle volume change
  useEffect(() => {
    if (!audioRef.current) return

    audioRef.current.volume = isMuted ? 0 : volume / 100
  }, [volume, isMuted])

  // Generate visualization data
  useEffect(() => {
    if (!isPlaying || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const visualize = () => {
      // Generate random data for demo purposes
      // In a real app, you would use Web Audio API to analyze the audio
      const data = Array.from({ length: 64 }, () => Math.random() * 100)
      setAudioData(data)

      // Draw visualization
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const barWidth = canvas.width / data.length
      const barHeightMultiplier = canvas.height / 100

      data.forEach((value, index) => {
        const height = value * barHeightMultiplier
        const x = index * barWidth
        const y = canvas.height - height

        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0)
        gradient.addColorStop(0, "rgba(255, 204, 0, 0.8)")
        gradient.addColorStop(1, "rgba(255, 204, 0, 0.2)")

        ctx.fillStyle = gradient
        ctx.fillRect(x, y, barWidth - 1, height)
      })

      requestAnimationFrame(visualize)
    }

    visualize()
  }, [isPlaying])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleProgressChange = (value: number[]) => {
    if (!audioRef.current) return

    const newProgress = value[0]
    setProgress(newProgress)

    audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    setIsMuted(value[0] === 0)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleVolumeControls = () => {
    setShowVolumeControls(!showVolumeControls)
  }

  const formatTime = (duration: string) => {
    const [minutes, seconds] = duration.split(":").map(Number)
    const totalSeconds = minutes * 60 + seconds
    const currentSeconds = Math.floor(totalSeconds * (progress / 100))
    const currentMinutes = Math.floor(currentSeconds / 60)
    const remainingSeconds = currentSeconds % 60

    return `${currentMinutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full flex-shrink-0 relative overflow-hidden"
              onClick={togglePlay}
            >
              <AnimatePresence mode="wait">
                {isPlaying ? (
                  <motion.div
                    key="pause"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Pause className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="play"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Play className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary pointer-events-none"
                animate={{
                  scale: isPlaying ? [1, 1.2, 1] : 1,
                  opacity: isPlaying ? [1, 0.5, 1] : 1,
                }}
                transition={{
                  duration: 2,
                  repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
                  ease: "easeInOut",
                }}
              />
            </Button>
          </motion.div>

          <div className="flex-1 w-full">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-sm sm:text-base line-clamp-1">{title}</h3>
              <div className="text-xs sm:text-sm text-gray-500 whitespace-nowrap ml-2">
                {formatTime(duration)} / {duration}
              </div>
            </div>

            <div className="w-full relative">
              <Slider value={[progress]} max={100} step={0.1} onValueChange={handleProgressChange} className="w-full" />

              <AnimatePresence>
                {isPlaying && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: isMobile ? 30 : 40 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="w-full mt-2 overflow-hidden"
                  >
                    <canvas ref={canvasRef} width={500} height={isMobile ? 30 : 40} className="w-full h-full" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {isMobile ? (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500 hover:text-primary"
                onClick={toggleVolumeControls}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>

              <AnimatePresence>
                {showVolumeControls && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full mb-2 right-0 bg-white shadow-lg rounded-lg p-3 w-32"
                  >
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      max={100}
                      step={1}
                      className="w-full"
                      onValueChange={handleVolumeChange}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2 w-24">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500 hover:text-primary"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume]}
                max={100}
                step={1}
                className="w-full"
                onValueChange={handleVolumeChange}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

