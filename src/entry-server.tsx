import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { AppShell } from './App'
import { ConsentProvider } from './lib/consent'
import { SeoCollectorContext, type SeoData } from './lib/seo'
import { SITE_URL } from './lib/adsense'
import { ROUTES } from './routes'

/**
 * Point d'entrée du pré-rendu, exécuté dans Node par scripts/prerender.mjs.
 * L'arbre rendu reproduit exactement celui de main.tsx.
 */
export function render(url: string): { html: string; seo: SeoData | null } {
  const seo: { current: SeoData | null } = { current: null }

  const html = renderToString(
    <StrictMode>
      <SeoCollectorContext.Provider value={seo}>
        <ConsentProvider>
          <StaticRouter location={url}>
            <AppShell />
          </StaticRouter>
        </ConsentProvider>
      </SeoCollectorContext.Provider>
    </StrictMode>,
  )

  return { html, seo: seo.current }
}

export const prerenderRoutes = ROUTES.map(({ path, sitemap }) => ({ path, sitemap }))

export { SITE_URL }
