import { useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_URL } from '../lib/adsense'
import { SeoCollectorContext, type SeoData } from '../lib/seo'

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
 * Open Graph, données structurées).
 *
 * Deux chemins :
 * - **pré-rendu** : les métadonnées sont capturées pendant le rendu serveur et
 *   écrites en dur dans le HTML de chaque page — c'est ce que lisent les robots ;
 * - **navigateur** : elles sont mises à jour à chaque navigation côté client.
 */
export function useSeo({ title, description, jsonLd, noIndex = false }: SeoData): void {
  const collector = useContext(SeoCollectorContext)
  const { pathname } = useLocation()

  if (collector) collector.current = { title, description, jsonLd, noIndex }

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

    // Les données structurées écrites au pré-rendu ne valent que pour la page
    // d'arrivée : elles sont remplacées par celles de la page affichée.
    document.head.querySelectorAll('script[data-seo="ssr"]').forEach((node) => node.remove())

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
