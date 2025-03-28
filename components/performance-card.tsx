"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

interface PerformanceCardProps {
  title: string
  date: string
  location: string
  image: string
}

export default function PerformanceCard({ title, date, location, image }: PerformanceCardProps) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-lg shadow-md"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="p-3 sm:p-4 relative z-20 -mt-16 bg-gradient-to-t from-white via-white to-transparent">
        <h3 className="font-bold text-base sm:text-lg mb-2 line-clamp-2">{title}</h3>

        <div className="flex flex-col gap-1 sm:gap-2 mb-3 sm:mb-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm" asChild>
          <Link href="#">Acquista Biglietti</Link>
        </Button>
      </div>
    </motion.div>
  )
}

