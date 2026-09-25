import { prisma } from '../lib/prisma.js'
import { appointmentSlots } from '../utils/appointmentSlots.js'
import type { z } from 'zod'
import type { appointmentSchema } from '../schemas/index.js'

export async function createAppointment(input: z.infer<typeof appointmentSchema>) {
  const [procedure, professional] = await Promise.all([prisma.procedure.findFirst({ where: { id: input.procedureId, active: true } }), prisma.professional.findFirst({ where: { id: input.professionalId, active: true } })])
  if (!procedure || !professional) throw Object.assign(new Error('Procedimento ou profissional não encontrado.'), { statusCode: 404 })
  if (!appointmentSlots.includes(input.time)) throw Object.assign(new Error('Horário inválido.'), { statusCode: 422 })
  const confirmed = await prisma.appointment.findFirst({ where: { professionalId: input.professionalId, date: input.date, time: input.time, status: 'CONFIRMED' } })
  if (confirmed) throw Object.assign(new Error('Este horário não está mais disponível.'), { statusCode: 409 })
  return prisma.appointment.create({ data: input })
}
