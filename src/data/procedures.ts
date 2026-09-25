export type ProcedureCategory = 'Facial' | 'Corporal' | 'Bem-estar'

export type Procedure = {
  id: number
  slug: string
  name: string
  shortDescription: string
  description: string
  category: ProcedureCategory
  image: string
  duration: string
  benefits: string[]
  featured: boolean
}

export const procedures: Procedure[] = [
  {
    id: 1,
    slug: 'limpeza-de-pele',
    name: 'Limpeza de Pele',
    shortDescription: 'Um ritual de cuidado para renovar e equilibrar a pele.',
    description: 'Uma etapa de cuidado dedicada à limpeza e ao equilíbrio da pele, conduzida de forma personalizada durante a avaliação.',
    category: 'Facial',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80',
    duration: 'A definir em avaliação',
    benefits: ['Cuidado personalizado', 'Sensação de renovação', 'Rotina orientada'],
    featured: true,
  },
  {
    id: 2,
    slug: 'botox',
    name: 'Botox',
    shortDescription: 'Precisão e planejamento para um cuidado facial individualizado.',
    description: 'Procedimento que deve ser indicado e realizado após avaliação individual, respeitando características e objetivos de cada pessoa.',
    category: 'Facial',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80',
    duration: 'A definir em avaliação',
    benefits: ['Plano individualizado', 'Acompanhamento próximo', 'Abordagem cuidadosa'],
    featured: true,
  },
  {
    id: 3,
    slug: 'preenchimento-facial',
    name: 'Preenchimento Facial',
    shortDescription: 'Harmonia e cuidado em uma abordagem desenhada para você.',
    description: 'Uma possibilidade de cuidado facial que parte de uma avaliação detalhada e de uma conversa transparente sobre cada etapa.',
    category: 'Facial',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80',
    duration: 'A definir em avaliação',
    benefits: ['Escuta individual', 'Planejamento cuidadoso', 'Naturalidade como direção'],
    featured: true,
  },
  {
    id: 4,
    slug: 'bioestimuladores',
    name: 'Bioestimuladores',
    shortDescription: 'Cuidado progressivo com foco em qualidade e acompanhamento.',
    description: 'Uma abordagem que é apresentada de maneira personalizada, com indicação e acompanhamento definidos após avaliação.',
    category: 'Facial',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=80',
    duration: 'A definir em avaliação',
    benefits: ['Avaliação individual', 'Cuidado progressivo', 'Acompanhamento'],
    featured: false,
  },
  {
    id: 5,
    slug: 'harmonizacao-facial',
    name: 'Harmonização Facial',
    shortDescription: 'Um olhar integrado para proporções, contornos e identidade.',
    description: 'Uma jornada de avaliação e planejamento que considera o conjunto do rosto e as preferências de cada pessoa.',
    category: 'Facial',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80',
    duration: 'A definir em avaliação',
    benefits: ['Visão integrada', 'Planejamento personalizado', 'Decisões compartilhadas'],
    featured: false,
  },
  {
    id: 6,
    slug: 'depilacao-a-laser',
    name: 'Depilação a Laser',
    shortDescription: 'Tecnologia e cuidado para uma rotina mais prática.',
    description: 'O tratamento é planejado a partir das características individuais e das necessidades de cada área, sempre após avaliação.',
    category: 'Corporal',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
    duration: 'A definir em avaliação',
    benefits: ['Plano por área', 'Tecnologia aplicada com cuidado', 'Orientação personalizada'],
    featured: true,
  },
  {
    id: 7,
    slug: 'tratamentos-corporais',
    name: 'Tratamentos Corporais',
    shortDescription: 'Protocolos pensados para acompanhar diferentes momentos.',
    description: 'Possibilidades de cuidado corporal apresentadas de acordo com a avaliação, rotina e objetivos de cada pessoa.',
    category: 'Corporal',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80',
    duration: 'A definir em avaliação',
    benefits: ['Protocolos personalizados', 'Cuidado contínuo', 'Acompanhamento próximo'],
    featured: false,
  },
  {
    id: 8,
    slug: 'skinbooster',
    name: 'Skinbooster',
    shortDescription: 'Uma pausa de cuidado para uma pele mais confortável e luminosa.',
    description: 'Um procedimento facial apresentado após avaliação, com informações claras sobre indicação e cuidados envolvidos.',
    category: 'Facial',
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=80',
    duration: 'A definir em avaliação',
    benefits: ['Avaliação cuidadosa', 'Rotina orientada', 'Experiência personalizada'],
    featured: false,
  },
]

export function getProcedureBySlug(slug: string | undefined) {
  return procedures.find((procedure) => procedure.slug === slug)
}

export function getRelatedProcedures(procedure: Procedure, limit = 3) {
  return procedures
    .filter((item) => item.category === procedure.category && item.id !== procedure.id)
    .slice(0, limit)
}
