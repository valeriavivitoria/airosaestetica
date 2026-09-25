import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { procedures } from '../data/procedures'
import { ProcedureCard } from '../components/procedures/ProcedureCard'

const categories = Array.from(new Set(procedures.map((procedure) => procedure.category)))

export function ProceduresPage() {
  return (
    <div className="procedures-page">
      <section className="procedures-page-hero">
        <p className="section-index">AIROSA / possibilidades de cuidado</p>
        <h1>Escolhas que respeitam<br /><em>o seu tempo.</em></h1>
        <p>Uma seleção de procedimentos e caminhos de cuidado para você conhecer com calma. As indicações são sempre feitas de forma individual, após avaliação.</p>
      </section>
      <section className="procedures-catalog" id="procedimentos" aria-label="Catálogo de procedimentos">
        {categories.map((category) => {
          const categoryProcedures = procedures.filter((procedure) => procedure.category === category)
          return (
            <div className="procedure-category" key={category}>
              <div className="category-heading"><p className="section-index">{category}</p><span>{String(categoryProcedures.length).padStart(2, '0')} possibilidades</span></div>
              <div className="procedure-grid">
                {categoryProcedures.map((procedure) => <ProcedureCard key={procedure.id} procedure={procedure} />)}
              </div>
            </div>
          )
        })}
      </section>
      <section className="procedures-page-cta">
        <p className="section-index">Seu momento</p>
        <h2>O melhor começo<br /><em>é uma conversa.</em></h2>
        <Link className="contact-cta" to="/agendamento">Agendar avaliação <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" /></Link>
      </section>
    </div>
  )
}
