import { createContext } from 'react'

export interface SeoData {
  title: string
  description: string
  /** Données structurées Schema.org injectées dans un <script type="application/ld+json">. */
  jsonLd?: object
  /** `noindex` pour les pages sans valeur SEO. */
  noIndex?: boolean
}

/**
 * Collecteur de métadonnées utilisé pendant le pré-rendu.
 *
 * Côté serveur, les effets React ne s'exécutent pas : `useSeo` écrit donc ses
 * métadonnées dans ce collecteur pendant le rendu, et `scripts/prerender.mjs`
 * les injecte dans le <head> du fichier HTML généré. Dans le navigateur, la
 * valeur est `null` et `useSeo` passe par ses effets habituels.
 */
export const SeoCollectorContext = createContext<{ current: SeoData | null } | null>(null)
