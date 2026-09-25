/**
 * Configuration AdSense.
 *
 * Le Publisher ID n'est jamais écrit en dur : il vient de `VITE_ADSENSE_CLIENT_ID`
 * (voir `.env.example`). Le script AdSense lui-même est injecté dans le <head> de
 * chaque page au build (voir vite.config.ts) : c'est ce que le robot d'examen
 * AdSense vérifie, et c'est lui qui charge le message de consentement Google.
 *
 * Les blocs manuels (`<AdUnit>`) ne s'affichent que si `VITE_ADSENSE_SHOW_UNITS`
 * vaut `true`. À laisser sur `false` tant que le site n'est pas approuvé : des
 * emplacements « Publicité » vides pendant l'examen desservent la demande.
 */

export const ADSENSE_CLIENT_ID: string = import.meta.env.VITE_ADSENSE_CLIENT_ID ?? ''

/** URL publique du site, utilisée pour les balises canoniques et le sitemap. */
export const SITE_URL: string = import.meta.env.VITE_SITE_URL ?? 'https://codeqrgen.fr'

/**
 * Identifiants des blocs créés dans l'interface AdSense.
 * Un slot vide désactive l'emplacement correspondant.
 */
export const AD_SLOTS = {
  /** Bloc de respiration entre le générateur et les sections éditoriales. */
  afterGenerator: import.meta.env.VITE_AD_SLOT_AFTER_GENERATOR ?? '',
  /** Bloc in-article inséré dans la FAQ. */
  inArticle: import.meta.env.VITE_AD_SLOT_IN_ARTICLE ?? '',
} as const

export const isAdSenseConfigured = (): boolean => ADSENSE_CLIENT_ID.startsWith('ca-pub-')

/** Blocs manuels activés (uniquement après approbation du site par AdSense). */
export const adUnitsEnabled = (): boolean =>
  isAdSenseConfigured() && import.meta.env.VITE_ADSENSE_SHOW_UNITS === 'true'

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}
