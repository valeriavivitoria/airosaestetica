import { useEffect } from 'react'
import { ArrowUpRight, Clock3 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { getProcedureBySlug, getRelatedProcedures } from '../data/procedures'
import { ProcedureCard } from '../components/procedures/ProcedureCard'

const faqs = [
  {
    question: 'Como saber se este procedimento é indicado para mim?',
    answer: 'A indicação depende de uma avaliação individual e de uma conversa sobre suas necessidades, histórico e objetivos. A equipe explica as possibilidades antes de qualquer decisão.',
  },
  {
    question: 'Quanto tempo dura o atendimento?',
    answer: 'O tempo pode variar conforme o procedimento e o plano definido. A duração é alinhada com clareza durante o agendamento e a avaliação.',
  },
  {
    question: 'Quais cuidados devo ter antes ou depois?',
    answer: 'As orientações são personalizadas e apresentadas pela equipe responsável. Siga somente as recomendações recebidas no seu atendimento.',
  },
]

const whatsappUrl = 'https://wa.me/?text=Olá%20AIROSA%2C%20gostaria%20de%20saber%20mais%20sobre%20um%20procedimento.'

export function ProcedureDetailPage() {
  const { slug } = useParams()
  const procedure = getProcedureBySlug(slug)

  useEffect(() => {
    document.title = procedure ? `${procedure.name} | AIROSA Estética` : 'Procedimento não encontrado | AIROSA Estética'
    const description = procedure?.description ?? 'Conheça os procedimentos da AIROSA Estética.'
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)
  }, [procedure])

  if (!procedure) {
    return <section className="procedure-not-found"><p className="section-index">AIROSA / procedimento</p><h1>Este cuidado ainda não está aqui.</h1><p>Não encontramos o procedimento que você procurou. Explore novamente nossas possibilidades de cuidado.</p><Link className="contact-cta" to="/procedimentos">Voltar para procedimentos</Link></section>
  }

  const relatedProcedures = getRelatedProcedures(procedure)

  return (
    <div className="procedure-detail-page">
      <section className="procedure-detail-hero">
        <div className="procedure-detail-intro">
          <p className="section-index">AIROSA / {procedure.category}</p>
          <h1>{procedure.name}</h1>
          <p>{procedure.shortDescription}</p>
          <Link className="contact-cta" to="/agendamento">Agendar avaliação <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" /></Link>
        </div>
        <img src={procedure.image} alt={`Imagem relacionada a ${procedure.name}`} />
      </section>

      <section className="procedure-detail-body">
        <div className="procedure-detail-description">
          <p className="section-index">Sobre o procedimento</p>
          <h2>Um cuidado pensado<br /><em>para você.</em></h2>
          <p>{procedure.description}</p>
          <p>Na AIROSA, cada etapa é conversada com transparência. A experiência pode ser ajustada de acordo com a avaliação e as necessidades de cada pessoa.</p>
        </div>
        <div className="procedure-facts">
          <div className="procedure-fact"><Clock3 size={18} strokeWidth={1.3} aria-hidden="true" /><span>Duração aproximada</span><strong>{procedure.duration}</strong></div>
          <div className="procedure-fact"><span>Categoria</span><strong>{procedure.category}</strong></div>
          <div className="procedure-fact"><span>Importante</span><strong>A indicação é feita após avaliação individual.</strong></div>
        </div>
      </section>

      <section className="procedure-benefits">
        <div><p className="section-index">O que orienta o cuidado</p><h2>Clareza em<br /><em>cada etapa.</em></h2></div>
        <ul>{procedure.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul>
      </section>

      <section className="procedure-care">
        <div><p className="section-index">Informações importantes</p><h2>Antes de<br /><em>começar.</em></h2></div>
        <div><p>Todo atendimento começa com uma avaliação. Nesse momento, a equipe conversa sobre expectativas, rotina e possíveis cuidados relacionados ao procedimento.</p><p>As orientações pré e pós-atendimento variam de acordo com cada caso e são explicadas individualmente. Em caso de dúvidas, fale com a clínica antes de agendar.</p></div>
      </section>

      <section className="procedure-faq" aria-labelledby="procedure-faq-title">
        <p className="section-index">Dúvidas frequentes</p><h2 id="procedure-faq-title">O que você pode<br /><em>querer saber.</em></h2>
        <div>{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}</div>
      </section>

      {relatedProcedures.length > 0 && <section className="related-procedures"><div className="related-heading"><p className="section-index">Continue explorando</p><h2>Talvez também<br /><em>faça sentido.</em></h2></div><div className="related-grid">{relatedProcedures.map((item) => <ProcedureCard key={item.id} procedure={item} />)}</div></section>}

      <section className="procedure-detail-cta"><p className="section-index">Seu momento</p><h2>Quer saber qual tratamento<br /><em>é ideal para você?</em></h2><div><Link className="contact-cta" to="/agendamento">Agendar avaliação <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" /></Link><a className="whatsapp-cta" href={whatsappUrl} target="_blank" rel="noreferrer">Falar pelo WhatsApp</a></div></section>
    </div>
  )
}
