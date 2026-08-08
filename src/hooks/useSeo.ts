import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_URL } from '../lib/adsense'

interface SeoOptions {
  title: string
  description: string
  /** Données structurées Schema.org injectées dans un <script type="application/ld+json">. */
  jsonLd?: object
  /** `noindex` pour les pages sans valeur SEO. */
  noIndex?: boolean
}

function setMeta(selector: string, attribute: string, value: string): void {
  let tag = document.head.querySelector<HTMLMetaElement>(selector)
  if (!tag) {
    tag = document.createElement('meta')
    const [, name] = selector.match(/\[(?:name|property)="(.+)"\]/) ?? []
    tag.setAttribute(selector.includes('property=') ? 'property' : 'name', name ?? '')
    document.head.appendChild(tag)
  }
  tag.setAttribute(attribute, value)
}

/**
 * Renseigne les métadonnées de la page courante (titre, description, canonique,
 * Open Graph, données structurées) et remonte en haut à chaque changement de route.
 *
 * Le site étant une SPA, ces balises sont posées côté client : c'est suffisant pour
 * Google qui exécute le JavaScript, mais un rendu serveur (Next.js, ou un
 * pré-rendu type `vite-plugin-ssg`) reste préférable si le SEO devient critique.
 */
export function useSeo({ title, description, jsonLd, noIndex = false }: SeoOptions): void {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = title
    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:url"]', 'content', `${SITE_URL}${pathname}`)
    setMeta('meta[name="robots"]', 'content', noIndex ? 'noindex, follow' : 'index, follow')

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = `${SITE_URL}${pathname}`

    if (!jsonLd) return
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(jsonLd)
    document.head.appendChild(script)
    return () => script.remove()
  }, [title, description, jsonLd, noIndex, pathname])
}

/** Remet le défilement en haut lors d'un changement de page (comportement natif d'un site multipage). */
export function useScrollToTop(): void {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
}
