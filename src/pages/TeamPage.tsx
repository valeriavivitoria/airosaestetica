import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { teamMembers } from '../data/team'

export function TeamPage() {
  useEffect(() => {
    document.title = 'Equipe | AIROSA Estética'
  }, [])

  return (
    <div className="team-page">
      <section className="team-page-hero" id="equipe"><p className="section-index">AIROSA / quem cuida</p><h1>Cuidado feito<br /><em>por pessoas.</em></h1><p>Uma apresentação inicial de quem constrói a experiência AIROSA. Este espaço será ampliado à medida que novas informações institucionais forem disponibilizadas.</p></section>
      <section className="team-intro"><p className="section-index">01 / nossa equipe</p><div><h2>Proximidade em<br /><em>cada encontro.</em></h2><p>A equipe da AIROSA é apresentada com transparência e respeito à história de cada profissional. Informações de formação, especialidades e registros serão incluídas somente quando confirmadas.</p></div></section>
      <section className="team-member-list" aria-label="Equipe AIROSA">{teamMembers.map((member) => <article className="team-member" key={member.id}><img src={member.image} alt={`Retrato de ${member.name}`} loading="lazy" /><div className="team-member-copy"><p className="section-index">Perfil institucional</p><h2>{member.name}</h2><p className="team-role">{member.role}</p><p>{member.bio}</p>{member.specialty && <p><strong>Área de atuação:</strong> {member.specialty}</p>}{member.credentials && member.credentials.length > 0 && <ul>{member.credentials.map((credential) => <li key={credential}>{credential}</li>)}</ul>}</div></article>)}</section>
      <section className="team-page-cta"><p className="section-index">Seu momento</p><h2>Vamos conversar<br /><em>sobre você?</em></h2><Link className="contact-cta" to="/agendamento">Agendar avaliação <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" /></Link></section>
    </div>
  )
}
