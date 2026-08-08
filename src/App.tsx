import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Header } from './components/Layout/Header'
import { Footer } from './components/Layout/Footer'
import { ConsentProvider } from './lib/consent'
import { ConsentBanner } from './components/Consent/ConsentBanner'
import { AnchorAd } from './components/Ads/AnchorAd'
import { AdUnit } from './components/Ads/AdUnit'
import { AD_SLOTS } from './lib/adsense'
import { useScrollToTop } from './hooks/useSeo'
import { Home } from './pages/Home'
import { HowItWorksPage } from './pages/HowItWorksPage'
import { UseCasesPage } from './pages/UseCasesPage'
import { FaqPage } from './pages/FaqPage'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { LegalNotice } from './pages/LegalNotice'
import { Terms } from './pages/Terms'
import { Contact } from './pages/Contact'
import { NotFound } from './pages/NotFound'

function Shell() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  useScrollToTop()

  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-lg focus:bg-accent-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Aller au contenu principal
      </a>
      <Header />

      {/*
        Bannière haute : uniquement sur les pages de contenu. Sur l'accueil, elle
        repousserait le générateur sous la ligne de flottaison, ce qui coûterait
        plus en conversion qu'elle ne rapporterait.
      */}
      {!isHome && (
        <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6">
          <AdUnit slot={AD_SLOTS.headerBanner} format="horizontal" minHeight={50} minHeightDesktop={90} />
        </div>
      )}

      <main id="contenu">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comment-ca-marche" element={<HowItWorksPage />} />
          <Route path="/cas-usage" element={<UseCasesPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/politique-de-confidentialite" element={<PrivacyPolicy />} />
          <Route path="/mentions-legales" element={<LegalNotice />} />
          <Route path="/conditions-utilisation" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <ConsentBanner />
      <AnchorAd />
    </>
  )
}

export default function App() {
  return (
    <ConsentProvider>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </ConsentProvider>
  )
}
