import { Link } from 'react-router-dom'

export function Footer() {
  return <footer><span>AIROSA ESTÉTICA</span><div className="footer-links"><Link to="/politica-de-privacidade">Privacidade</Link><Link to="/politica-de-cookies">Cookies</Link><Link to="/termos-de-uso">Termos de Uso</Link></div><span>Adriana Santos Farias · 2026</span></footer>
}
