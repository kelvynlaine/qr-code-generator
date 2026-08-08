import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { X } from 'lucide-react'
import { useConsent } from '../../lib/consent'
import { isAdSenseConfigured, AD_SLOTS } from '../../lib/adsense'
import { AdUnit } from './AdUnit'

/**
 * Ancre publicitaire mobile (bas d'écran).
 *
 * Contraintes respectées :
 * - toujours fermable (bouton « × » de 44 px, fermeture mémorisée pour la session) ;
 * - masquée sur desktop (≥ 640 px) ;
 * - **jamais affichée tant que la zone de téléchargement du générateur est visible** :
 *   elle n'apparaît qu'une fois cette zone dépassée au défilement, pour ne recouvrir
 *   ni l'aperçu du QR code, ni le bouton « Télécharger » ;
 * - masquée tant que la bannière de consentement est ouverte, pour ne pas empiler
 *   deux éléments fixes en bas d'écran.
 */
export function AnchorAd() {
  const { status, adsAllowed } = useConsent()
  const { pathname } = useLocation()
  const [dismissed, setDismissed] = useState(() => sessionStorage.getItem('anchor-ad-dismissed') === '1')
  const [pastGenerator, setPastGenerator] = useState(false)

  useEffect(() => {
    let frame = 0

    // L'ancre ne s'affiche que lorsque la zone de téléchargement est sortie de l'écran.
    // Le calcul se fait au défilement plutôt qu'avec un IntersectionObserver : celui-ci
    // ne délivre pas toujours de callback initial selon le contexte de rendu, ce qui
    // laisserait l'ancre définitivement masquée.
    const evaluate = () => {
      frame = 0
      const target = document.getElementById('zone-telechargement')
      // Pas de générateur sur cette page (pages éditoriales) : rien ne s'oppose à l'ancre.
      if (!target) {
        setPastGenerator(true)
        return
      }
      const { bottom } = target.getBoundingClientRect()
      setPastGenerator(bottom < 120)
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(evaluate)
    }

    evaluate()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [pathname])

  if (!adsAllowed || !isAdSenseConfigured() || !AD_SLOTS.mobileAnchor) return null
  if (dismissed || !pastGenerator || status !== 'granted') return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur-sm sm:hidden">
      <button
        type="button"
        aria-label="Fermer la publicité"
        onClick={() => {
          sessionStorage.setItem('anchor-ad-dismissed', '1')
          setDismissed(true)
        }}
        className="absolute -top-11 right-2 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-muted shadow-sm"
      >
        <X aria-hidden="true" className="h-4 w-4" />
      </button>
      <AdUnit slot={AD_SLOTS.mobileAnchor} format="horizontal" minHeight={50} className="py-1" />
    </div>
  )
}
