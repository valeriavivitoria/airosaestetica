export type TeamMember = {
  id: number
  name: string
  role: string
  specialty?: string
  bio: string
  image: string
  credentials?: string[]
}

// Conteúdo institucional inicial. Credenciais devem ser adicionadas somente quando fornecidas.
export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Adriana Santos Farias',
    role: 'Responsável pela AIROSA ESTÉTICA',
    bio: 'Adriana está à frente da AIROSA e conduz a experiência da clínica com um olhar atento para o cuidado individual, a escuta e a construção de jornadas acolhedoras.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=85',
  },
]
