export interface EmailPayload {
  name: string
  email: string
  message: string
}

export interface EmailResponse {
  success: boolean
  message: string
}

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'mock'
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'mock'
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'mock'

export async function sendEmail(payload: EmailPayload): Promise<EmailResponse> {
  const isMockMode =
    EMAILJS_SERVICE_ID === 'mock' || import.meta.env.MODE === 'development'

  if (isMockMode) {
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (Math.random() > 0.9) {
      return {
        success: false,
        message: 'Mock error: Failed to send email',
      }
    }

    return {
      success: true,
      message: 'Email sent successfully (mock mode)',
    }
  }

  try {
    if (!window.emailjs) {
      throw new Error('EmailJS library not loaded')
    }

    const response = await window.emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name: payload.name,
        from_email: payload.email,
        message: payload.message,
        to_name: 'V Chaitanya Chowdari',
      },
      EMAILJS_PUBLIC_KEY
    )

    if (response.status === 200) {
      return {
        success: true,
        message: 'Email sent successfully!',
      }
    }

    throw new Error('Failed to send email')
  } catch (error) {
    console.error('Email sending error:', error)
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to send email. Please try again.',
    }
  }
}

declare global {
  interface Window {
    emailjs?: {
      send: (
        serviceId: string,
        templateId: string,
        templateParams: Record<string, string>,
        publicKey: string
      ) => Promise<{ status: number; text: string }>
      init: (publicKey: string) => void
    }
  }
}
