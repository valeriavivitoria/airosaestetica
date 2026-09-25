import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Procedure } from '../../data/procedures'

type ProcedureCardProps = {
  procedure: Procedure
}

export function ProcedureCard({ procedure }: ProcedureCardProps) {
  return (
    <article className="procedure-card">
      <Link className="procedure-card-image" to={`/procedimentos/${procedure.slug}`}>
        <img src={procedure.image} alt={`Imagem relacionada a ${procedure.name}`} loading="lazy" />
      </Link>
      <div className="procedure-card-content">
        <p className="procedure-card-category">{procedure.category}</p>
        <h3>{procedure.name}</h3>
        <p>{procedure.shortDescription}</p>
        <Link className="procedure-card-link" to={`/procedimentos/${procedure.slug}`}>
          Conhecer procedimento <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
