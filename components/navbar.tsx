"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMobile()

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black py-3 md:py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-xl md:text-2xl font-bold z-20">
          <span className="text-white">Matteo Calosci</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {[
            { name: "Home", href: "/" },
            { name: "Biografia", href: "/#biography" },
            { name: "Musica", href: "/#music" },
            { name: "Eventi", href: "/#performances" },
            { name: "Galleria", href: "/#gallery" },
            { name: "Contatti", href: "/#contact" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-medium text-white hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 z-20">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setIsOpen(true)}
            aria-label="Apri menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-black/95 z-10 flex flex-col p-6 overflow-auto"
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-100%" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-end mt-1 mb-10">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                  onClick={() => setIsOpen(false)}
                  aria-label="Chiudi menu"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <nav className="flex flex-col gap-8 items-center justify-center flex-1">
                {[
                  { name: "Home", href: "/" },
                  { name: "Biografia", href: "/#biography" },
                  { name: "Musica", href: "/#music" },
                  { name: "Eventi", href: "/#performances" },
                  { name: "Galleria", href: "/#gallery" },
                  { name: "Contatti", href: "/#contact" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-white text-2xl font-medium hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

