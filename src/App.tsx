import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/Layout/Header'
import { Footer } from './components/Layout/Footer'
import { useScrollToTop } from './hooks/useSeo'
import { ROUTES } from './routes'

/**
 * Structure du site, indépendante du routeur : le navigateur la monte dans un
 * BrowserRouter, le pré-rendu dans un StaticRouter (voir entry-server.tsx).
 */
export function AppShell() {
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

      <main id="contenu">
        <Routes>
          {ROUTES.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
