import { MessageCircle } from 'lucide-react'
import { clinic } from '../../data/clinic'

type WhatsAppButtonProps = {
  label?: string
  message?: string
  className?: string
}

function whatsappNumber() {
  return clinic.whatsapp.replace(/\D/g, '')
}

export function WhatsAppButton({ label = 'Falar pelo WhatsApp', message = 'Olá AIROSA, gostaria de saber mais sobre os cuidados da clínica.', className = '' }: WhatsAppButtonProps) {
  const href = `https://wa.me/${whatsappNumber()}?text=${encodeURIComponent(message)}`

  return <a className={`whatsapp-button ${className}`} href={href} target="_blank" rel="noreferrer" aria-label={`${label} (abre em nova aba)`}><MessageCircle size={17} strokeWidth={1.5} aria-hidden="true" /><span>{label}</span></a>
}
