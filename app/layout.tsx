import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import Navbar from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Matteo Calosci | Violinista | Concerti ed Eventi",
  description:
    "Matteo Calosci, violinista di fama internazionale. Scopri i prossimi concerti, ascolta le registrazioni e acquista biglietti per eventi esclusivi.",
  keywords:
    "Matteo Calosci, violinista, concerti, musica classica, violino, eventi musicali, registrazioni, masterclass",
  authors: [{ name: "Matteo Calosci" }],
  creator: "Matteo Calosci",
  publisher: "Matteo Calosci",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover",
  themeColor: "#FFCC00",
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://www.matteocalosci.com",
    title: "Matteo Calosci | Violinista",
    description: "Matteo Calosci, violinista di fama internazionale. Concerti, registrazioni e masterclass.",
    siteName: "Matteo Calosci",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WEBSITE%20BG.tiff-5WyRsAlX0AiMAQGA9c4V92cQZviGpF.jpeg",
        width: 1200,
        height: 630,
        alt: "Matteo Calosci Violinista",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Matteo Calosci | Violinista",
    description: "Matteo Calosci, violinista di fama internazionale. Concerti, registrazioni e masterclass.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WEBSITE%20BG.tiff-5WyRsAlX0AiMAQGA9c4V92cQZviGpF.jpeg",
    ],
  },
  alternates: {
    canonical: "https://www.matteocalosci.com",
    languages: {
      it: "https://www.matteocalosci.com",
      en: "https://www.matteocalosci.com/en",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'