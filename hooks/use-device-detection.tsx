"use client"

import { useState, useEffect } from "react"

interface DeviceInfo {
  isMobile: boolean
  isIOS: boolean
  isAndroid: boolean
  isSafari: boolean
  isChrome: boolean
  isFirefox: boolean
}

export function useDeviceDetection(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isIOS: false,
    isAndroid: false,
    isSafari: false,
    isChrome: false,
    isFirefox: false,
  })

  useEffect(() => {
    if (typeof window === "undefined") return

    const userAgent = navigator.userAgent.toLowerCase()

    const isMobile = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(userAgent)
    const isIOS = /iphone|ipad|ipod/i.test(userAgent)
    const isAndroid = /android/i.test(userAgent)
    const isSafari = /safari/i.test(userAgent) && !/chrome/i.test(userAgent)
    const isChrome = /chrome|crios/i.test(userAgent)
    const isFirefox = /firefox|fxios/i.test(userAgent)

    setDeviceInfo({
      isMobile,
      isIOS,
      isAndroid,
      isSafari,
      isChrome,
      isFirefox,
    })
  }, [])

  return deviceInfo
}

