import { apiEnabled, apiRequest } from './api'

export type ContactRequest = {
  name: string
  email: string
  phone: string
  message: string
}

export async function submitContactMessage(request: ContactRequest) {
  if (apiEnabled) return apiRequest('/contact', { method: 'POST', body: JSON.stringify(request) })
  await new Promise((resolve) => window.setTimeout(resolve, 900))
  return { received: true }
}
