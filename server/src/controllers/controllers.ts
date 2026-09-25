import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import type { Request, Response } from 'express'
import { prisma } from '../lib/prisma.js'
import { appointmentSchema, appointmentStatusSchema, availabilitySchema, contactSchema, contactStatusSchema, idParamSchema, loginSchema, procedureSchema, professionalSchema } from '../schemas/index.js'
import { createAppointment } from '../services/appointmentService.js'
import { appointmentSlots } from '../utils/appointmentSlots.js'

export async function health(_request: Request, response: Response) { return response.json({ status: 'ok' }) }
export async function login(request: Request, response: Response) { const { email, password } = loginSchema.parse(request.body); const user = await prisma.user.findUnique({ where: { email } }); if (!user || !(await bcrypt.compare(password, user.passwordHash))) return response.status(401).json({ error: 'E-mail ou senha inválidos.' }); const token = jwt.sign({ role: user.role }, process.env.JWT_SECRET as string, { subject: String(user.id), expiresIn: '8h' }); return response.json({ token }) }
export async function listProcedures(_request: Request, response: Response) { return response.json(await prisma.procedure.findMany({ where: { active: true }, orderBy: { name: 'asc' } })) }
export async function getProcedure(request: Request, response: Response) {
	const slug = Array.isArray(request.params.slug) ? request.params.slug[0] : request.params.slug

	if (!slug || typeof slug !== 'string') {
		return response.status(400).json({ error: 'Slug inválido.' })
	}

	const procedure = await prisma.procedure.findFirst({ where: { slug, active: true } })
	return procedure ? response.json(procedure) : response.status(404).json({ error: 'Procedimento não encontrado.' })
}
export async function createProcedure(request: Request, response: Response) { return response.status(201).json(await prisma.procedure.create({ data: procedureSchema.parse(request.body) })) }
export async function updateProcedure(request: Request, response: Response) { const { id } = idParamSchema.parse(request.params); return response.json(await prisma.procedure.update({ where: { id }, data: procedureSchema.partial().parse(request.body) })) }
export async function deleteProcedure(request: Request, response: Response) { const { id } = idParamSchema.parse(request.params); await prisma.procedure.update({ where: { id }, data: { active: false } }); return response.status(204).send() }
export async function listProfessionals(_request: Request, response: Response) { return response.json(await prisma.professional.findMany({ where: { active: true }, orderBy: { name: 'asc' } })) }
export async function getProfessional(request: Request, response: Response) { const { id } = idParamSchema.parse(request.params); const professional = await prisma.professional.findFirst({ where: { id, active: true } }); return professional ? response.json(professional) : response.status(404).json({ error: 'Profissional não encontrado.' }) }
export async function createProfessional(request: Request, response: Response) { return response.status(201).json(await prisma.professional.create({ data: professionalSchema.parse(request.body) })) }
export async function updateProfessional(request: Request, response: Response) { const { id } = idParamSchema.parse(request.params); return response.json(await prisma.professional.update({ where: { id }, data: professionalSchema.partial().parse(request.body) })) }
export async function deleteProfessional(request: Request, response: Response) { const { id } = idParamSchema.parse(request.params); await prisma.professional.update({ where: { id }, data: { active: false } }); return response.status(204).send() }
export async function createAppointmentController(request: Request, response: Response) { return response.status(201).json(await createAppointment(appointmentSchema.parse(request.body))) }
export async function listAppointments(_request: Request, response: Response) { return response.json(await prisma.appointment.findMany({ include: { procedure: true, professional: true }, orderBy: { date: 'asc' } })) }
export async function getAppointment(request: Request, response: Response) { const { id } = idParamSchema.parse(request.params); const appointment = await prisma.appointment.findUnique({ where: { id }, include: { procedure: true, professional: true } }); return appointment ? response.json(appointment) : response.status(404).json({ error: 'Agendamento não encontrado.' }) }
export async function updateAppointmentStatus(request: Request, response: Response) { const { id } = idParamSchema.parse(request.params); const { status } = appointmentStatusSchema.parse(request.body); if (status === 'CONFIRMED') { const current = await prisma.appointment.findUnique({ where: { id } }); if (current) { const conflict = await prisma.appointment.findFirst({ where: { professionalId: current.professionalId, date: current.date, time: current.time, status: 'CONFIRMED', NOT: { id } } }); if (conflict) return response.status(409).json({ error: 'Este horário não está mais disponível.' }) } } return response.json(await prisma.appointment.update({ where: { id }, data: { status } })) }
export async function deleteAppointment(request: Request, response: Response) { const { id } = idParamSchema.parse(request.params); await prisma.appointment.delete({ where: { id } }); return response.status(204).send() }
export async function availability(request: Request, response: Response) { const { date, professionalId } = availabilitySchema.parse(request.query); const appointments = await prisma.appointment.findMany({ where: { date, professionalId, status: { in: ['PENDING', 'CONFIRMED'] } }, select: { time: true } }); const occupied = appointments.map((appointment) => appointment.time); return response.json({ date, professionalId, slots: appointmentSlots.map((time) => ({ time, available: !occupied.includes(time) })) }) }
export async function createContact(request: Request, response: Response) { return response.status(201).json(await prisma.contactMessage.create({ data: contactSchema.parse(request.body) })) }
export async function listContact(_request: Request, response: Response) { return response.json(await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } })) }
export async function updateContactStatus(request: Request, response: Response) { const { id } = idParamSchema.parse(request.params); const { status } = contactStatusSchema.parse(request.body); return response.json(await prisma.contactMessage.update({ where: { id }, data: { status } })) }
