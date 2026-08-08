/**
 * Configuration AdSense.
 *
 * Le Publisher ID n'est jamais écrit en dur : il vient de `VITE_ADSENSE_CLIENT_ID`
 * (voir `.env.example`). Tant que la variable est absente — c'est-à-dire tant que
 * le compte AdSense n'est pas approuvé — les blocs publicitaires tournent en
 * « mode neutre » : ils ne rendent rien et ne réservent aucun espace, donc le
 * layout du site est strictement identique avec et sans publicité.
 */

export const ADSENSE_CLIENT_ID: string = import.meta.env.VITE_ADSENSE_CLIENT_ID ?? ''

/** URL publique du site, utilisée pour les balises canoniques et le sitemap. */
export const SITE_URL: string = import.meta.env.VITE_SITE_URL ?? 'https://qrstudio.example'

/**
 * Identifiants des blocs créés dans l'interface AdSense.
 * Un slot vide désactive l'emplacement correspondant.
 */
export const AD_SLOTS = {
  /** Bannière horizontale sous la navigation (pages éditoriales et légales). */
  headerBanner: import.meta.env.VITE_AD_SLOT_HEADER ?? '',
  /** Bloc de respiration entre le générateur et les sections éditoriales. */
  afterGenerator: import.meta.env.VITE_AD_SLOT_AFTER_GENERATOR ?? '',
  /** Bloc in-article inséré dans la FAQ. */
  inArticle: import.meta.env.VITE_AD_SLOT_IN_ARTICLE ?? '',
  /** Bannière de bas de page, avant les liens légaux. */
  footer: import.meta.env.VITE_AD_SLOT_FOOTER ?? '',
  /** Rectangle latéral (desktop uniquement) des pages de contenu. */
  sidebar: import.meta.env.VITE_AD_SLOT_SIDEBAR ?? '',
  /** Ancre mobile en bas d'écran. */
  mobileAnchor: import.meta.env.VITE_AD_SLOT_MOBILE_ANCHOR ?? '',
} as const

export const isAdSenseConfigured = (): boolean => ADSENSE_CLIENT_ID.startsWith('ca-pub-')

let scriptPromise: Promise<void> | null = null

/**
 * Charge le script AdSense, une seule fois, de façon asynchrone.
 * Appelé uniquement après un consentement publicitaire explicite : aucun script
 * publicitaire n'est injecté avant le choix de l'utilisateur.
 */
export function loadAdSenseScript(): Promise<void> {
  if (!isAdSenseConfigured()) return Promise.resolve()
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.async = true
    script.crossOrigin = 'anonymous'
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Chargement d’AdSense impossible.'))
    document.head.appendChild(script)
  })

  return scriptPromise
}

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}
