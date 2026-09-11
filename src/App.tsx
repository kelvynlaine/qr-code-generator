import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Header } from './components/Layout/Header'
import { Footer } from './components/Layout/Footer'
import { ConsentProvider } from './lib/consent'
import { ConsentBanner } from './components/Consent/ConsentBanner'
import { AnchorAd } from './components/Ads/AnchorAd'
import { AdUnit } from './components/Ads/AdUnit'
import { AD_SLOTS } from './lib/adsense'
import { useScrollToTop } from './hooks/useSeo'
import { ROUTES } from './routes'

/**
 * Structure du site, indépendante du routeur : le navigateur la monte dans un
 * BrowserRouter, le pré-rendu dans un StaticRouter (voir entry-server.tsx).
 */
export function AppShell() {
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
          {ROUTES.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
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
        <AppShell />
      </BrowserRouter>
    </ConsentProvider>
  )
}
