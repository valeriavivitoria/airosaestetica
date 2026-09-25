import 'dotenv/config'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const adminEmail = process.env.ADMIN_EMAIL
const adminPassword = process.env.ADMIN_PASSWORD
if (!adminEmail || !adminPassword) throw new Error('ADMIN_EMAIL e ADMIN_PASSWORD são necessários para o seed.')
const seedEmail = adminEmail
const seedPassword = adminPassword

const procedureData = [
  ['Limpeza de Pele', 'limpeza-de-pele', 'Cuidado dedicado à limpeza e ao equilíbrio da pele.', 'Facial'],
  ['Botox', 'botox', 'Planejamento para um cuidado facial individualizado.', 'Facial'],
  ['Preenchimento Facial', 'preenchimento-facial', 'Uma possibilidade de cuidado facial personalizado.', 'Facial'],
  ['Bioestimuladores', 'bioestimuladores', 'Cuidado progressivo com avaliação individual.', 'Facial'],
  ['Harmonização Facial', 'harmonizacao-facial', 'Olhar integrado para proporções e identidade.', 'Facial'],
  ['Depilação a Laser', 'depilacao-a-laser', 'Tecnologia e cuidado para uma rotina mais prática.', 'Corporal'],
  ['Tratamentos Corporais', 'tratamentos-corporais', 'Protocolos pensados para diferentes momentos.', 'Corporal'],
  ['Skinbooster', 'skinbooster', 'Uma pausa de cuidado para a pele.', 'Facial'],
] as const

async function main() {
  for (const [name, slug, description, category] of procedureData) await prisma.procedure.upsert({ where: { slug }, update: {}, create: { name, slug, description, category, duration: 'A definir em avaliação', image: '', active: true } })
  await prisma.professional.upsert({ where: { id: 1 }, update: {}, create: { id: 1, name: 'Adriana Santos Farias', role: 'Responsável pela AIROSA ESTÉTICA', bio: 'Responsável pela experiência institucional da AIROSA.', image: '', active: true } })
  const passwordHash = await bcrypt.hash(seedPassword, 12)
  await prisma.user.upsert({ where: { email: seedEmail }, update: { passwordHash }, create: { name: 'Administrador AIROSA', email: seedEmail, passwordHash, role: 'ADMIN' } })
}

main().finally(() => prisma.$disconnect())
