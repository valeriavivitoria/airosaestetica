import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/sections/Hero'
import { FeaturedProcedures } from './components/sections/FeaturedProcedures'
import { ArrowUpRight } from 'lucide-react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProceduresPage } from './pages/ProceduresPage'
import { ProcedureDetailPage } from './pages/ProcedureDetailPage'
import { AboutPage } from './pages/AboutPage'
import { TeamPage } from './pages/TeamPage'
import { AppointmentPage } from './pages/AppointmentPage'
import { ContactPage } from './pages/ContactPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { CookiesPage } from './pages/CookiesPage'
import { TermsPage } from './pages/TermsPage'
import { Footer } from './components/layout/Footer'
import { SEO } from './components/seo/SEO'
import { FaqPage } from './pages/FaqPage'
import { NotFoundPage } from './pages/NotFoundPage'
import './App.css'

function HomePage() {
  return (
    <>
      <Hero />
      <section className="intro-section" id="sobre">
        <p className="section-index">01 / essência</p>
        <div>
          <h2>Um cuidado que começa antes do espelho.</h2>
          <p>Na AIROSA, cada escolha é feita com tempo e presença. Acreditamos em resultados elegantes, que respeitam a sua história e acompanham o seu ritmo.</p>
        </div>
      </section>
      <FeaturedProcedures />

      <section className="team-section" id="equipe">
        <p className="section-index">03 / quem cuida</p>
        <h2>Conhecimento que<br /><em>acolhe.</em></h2>
        <p>À frente da AIROSA, Adriana Santos Farias reúne experiência técnica e um olhar atento para criar jornadas únicas de cuidado.</p>
      </section>

      <section className="contact-section" id="contato">
        <p className="section-index">04 / seu momento</p>
        <h2>Vamos conversar<br /><em>sobre você?</em></h2>
        <a className="contact-cta" href="/agendamento">Agendar avaliação <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" /></a>
        <p className="contact-note">Atendimento personalizado por agendamento.</p>
      </section>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <SEO />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/procedimentos" element={<ProceduresPage />} />
            <Route path="/procedimentos/:slug" element={<ProcedureDetailPage />} />
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/equipe" element={<TeamPage />} />
            <Route path="/agendamento" element={<AppointmentPage />} />
            <Route path="/contato" element={<ContactPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/politica-de-privacidade" element={<PrivacyPage />} />
            <Route path="/politica-de-cookies" element={<CookiesPage />} />
            <Route path="/termos-de-uso" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
