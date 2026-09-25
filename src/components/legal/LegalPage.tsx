import { Link } from 'react-router-dom'

type LegalSection = {
  id: string
  title: string
  paragraphs: string[]
  bullets?: string[]
}

type LegalPageProps = {
  eyebrow: string
  title: string
  introduction: string
  notice: string
  sections: LegalSection[]
  updatedAt: string
}

export function LegalPage({ eyebrow, title, introduction, notice, sections, updatedAt }: LegalPageProps) {
  return <article className="legal-page"><header className="legal-hero"><p className="section-index">AIROSA / {eyebrow}</p><h1>{title}</h1><p>{introduction}</p><small>Documento institucional demonstrativo · última atualização: {updatedAt}</small></header><div className="legal-layout"><aside className="legal-index" aria-label="Índice do documento"><p>Conteúdo</p><nav>{sections.map((section, index) => <a href={`#${section.id}`} key={section.id}>0{index + 1} {section.title}</a>)}</nav></aside><div className="legal-content"><div className="legal-notice"><strong>Nota de revisão</strong><p>{notice}</p></div>{sections.map((section, index) => <section id={section.id} className="legal-section" key={section.id}><p className="legal-section-number">0{index + 1}</p><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}<div className="legal-back"><Link to="/contato">Falar com a AIROSA</Link><Link to="/">Voltar para o início</Link></div></div></div></article>
}
