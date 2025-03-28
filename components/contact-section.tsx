"use client"

import { useState, useRef } from "react"
import { Mail } from "lucide-react"
import Link from "next/link"
import { useActionState } from "react"

import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import ScrollReveal from "./scroll-reveal"
import { submitContactForm } from "@/app/actions/contact-form"

export default function ContactSection() {
  // Utilizziamo useActionState da react che è la versione aggiornata di useFormState
  const [state, formAction, isPending] = useActionState(submitContactForm, {})
  const [showAlert, setShowAlert] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  // Show alert when form submission is successful
  if (state.success && !showAlert) {
    setShowAlert(true)
    // Hide alert after 5 seconds
    setTimeout(() => setShowAlert(false), 5000)

    // Reset form when submission is successful
    if (formRef.current) {
      formRef.current.reset()
    }
  }

  return (
    <section id="contact" className="py-16 md:py-20 px-4 md:px-6 lg:px-8 bg-black text-white">
      <div className="container mx-auto max-w-5xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center">Contatti</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div className="space-y-5 md:space-y-6">
            <ScrollReveal direction="right" delay={0.2}>
              <h3 className="text-xl md:text-2xl font-semibold">Rimaniamo in Contatto</h3>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.3}>
              <p className="text-white text-sm md:text-base text-justify">
                Per prenotazioni, collaborazioni o qualsiasi altra informazione, non esitare a contattare il team di
                management di Matteo.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.4}>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                <span className="text-sm md:text-base break-all">matteocalosci@hotmail.it</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.6}>
              <div className="flex space-x-4 mt-4 md:mt-6">
                <Link
                  href="https://www.facebook.com/matteo.calosci.9/?locale=it_IT"
                  className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-colors"
                  aria-label="Facebook di Matteo Calosci"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="sr-only">Facebook</span>
                  <svg className="h-4 w-4 md:h-5 md:w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="https://www.instagram.com/matteo__calosci/"
                  className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-colors"
                  aria-label="Instagram di Matteo Calosci"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="h-4 w-4 md:h-5 md:w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="https://www.youtube.com/matteocalosci"
                  className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-colors"
                  aria-label="YouTube di Matteo Calosci"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="sr-only">YouTube</span>
                  <svg className="h-4 w-4 md:h-5 md:w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="left" delay={0.3}>
            {showAlert && state.success && (
              <Alert className="mb-4 bg-green-600 text-white border-green-700">
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}

            {state.success === false && (
              <Alert className="mb-4 bg-red-600 text-white border-red-700">
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}

            <form ref={formRef} action={formAction} className="space-y-3 md:space-y-4">
              <div className="grid grid-cols-1 gap-3 md:gap-4 sm:grid-cols-2">
                <div className="space-y-1 md:space-y-2">
                  <label htmlFor="name" className="text-xs md:text-sm font-medium">
                    Nome <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white text-sm md:text-base"
                    placeholder="Il tuo nome"
                    required
                    aria-required="true"
                  />
                  {state.errors?.name && <p className="text-red-500 text-xs mt-1">{state.errors.name[0]}</p>}
                </div>
                <div className="space-y-1 md:space-y-2">
                  <label htmlFor="email" className="text-xs md:text-sm font-medium">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white text-sm md:text-base"
                    placeholder="La tua email"
                    required
                    aria-required="true"
                  />
                  {state.errors?.email && <p className="text-red-500 text-xs mt-1">{state.errors.email[0]}</p>}
                </div>
              </div>
              <div className="space-y-1 md:space-y-2">
                <label htmlFor="subject" className="text-xs md:text-sm font-medium">
                  Oggetto <span className="text-red-500">*</span>
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white text-sm md:text-base"
                  placeholder="Oggetto"
                  required
                  aria-required="true"
                />
                {state.errors?.subject && <p className="text-red-500 text-xs mt-1">{state.errors.subject[0]}</p>}
              </div>
              <div className="space-y-1 md:space-y-2">
                <label htmlFor="message" className="text-xs md:text-sm font-medium">
                  Messaggio <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white text-sm md:text-base"
                  placeholder="Il tuo messaggio"
                  required
                  aria-required="true"
                ></textarea>
                {state.errors?.message && <p className="text-red-500 text-xs mt-1">{state.errors.message[0]}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Invio in corso..." : "Invia Messaggio"}
              </Button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

