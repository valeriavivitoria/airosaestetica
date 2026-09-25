import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowLeft, ArrowRight, Check, LoaderCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FieldMessage } from '../components/forms/FieldMessage'
import { appointmentSlots } from '../data/appointment'
import { procedures, type Procedure } from '../data/procedures'
import { teamMembers, type TeamMember } from '../data/team'
import { ApiError, apiEnabled, apiRequest } from '../services/api'
import { submitAppointment } from '../services/appointmentService'

type AppointmentForm = { procedure: string; professional: string; date: string; time: string; name: string; phone: string; email: string; consent: boolean }
type FormErrors = Partial<Record<keyof AppointmentForm, string>>
const initialForm: AppointmentForm = { procedure: '', professional: '', date: '', time: '', name: '', phone: '', email: '', consent: false }
function today() { const date = new Date(); return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}` }
function validEmail(email: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) }

export function AppointmentPage() {
  const [form, setForm] = useState(initialForm)
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [submitError, setSubmitError] = useState('')
  const [request, setRequest] = useState<AppointmentForm | null>(null)
  const [procedureOptions, setProcedureOptions] = useState<Procedure[]>(procedures)
  const [professionalOptions, setProfessionalOptions] = useState<TeamMember[]>(teamMembers)
  const [unavailableTimes, setUnavailableTimes] = useState<string[]>([])
  const minimumDate = useMemo(() => today(), [])

  useEffect(() => { document.title = 'Agendamento | AIROSA Estética' }, [])
  useEffect(() => {
    if (!apiEnabled) return
    Promise.all([apiRequest<Procedure[]>('/procedures'), apiRequest<TeamMember[]>('/professionals')]).then(([nextProcedures, nextProfessionals]) => { setProcedureOptions(nextProcedures); setProfessionalOptions(nextProfessionals) }).catch(() => setSubmitError('Não foi possível carregar os dados da clínica.'))
  }, [])
  useEffect(() => {
    if (!apiEnabled || !form.date || !form.professional) return
    apiRequest<{ slots: { time: string; available: boolean }[] }>(`/appointments/availability?date=${form.date}&professionalId=${form.professional}`).then((result) => {
      const unavailable = result.slots.filter((slot) => !slot.available).map((slot) => slot.time)
      setUnavailableTimes(unavailable)
      if (unavailable.includes(form.time)) update('time', '')
    }).catch(() => setSubmitError('Não foi possível consultar a disponibilidade agora.'))
  }, [form.date, form.professional, form.time])

  const selectedProcedure = procedureOptions.find((item) => item.slug === form.procedure)
  const selectedProfessional = professionalOptions.find((item) => String(item.id) === form.professional)
  function update(field: keyof AppointmentForm, value: string | boolean) { setForm((current) => ({ ...current, [field]: value })); setErrors((current) => ({ ...current, [field]: undefined })) }
  function validate(currentStep: number) {
    const nextErrors: FormErrors = {}
    if (currentStep === 1) { if (!form.procedure) nextErrors.procedure = 'Escolha um procedimento.'; if (!form.professional) nextErrors.professional = 'Escolha um profissional.' }
    if (currentStep === 2) { if (!form.date) nextErrors.date = 'Escolha uma data.'; else if (form.date < minimumDate) nextErrors.date = 'Escolha uma data a partir de hoje.'; if (!form.time) nextErrors.time = 'Escolha um horário.' }
    if (currentStep === 3) { if (!form.name.trim()) nextErrors.name = 'Informe seu nome completo.'; if (!form.phone.trim()) nextErrors.phone = 'Informe seu telefone.'; if (!form.email.trim()) nextErrors.email = 'Informe seu e-mail.'; else if (!validEmail(form.email)) nextErrors.email = 'Digite um e-mail válido.'; if (!form.consent) nextErrors.consent = 'Aceite o consentimento para continuar.' }
    setErrors(nextErrors); return Object.keys(nextErrors).length === 0
  }
  function nextStep() { if (validate(step)) setStep((current) => current + 1) }
  async function confirm(event: FormEvent) { event.preventDefault(); if (!validate(3)) { setStep(3); return }; setStatus('loading'); setSubmitError(''); try { await submitAppointment({ ...form, procedureId: selectedProcedure?.id, professionalId: selectedProfessional?.id }); setRequest(form); setStatus('success') } catch (error) { setSubmitError(error instanceof ApiError && error.status === 409 ? 'Esse horário acabou de ser reservado. Escolha outro horário.' : 'Não foi possível enviar agora. Confira sua conexão e tente novamente.'); setStatus('error') } }

  if (status === 'success' && request) return <section className="appointment-success"><div className="success-icon"><Check size={25} /></div><p className="section-index">AIROSA / solicitação recebida</p><h1>Seu cuidado<br /><em>começa aqui.</em></h1><p>Recebemos sua solicitação. A confirmação definitiva depende do contato da clínica.</p><dl><div><dt>Procedimento</dt><dd>{procedureOptions.find((item) => item.slug === request.procedure)?.name}</dd></div><div><dt>Profissional</dt><dd>{professionalOptions.find((item) => String(item.id) === request.professional)?.name}</dd></div><div><dt>Data e horário</dt><dd>{new Date(`${request.date}T12:00:00`).toLocaleDateString('pt-BR')} · {request.time}</dd></div><div><dt>Contato</dt><dd>{request.name}<br />{request.email}<br />{request.phone}</dd></div></dl><Link className="contact-cta" to="/">Voltar para o início</Link></section>

  return <div className="appointment-page"><section className="appointment-heading"><p className="section-index">AIROSA / agendamento</p><h1>Um tempo reservado<br /><em>para você.</em></h1><p>Envie sua solicitação. Vamos conversar para confirmar o melhor cuidado, data e horário.</p></section><section className="appointment-form-section"><div className="appointment-progress" aria-label={`Etapa ${step} de 4`}><span>0{step}</span><span>de 04</span><div>{[1, 2, 3, 4].map((number) => <i className={step >= number ? 'is-active' : ''} key={number} />)}</div></div><form onSubmit={confirm} noValidate>
    {step === 1 && <fieldset><legend>O que você procura?</legend><p className="form-hint">Escolha o cuidado e a pessoa que acompanhará seu atendimento.</p><label htmlFor="procedure">Procedimento</label><select id="procedure" value={form.procedure} onChange={(event) => update('procedure', event.target.value)}><option value="">Selecione um procedimento</option>{procedureOptions.map((item) => <option value={item.slug} key={item.id}>{item.name}</option>)}</select><FieldMessage message={errors.procedure} /><label htmlFor="professional">Profissional</label><select id="professional" value={form.professional} onChange={(event) => update('professional', event.target.value)}><option value="">Selecione um profissional</option>{professionalOptions.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}</select><FieldMessage message={errors.professional} /></fieldset>}
    {step === 2 && <fieldset><legend>Quando fica melhor?</legend><p className="form-hint">A disponibilidade será confirmada pela clínica.</p><label htmlFor="date">Data</label><input id="date" type="date" min={minimumDate} value={form.date} onChange={(event) => update('date', event.target.value)} /><FieldMessage message={errors.date} /><span className="input-label">Horário</span><div className="time-grid">{appointmentSlots.map((slot) => <label className={`time-option ${form.time === slot ? 'is-selected' : ''}`} key={slot}><input type="radio" name="time" value={slot} checked={form.time === slot} disabled={unavailableTimes.includes(slot)} onChange={(event) => update('time', event.target.value)} /><span>{slot}{unavailableTimes.includes(slot) ? ' · indisponível' : ''}</span></label>)}</div><FieldMessage message={errors.time} /></fieldset>}
    {step === 3 && <fieldset><legend>Como podemos falar com você?</legend><p className="form-hint">Seus dados serão usados para dar continuidade à solicitação.</p><label htmlFor="name">Nome completo</label><input id="name" value={form.name} onChange={(event) => update('name', event.target.value)} autoComplete="name" /><FieldMessage message={errors.name} /><label htmlFor="phone">Telefone</label><input id="phone" type="tel" value={form.phone} onChange={(event) => update('phone', event.target.value)} autoComplete="tel" /><FieldMessage message={errors.phone} /><label htmlFor="email">E-mail</label><input id="email" type="email" value={form.email} onChange={(event) => update('email', event.target.value)} autoComplete="email" /><FieldMessage message={errors.email} /><label className="consent-label"><input type="checkbox" checked={form.consent} onChange={(event) => update('consent', event.target.checked)} /><span>Autorizo o contato da AIROSA sobre esta solicitação.</span></label><FieldMessage message={errors.consent} /></fieldset>}
    {step === 4 && <fieldset><legend>Confira sua solicitação</legend><p className="form-hint">O envio é uma solicitação, não uma reserva confirmada.</p><dl className="review-list"><div><dt>Procedimento</dt><dd>{selectedProcedure?.name}</dd></div><div><dt>Profissional</dt><dd>{selectedProfessional?.name}</dd></div><div><dt>Data e horário</dt><dd>{new Date(`${form.date}T12:00:00`).toLocaleDateString('pt-BR')} · {form.time}</dd></div><div><dt>Contato</dt><dd>{form.name}<br />{form.email}<br />{form.phone}</dd></div></dl></fieldset>}
    {status === 'error' && <p className="form-status error" role="alert">{submitError}</p>}<div className="form-actions">{step > 1 && <button className="back-button" type="button" onClick={() => { setErrors({}); setStep((current) => current - 1) }}><ArrowLeft size={16} /> Voltar</button>}{step < 4 ? <button className="contact-cta" type="button" onClick={nextStep}>Continuar <ArrowRight size={16} /></button> : <button className="contact-cta" type="submit" disabled={status === 'loading'}>{status === 'loading' ? <><LoaderCircle className="spin" size={17} /> Enviando</> : <>Confirmar solicitação <Check size={17} /></>}</button>}</div></form></section></div>
}
