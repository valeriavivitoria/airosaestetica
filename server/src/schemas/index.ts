import { z } from 'zod'

const id = z.coerce.number().int().positive()
const email = z.string().trim().email()
const phone = z.string().trim().min(8).max(30)
const date = z.coerce.date().refine((value) => value >= new Date(new Date().setHours(0, 0, 0, 0)), 'A data não pode ser anterior a hoje.')
const time = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/)

export const loginSchema = z.object({ email, password: z.string().min(1).max(200) })
export const procedureSchema = z.object({ name: z.string().trim().min(2).max(120), slug: z.string().trim().min(2).max(120).regex(/^[a-z0-9-]+$/), description: z.string().trim().min(10).max(2000), category: z.string().trim().min(2).max(80), duration: z.string().trim().min(2).max(80), image: z.string().url(), active: z.boolean().optional() })
export const professionalSchema = z.object({ name: z.string().trim().min(2).max(120), role: z.string().trim().min(2).max(120), specialty: z.string().trim().max(120).optional(), bio: z.string().trim().min(10).max(2000), image: z.string().url(), active: z.boolean().optional() })
export const appointmentSchema = z.object({ clientName: z.string().trim().min(2).max(120), clientEmail: email, clientPhone: phone, procedureId: id, professionalId: id, date, time })
export const appointmentStatusSchema = z.object({ status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']) })
export const contactSchema = z.object({ name: z.string().trim().min(2).max(120), email, phone, message: z.string().trim().min(5).max(4000) })
export const contactStatusSchema = z.object({ status: z.enum(['UNREAD', 'READ', 'ARCHIVED']) })
export const availabilitySchema = z.object({ date: date, professionalId: id })
export const idParamSchema = z.object({ id })
