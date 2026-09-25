import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Início', href: '/#inicio' },
  { label: 'Procedimentos', href: '/procedimentos' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Equipe', href: '/equipe' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contato', href: '/contato' },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    document.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''

    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Navegação principal">
        <a className="brand" href="/#inicio" aria-label="AIROSA Estética, início">
          <span className="brand-name">AIROSA</span>
          <span className="brand-subtitle">ESTÉTICA</span>
        </a>

        <div className="desktop-nav">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>

        <a className="nav-cta" href="/agendamento">
          <span>Agendar avaliação</span>
          <ArrowUpRight size={16} strokeWidth={1.7} aria-hidden="true" />
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </nav>

      <div className={`mobile-nav ${isMenuOpen ? 'is-open' : ''}`} id="mobile-navigation">
        <div className="mobile-nav-inner">
          {navItems.map((item, index) => (
            <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)}>
              <span>0{index + 1}</span>
              {item.label}
            </a>
          ))}
          <a className="mobile-cta" href="/agendamento" onClick={() => setIsMenuOpen(false)}>
            Agendar avaliação <ArrowUpRight size={17} strokeWidth={1.7} aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  )
}
