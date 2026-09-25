import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowUpRight, AtSign as Instagram, Check, LoaderCircle, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { clinic } from '../data/clinic'
import { submitContactMessage, type ContactRequest } from '../services/contactService'
import { WhatsAppButton } from '../components/contact/WhatsAppButton'
import { FieldMessage } from '../components/forms/FieldMessage'

type ContactErrors = Partial<Record<keyof ContactRequest, string>>
const initialForm: ContactRequest = { name: '', email: '', phone: '', message: '' }

export function ContactPage() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  useEffect(() => { document.title = 'Contato | AIROSA Estética' }, [])

  function update(field: keyof ContactRequest, value: string) { setForm((current) => ({ ...current, [field]: value })) }
  function validate() {
    const nextErrors: ContactErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Informe seu nome.'
    if (!form.email.trim()) nextErrors.email = 'Informe seu e-mail.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Digite um e-mail válido.'
    if (!form.phone.trim()) nextErrors.phone = 'Informe seu telefone.'
    if (!form.message.trim()) nextErrors.message = 'Escreva uma mensagem.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }
  async function submit(event: FormEvent) {
    event.preventDefault()
    if (!validate()) return
    setStatus('loading')
    try { await submitContactMessage(form); setStatus('success'); setForm(initialForm) } catch { setStatus('error') }
  }

  return <div className="contact-page"><section className="contact-page-hero"><p className="section-index">AIROSA / contato</p><h1>Uma conversa pode<br /><em>mudar o começo.</em></h1><p>Estamos aqui para ouvir você. Escolha o canal que preferir ou envie uma mensagem para a clínica.</p></section><section className="contact-content"><div className="contact-details"><p className="section-index">Fale com a AIROSA</p><h2>Estamos<br /><em>por perto.</em></h2><div className="contact-list"><a href={`tel:${clinic.phone.replace(/\D/g, '')}`}><Phone size={17} aria-hidden="true" /><span><small>Telefone</small>{clinic.phone}</span></a><WhatsAppButton className="contact-detail-link" /><a href={`mailto:${clinic.email}`}><Mail size={17} aria-hidden="true" /><span><small>E-mail</small>{clinic.email}</span></a><div><MapPin size={17} aria-hidden="true" /><span><small>Endereço</small>{clinic.address}</span></div><a href={`https://instagram.com/${clinic.instagram}`} target="_blank" rel="noreferrer"><Instagram size={17} aria-hidden="true" /><span><small>Instagram</small>@{clinic.instagram}</span></a></div><div className="opening-hours"><small>Horário de funcionamento</small><p>{clinic.openingHours}</p></div></div><div className="contact-form-wrap"><p className="section-index">Escreva para nós</p>{status === 'success' ? <div className="contact-success"><div className="success-icon"><Check size={25} /></div><h2>Mensagem recebida.</h2><p>Recebemos sua mensagem como uma solicitação de contato. A clínica poderá retornar pelo canal informado.</p><button className="back-button" type="button" onClick={() => setStatus('idle')}>Enviar outra mensagem</button></div> : <form className="contact-form" onSubmit={submit} noValidate><label htmlFor="contact-name">Nome</label><input id="contact-name" type="text" autoComplete="name" value={form.name} onChange={(event) => update('name', event.target.value)} /><FieldMessage message={errors.name} /><label htmlFor="contact-email">E-mail</label><input id="contact-email" type="email" autoComplete="email" value={form.email} onChange={(event) => update('email', event.target.value)} /><FieldMessage message={errors.email} /><label htmlFor="contact-phone">Telefone</label><input id="contact-phone" type="tel" autoComplete="tel" value={form.phone} onChange={(event) => update('phone', event.target.value)} /><FieldMessage message={errors.phone} /><label htmlFor="contact-message">Mensagem</label><textarea id="contact-message" rows={5} value={form.message} onChange={(event) => update('message', event.target.value)} /><FieldMessage message={errors.message} />{status === 'error' && <p className="form-status error" role="alert">Não foi possível processar sua mensagem agora. Tente novamente.</p>}<button className="contact-cta" type="submit" disabled={status === 'loading'}>{status === 'loading' ? <><LoaderCircle className="spin" size={17} /> Enviando</> : <>Enviar mensagem <ArrowUpRight size={17} aria-hidden="true" /></>}</button></form>}</div></section><section className="map-placeholder" aria-label="Localização da AIROSA"><MapPin size={24} strokeWidth={1.2} aria-hidden="true" /><p>Mapa disponível quando o endereço da clínica for confirmado.</p><small>Integração com Google Maps ou OpenStreetMap preparada para a próxima etapa.</small></section><section className="contact-bottom-cta"><p className="section-index">Seu momento</p><h2>Prefere começar<br /><em>pelo agendamento?</em></h2><Link className="contact-cta" to="/agendamento">Agendar avaliação <ArrowUpRight size={18} aria-hidden="true" /></Link></section></div>
}
