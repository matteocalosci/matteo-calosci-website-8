import Link from "next/link"
import { Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import PerformanceCard from "@/components/performance-card"
import ScrollReveal from "@/components/scroll-reveal"

export default function EventiPage() {
  return (
    <div className="flex min-h-screen flex-col pt-20">
      {/* Performances Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Prossimi Eventi</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal direction="up" delay={0.2}>
              <PerformanceCard
                title="Recital al Teatro dell'Opera"
                date="15 Giugno, 2024"
                location="Roma, Italia"
                image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WEBSITE%20BG.tiff-5WyRsAlX0AiMAQGA9c4V92cQZviGpF.jpeg"
              />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.3}>
              <PerformanceCard
                title="Festival di Musica da Camera"
                date="8 Luglio, 2024"
                location="Vienna, Austria"
                image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WEBSITE%20BG1%20copia.jpg-C6gU84gsQ8WSBLOyjg4Helr6YAohkK.jpeg"
              />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.4}>
              <PerformanceCard
                title="Solista con Orchestra Sinfonica"
                date="22 Agosto, 2024"
                location="Berlino, Germania"
                image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WEBSITE%20BG.tiff-5WyRsAlX0AiMAQGA9c4V92cQZviGpF.jpeg"
              />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.5}>
              <PerformanceCard
                title="Concorso Internazionale di Violino"
                date="10 Settembre, 2024"
                location="Parigi, Francia"
                image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WEBSITE%20BG1%20copia.jpg-C6gU84gsQ8WSBLOyjg4Helr6YAohkK.jpeg"
              />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.6}>
              <PerformanceCard
                title="Masterclass di Violino"
                date="5 Ottobre, 2024"
                location="Milano, Italia"
                image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WEBSITE%20BG.tiff-5WyRsAlX0AiMAQGA9c4V92cQZviGpF.jpeg"
              />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.7}>
              <PerformanceCard
                title="Concerto di Natale"
                date="20 Dicembre, 2024"
                location="Firenze, Italia"
                image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WEBSITE%20BG1%20copia.jpg-C6gU84gsQ8WSBLOyjg4Helr6YAohkK.jpeg"
              />
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.8}>
            <div className="mt-10 text-center">
              <Button variant="outline" className="group" asChild>
                <Link href="/" className="flex items-center">
                  Torna alla Home
                  <Calendar className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <footer className="py-4 md:py-6 px-4 md:px-6 lg:px-8 bg-black text-white text-center mt-auto">
        <div className="container mx-auto">
          <p className="text-sm md:text-base">
            © {new Date().getFullYear()} Matteo Calosci. Tutti i diritti riservati.
          </p>
          <div className="mt-2 text-xs md:text-sm text-gray-400">
            <Link href="/privacy-policy" className="hover:text-primary">
              Privacy Policy
            </Link>{" "}
            |
            <Link href="/termini-e-condizioni" className="ml-2 hover:text-primary">
              Termini e Condizioni
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

