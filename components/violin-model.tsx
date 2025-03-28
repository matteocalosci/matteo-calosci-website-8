"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function ViolinModel() {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  // Simulate loading progress
  useEffect(() => {
    const loadingInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProgress = prev + 10
        if (newProgress >= 100) {
          clearInterval(loadingInterval)
          setIsLoading(false)
          return 100
        }
        return newProgress
      })
    }, 200)

    return () => {
      clearInterval(loadingInterval)
    }
  }, [])

  return (
    <div className="relative h-[400px] w-full rounded-lg overflow-hidden bg-gray-100">
      {isLoading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-gray-600">Caricamento modello {loadingProgress}%</p>
        </div>
      ) : (
        <motion.div
          className="w-full h-full flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-full h-full">
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="Modello di violino"
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2">Violino Italiano</h3>
                <p className="text-gray-700">XVIII secolo</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

