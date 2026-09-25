import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getProcedureBySlug } from '../../data/procedures'

const defaultDescription = 'AIROSA Estética: cuidado estético individualizado, acolhedor e consciente.'

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

export function SEO() {
  const { pathname } = useLocation()

  useEffect(() => {
    const procedure = pathname.startsWith('/procedimentos/') ? getProcedureBySlug(pathname.split('/').pop()) : undefined
    const isNotFound = pathname.startsWith('/procedimentos/') && !procedure
    const metadata: Record<string, { title: string; description: string }> = {
      '/': { title: 'AIROSA Estética | Cuidado com intenção', description: defaultDescription },
      '/procedimentos': { title: 'Procedimentos | AIROSA Estética', description: 'Conheça as possibilidades de cuidado da AIROSA Estética.' },
      '/sobre': { title: 'Sobre | AIROSA Estética', description: 'Conheça a filosofia, a abordagem e o cuidado da AIROSA Estética.' },
      '/equipe': { title: 'Equipe | AIROSA Estética', description: 'Conheça quem conduz a experiência da AIROSA Estética.' },
      '/agendamento': { title: 'Agendamento | AIROSA Estética', description: 'Envie sua solicitação de avaliação para a AIROSA Estética.' },
      '/contato': { title: 'Contato | AIROSA Estética', description: 'Entre em contato com a AIROSA Estética.' },
      '/faq': { title: 'Perguntas frequentes | AIROSA Estética', description: 'Respostas para dúvidas frequentes sobre a AIROSA Estética.' },
      '/politica-de-privacidade': { title: 'Política de Privacidade | AIROSA Estética', description: 'Política de privacidade demonstrativa da AIROSA Estética.' },
      '/politica-de-cookies': { title: 'Política de Cookies | AIROSA Estética', description: 'Política de cookies demonstrativa da AIROSA Estética.' },
      '/termos-de-uso': { title: 'Termos de Uso | AIROSA Estética', description: 'Termos de uso demonstrativos da AIROSA Estética.' },
    }
    const current = procedure ? { title: `${procedure.name} | AIROSA Estética`, description: procedure.description } : isNotFound ? { title: 'Procedimento não encontrado | AIROSA Estética', description: 'O procedimento solicitado não foi encontrado.' } : metadata[pathname] ?? (pathname !== '/' ? { title: 'Página não encontrada | AIROSA Estética', description: 'A página solicitada não foi encontrada.' } : metadata['/'])
    const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin
    const canonicalUrl = `${siteUrl.replace(/\/$/, '')}${pathname}`
    document.title = current.title
    setMeta('name', 'description', current.description)
    setMeta('property', 'og:title', current.title)
    setMeta('property', 'og:description', current.description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:url', canonicalUrl)
    setMeta('property', 'og:site_name', 'AIROSA Estética')
    setMeta('name', 'twitter:card', 'summary')
    setMeta('name', 'twitter:title', current.title)
    setMeta('name', 'twitter:description', current.description)
    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', canonicalUrl)
  }, [pathname])

  return null
}
