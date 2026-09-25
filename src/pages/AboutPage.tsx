import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const values = [
  { number: '01', title: 'Cuidado', text: 'Cada encontro é tratado com atenção, presença e respeito.' },
  { number: '02', title: 'Individualidade', text: 'Não existe um caminho único. O cuidado parte de quem você é.' },
  { number: '03', title: 'Ética', text: 'Conversas transparentes orientam escolhas conscientes.' },
  { number: '04', title: 'Excelência', text: 'Precisão e consistência em cada detalhe da experiência.' },
]

export function AboutPage() {
  useEffect(() => {
    document.title = 'Sobre | AIROSA Estética'
  }, [])

  return (
    <div className="about-page">
      <section className="about-hero" id="sobre">
        <p className="section-index">AIROSA / nossa essência</p>
        <h1>O cuidado começa<br /><em>na escuta.</em></h1>
        <p>Uma clínica de estética construída para tornar o cuidado mais consciente, próximo e coerente com cada pessoa.</p>
      </section>

      <section className="approach-section">
        <div><p className="section-index">01 / nossa abordagem</p><h2>Menos pressa.<br /><em>Mais presença.</em></h2></div>
        <div className="approach-copy"><p>Na AIROSA, o atendimento individualizado vem antes de qualquer escolha. Reservamos espaço para entender necessidades, desejos e limites, criando uma experiência que faça sentido para você.</p><p>O cuidado é personalizado, acolhedor e conduzido com transparência. Buscamos resultados naturais e coerentes com cada pessoa, sem apagar sua identidade.</p></div>
      </section>

      <section className="airosa-story">
        <div className="story-image"><img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=85" alt="Ambiente sereno dedicado ao cuidado" loading="lazy" /></div>
        <div className="story-copy"><p className="section-index">02 / a AIROSA</p><h2>Um lugar para<br /><em>se reconhecer.</em></h2><p>A AIROSA nasceu do desejo de criar uma relação mais humana com a estética. Aqui, beleza não é uma fórmula: é uma conversa contínua entre o que você sente, o que deseja e o cuidado que escolhe receber.</p><p>Cada detalhe da clínica foi pensado para que você possa chegar como está, ser ouvida e encontrar um caminho de cuidado com leveza.</p></div>
      </section>

      <section className="values-section" aria-labelledby="values-title">
        <div><p className="section-index">03 / nossos valores</p><h2 id="values-title">O que sustenta<br /><em>nosso olhar.</em></h2></div>
        <div className="values-list">{values.map((value) => <div className="value-row" key={value.number}><span>{value.number}</span><h3>{value.title}</h3><p>{value.text}</p></div>)}</div>
      </section>

      <section className="about-responsible"><p className="section-index">04 / quem conduz</p><h2>Presença que<br /><em>faz diferença.</em></h2><p>Adriana Santos Farias é a responsável pela AIROSA ESTÉTICA e acompanha de perto a construção de uma experiência pautada por escuta, acolhimento e cuidado individual.</p><Link className="about-link" to="/equipe">Conhecer a equipe <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" /></Link></section>

      <section className="about-cta"><p className="section-index">Seu momento</p><h2>Vamos conversar<br /><em>sobre o seu cuidado?</em></h2><Link className="contact-cta" to="/agendamento">Agendar avaliação <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" /></Link></section>
    </div>
  )
}
