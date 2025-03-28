"use server"

import { z } from "zod"

// Define validation schema
const ContactFormSchema = z.object({
  name: z.string().min(1, { message: "Il nome è obbligatorio" }),
  email: z.string().email({ message: "Email non valida" }),
  subject: z.string().min(1, { message: "L'oggetto è obbligatorio" }),
  message: z.string().min(1, { message: "Il messaggio è obbligatorio" }),
})

export type ContactFormState = {
  success?: boolean
  message?: string
  errors?: {
    name?: string[]
    email?: string[]
    subject?: string[]
    message?: string[]
  }
}

export async function submitContactForm(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  try {
    // Validate form data
    const validatedFields = ContactFormSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    })

    // Return errors if validation fails
    if (!validatedFields.success) {
      return {
        success: false,
        message: "Si prega di compilare tutti i campi correttamente.",
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }

    const { name, email, subject, message } = validatedFields.data

    // In a real implementation, you would use a service like Nodemailer, SendGrid, etc.
    // For demo purposes, we'll simulate a successful email send
    console.log("Sending email to: matteocalosci@hotmail.it")
    console.log("From:", email)
    console.log("Name:", name)
    console.log("Subject:", subject)
    console.log("Message:", message)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Return success state
    return {
      success: true,
      message: "Messaggio inviato con successo! Ti risponderemo al più presto.",
    }
  } catch (error) {
    console.error("Error submitting contact form:", error)

    // Return error state
    return {
      success: false,
      message: "Si è verificato un errore durante l'invio del messaggio. Riprova più tardi.",
    }
  }
}

