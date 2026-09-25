import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return <section className="procedure-not-found"><p className="section-index">AIROSA / página</p><h1>Este caminho ainda não está aqui.</h1><p>Não encontramos a página que você procurou. Volte ao início ou explore os procedimentos da AIROSA.</p><div className="not-found-links"><Link className="contact-cta" to="/">Voltar para o início</Link><Link to="/procedimentos">Ver procedimentos</Link></div></section>
}
