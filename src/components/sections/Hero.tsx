import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react'

export function Hero() {
  return (
    <section className="hero-section" id="inicio" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">AIROSA ESTÉTICA <span>/</span> São Paulo</p>
        <h1 id="hero-title">A beleza de se<br /><em>sentir presente.</em></h1>
        <p className="hero-description">Cuidado estético com escuta, precisão e naturalidade. Uma experiência pensada para você se reconhecer ainda mais.</p>
        <div className="hero-actions">
          <a className="hero-primary-cta" href="/agendamento">Agendar avaliação <ArrowUpRight size={17} strokeWidth={1.6} aria-hidden="true" /></a>
          <a className="hero-secondary-cta" href="#procedimentos">Conhecer procedimentos <ArrowDown size={16} strokeWidth={1.5} aria-hidden="true" /></a>
        </div>
      </div>
      <div className="hero-visual">
        <img src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1100&q=85" alt="Mulher em um momento de autocuidado" />
        <span className="image-caption">Beleza com intenção</span>
        <div className="experience-mark"><Sparkles size={16} strokeWidth={1.2} aria-hidden="true" /><span><strong>Desde 2014</strong><small>cuidado que permanece</small></span></div>
      </div>
      <a className="scroll-cue" href="#procedimentos" aria-label="Rolar para conhecer os procedimentos"><ArrowDown size={17} strokeWidth={1.4} /></a>
    </section>
  )
}
