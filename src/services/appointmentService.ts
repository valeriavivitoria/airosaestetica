import { apiEnabled, apiRequest } from './api'

export type AppointmentRequest = {
  procedure: string
  professional: string
  date: string
  time: string
  name: string
  phone: string
  email: string
}

export async function submitAppointment(request: AppointmentRequest & { procedureId?: number; professionalId?: number }) {
  if (apiEnabled) {
    return apiRequest('/appointments', { method: 'POST', body: JSON.stringify({ clientName: request.name, clientEmail: request.email, clientPhone: request.phone, procedureId: request.procedureId, professionalId: request.professionalId, date: request.date, time: request.time }) })
  }
  await new Promise((resolve) => window.setTimeout(resolve, 900))
  return { received: true }
}
