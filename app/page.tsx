import Link from "next/link"
import { ArrowRight, Calendar, Music } from "lucide-react"
import Script from "next/script"

import { Button } from "@/components/ui/button"
import HeroSection from "@/components/hero-section"
import MusicPlayer from "@/components/music-player"
import PerformanceCard from "@/components/performance-card"
import GallerySection from "@/components/gallery-section"
import ScrollReveal from "@/components/scroll-reveal"
import ViolinModel from "@/components/violin-model"
import VideoGallerySection from "@/components/video-gallery-section"
import ContactSection from "@/components/contact-section"

export default function Home() {
  // Dati strutturati per Schema.org
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Matteo Calosci",
    url: "https://www.matteocalosci.com",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WEBSITE%20BG1%20copia.jpg-C6gU84gsQ8WSBLOyjg4Helr6YAohkK.jpeg",
    sameAs: [
      "https://www.facebook.com/matteo.calosci.9/?locale=it_IT",
      "https://www.instagram.com/matteo__calosci/",
      "https://www.youtube.com/matteocalosci",
    ],
    jobTitle: "Violinista",
    description:
      "Matteo Calosci, violinista e docente presso il Conservatorio di Reggio Calabria, si esibisce in concerti in Italia e all'estero.",
    performerIn: [
      {
        "@type": "MusicEvent",
        name: "Recital al Teatro dell'Opera",
        startDate: "2024-06-15T20:00",
        location: {
          "@type": "Place",
          name: "Teatro dell'Opera",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Roma",
            addressCountry: "IT",
          },
        },
        offers: {
          "@type": "Offer",
          url: "https://www.matteocalosci.com/tickets/roma-2024",
          price: "35",
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "MusicEvent",
        name: "Festival di Musica da Camera",
        startDate: "2024-07-08T19:30",
        location: {
          "@type": "Place",
          name: "Musikverein",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Vienna",
            addressCountry: "AT",
          },
        },
      },
    ],
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Schema.org JSON-LD */}
      <Script
        id="schema-org-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <HeroSection />

      {/* Biography Section */}
      <section id="biography" className="py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Biografia</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <ScrollReveal direction="right" delay={0.2}>
              <div className="relative h-[400px] overflow-hidden rounded-lg shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/60 z-10"></div>
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WEBSITE%20BG1%20copia.jpg-C6gU84gsQ8WSBLOyjg4Helr6YAohkK.jpeg"
                  alt="Matteo Calosci violinista durante un'esibizione"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </ScrollReveal>

            <div className="space-y-3 flex flex-col justify-between h-[400px]">
              <div className="space-y-3 overflow-auto">
                <ScrollReveal direction="left" delay={0.3}>
                  <p className="text-base text-black text-justify">
                    Matteo Calosci, erede della prestigiosa scuola del Mº Zakhar Bron, è docente di violino presso il
                    Conservatorio di Reggio Calabria e presso i corsi di perfezionamento città di Padova.
                  </p>
                </ScrollReveal>

                <ScrollReveal direction="left" delay={0.4}>
                  <p className="text-base text-black text-justify">
                    Si esibisce regolarmente come solista e in formazioni da camera. Vanta concerti in prestigiose sale
                    e per rinomate istituzioni musicali tra cui Sala Verdi Milano, Serate Musicali, Auditorio Nacional
                    Madrid, Palazzo del Quirinale Roma, Teatro San Babila Milano, Museo del 900 Milano, Teatro
                    Sperimentale Ancona, Teatro Elfo Puccini Milano, Auditorium Palazzina Liberty Milano, Teatro Goldoni
                    Firenze.
                  </p>
                </ScrollReveal>
              </div>

              <ScrollReveal direction="left" delay={0.5}>
                <Button variant="outline" className="mt-4 group border-black text-black hover:bg-black/5">
                  Leggi la biografia completa
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <GallerySection />

      {/* Video Gallery Section */}
      <VideoGallerySection />

      {/* Performances Section */}
      <section id="performances" className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
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
          </div>

          <ScrollReveal delay={0.6}>
            <div className="mt-10 text-center">
              <Button variant="outline" className="group" asChild>
                <Link href="/eventi" target="_blank">
                  Vedi tutti i prossimi eventi
                  <Calendar className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3D Model Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Il Violino</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <ScrollReveal direction="right" delay={0.2}>
              <ViolinModel />
            </ScrollReveal>

            <div className="space-y-4">
              <ScrollReveal direction="left" delay={0.3}>
                <h3 className="text-2xl font-semibold">La Passione per lo Strumento</h3>
              </ScrollReveal>

              <ScrollReveal direction="left" delay={0.4}>
                <p className="text-lg text-gray-700 text-justify">
                  Matteo Calosci suona un violino italiano del XVIII secolo, uno strumento che lo accompagna in ogni sua
                  esibizione e che rappresenta la sua voce artistica.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="left" delay={0.5}>
                <p className="text-lg text-gray-700 text-justify">
                  La ricerca del suono perfetto e l'attenzione ai dettagli tecnici sono elementi fondamentali del suo
                  approccio musicale, sempre volto a valorizzare le caratteristiche uniche del suo strumento.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="left" delay={0.6}>
                <div className="mt-4 flex gap-2">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    Tecnica
                  </span>
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    Espressività
                  </span>
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    Virtuosismo
                  </span>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Music Section */}
      <section id="music" className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Musica</h2>
          </ScrollReveal>

          <div className="space-y-8">
            <ScrollReveal delay={0.2}>
              <MusicPlayer title="Bach: Partita No. 2 in D minor, BWV 1004 - Chaconne" duration="13:42" />
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <MusicPlayer title="Vivaldi: Le Quattro Stagioni - Primavera" duration="9:57" />
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <MusicPlayer title="Paganini: Capriccio No. 24 in La minore" duration="4:26" />
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.5}>
            <div className="mt-10 text-center">
              <Button className="group">
                Esplora la discografia completa
                <Music className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      <footer className="py-4 md:py-6 px-4 md:px-6 lg:px-8 bg-black text-white text-center">
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

