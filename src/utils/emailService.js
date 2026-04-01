import emailjs from '@emailjs/browser'
import { OWNER } from '../config/siteConfig'

let initialized = false

function init() {
  if (initialized) return
  if (OWNER.emailjs.publicKey && OWNER.emailjs.publicKey !== 'TO_BE_CONFIGURED') {
    emailjs.init(OWNER.emailjs.publicKey)
    initialized = true
  }
}

export async function sendMessage({ name, email, message }) {
  init()

  if (!initialized) {
    console.warn('EmailJS not configured')
    return { success: false, error: 'Email service not configured yet.' }
  }

  try {
    await emailjs.send(
      OWNER.emailjs.serviceId,
      OWNER.emailjs.templateId,
      { from_name: name, from_email: email, message, to_name: OWNER.name }
    )
    return { success: true }
  } catch (err) {
    console.error('Email send failed:', err)
    return { success: false, error: 'Failed to send. Please try again.' }
  }
}
