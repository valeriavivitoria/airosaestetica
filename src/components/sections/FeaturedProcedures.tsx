import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { procedures } from '../../data/procedures'
import { ProcedureCard } from '../procedures/ProcedureCard'

export function FeaturedProcedures() {
  const featuredProcedures = procedures.filter((procedure) => procedure.featured)

  return (
    <section className="featured-procedures" aria-labelledby="featured-procedures-title">
      <div className="featured-heading">
        <p className="section-index">02 / possibilidades</p>
        <h2 id="featured-procedures-title">Cuidado com<br /><em>intenção.</em></h2>
        <p>Conheça algumas das possibilidades de cuidado da AIROSA. Cada jornada começa com uma conversa.</p>
        <Link className="all-procedures-link" to="/procedimentos">Ver todos os procedimentos <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" /></Link>
      </div>
      <div className="featured-grid">
        {featuredProcedures.map((procedure) => <ProcedureCard key={procedure.id} procedure={procedure} />)}
      </div>
    </section>
  )
}
