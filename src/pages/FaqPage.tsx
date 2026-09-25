import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

const questions = [
  ['Como escolher um procedimento?', 'O melhor caminho começa com uma avaliação e uma conversa sobre suas necessidades. As informações do site são gerais e não substituem orientação individual.'],
  ['A solicitação de agendamento confirma um horário?', 'Não. O formulário envia uma solicitação demonstrativa. A confirmação definitiva depende do contato da clínica e da disponibilidade real.'],
  ['Como funciona a avaliação?', 'A equipe conversa sobre o que você busca, sua rotina e as possibilidades de cuidado. Orientações específicas são apresentadas quando aplicáveis.'],
  ['Posso falar com a clínica antes de agendar?', 'Sim. Você pode utilizar o formulário de contato, telefone ou WhatsApp disponíveis na página Contato.'],
  ['As informações sobre procedimentos são recomendações médicas?', 'Não. Os textos têm caráter informativo e demonstrativo. A indicação de qualquer procedimento depende de avaliação profissional.'],
]

export function FaqPage() {
  useEffect(() => { document.title = 'Perguntas frequentes | AIROSA Estética' }, [])
  return <div className="faq-page"><section className="faq-page-hero"><p className="section-index">AIROSA / dúvidas frequentes</p><h1>Clareza para<br /><em>cada escolha.</em></h1><p>Reunimos respostas iniciais para ajudar você a conhecer a experiência AIROSA com calma.</p></section><section className="faq-page-content" aria-labelledby="faq-title"><div><p className="section-index">Perguntas frequentes</p><h2 id="faq-title">Antes de<br /><em>começar.</em></h2></div><div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section><section className="faq-page-cta"><p className="section-index">Ainda ficou alguma dúvida?</p><h2>Vamos conversar<br /><em>sobre você?</em></h2><Link className="contact-cta" to="/contato">Entrar em contato <ArrowUpRight size={18} aria-hidden="true" /></Link></section></div>
}
