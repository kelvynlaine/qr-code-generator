/**
 * Consentement RGPD : il est entièrement géré par le message « Réglementations
 * européennes » publié dans AdSense (Confidentialité et messages), une CMP
 * certifiée IAB TCF chargée avec le script AdSense. Le site n'affiche donc aucun
 * bandeau maison : deux dispositifs en parallèle se contrediraient.
 */

interface GoogleFundingChoices {
  callbackQueue?: unknown[]
  showRevocationMessage?: () => void
}

declare global {
  interface Window {
    googlefc?: GoogleFundingChoices
  }
}

/** Réaffiche le message de consentement Google pour modifier ou retirer son choix. */
export function openCookiePreferences(): void {
  const googlefc = (window.googlefc ??= {})
  googlefc.callbackQueue ??= []
  googlefc.callbackQueue.push(() => window.googlefc?.showRevocationMessage?.())
}
