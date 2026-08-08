import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { isAdSenseConfigured, loadAdSenseScript, ADSENSE_CLIENT_ID } from '../../lib/adsense'
import { useConsent } from '../../lib/consent'

interface AdUnitProps {
  /** Identifiant du bloc AdSense. Vide = emplacement désactivé. */
  slot: string
  format?: 'auto' | 'fluid' | 'horizontal' | 'rectangle'
  layoutKey?: string
  /** Hauteur réservée en CSS avant chargement, pour éviter tout layout shift. */
  minHeight?: number
  /** Hauteur réservée à partir du breakpoint `sm`. */
  minHeightDesktop?: number
  className?: string
}

/**
 * Bloc publicitaire AdSense.
 *
 * Trois garde-fous :
 * 1. **Mode neutre** — sans Publisher ID (compte pas encore approuvé), sans slot,
 *    ou sans consentement, le composant ne rend rien du tout. Le layout du site
 *    est donc identique avec et sans publicité : aucune régression possible.
 * 2. **Espace réservé** — dès qu'une annonce est susceptible de s'afficher, le
 *    conteneur impose une hauteur minimale, ce qui évite le décalage de contenu
 *    (Cumulative Layout Shift) au moment du remplissage.
 * 3. **Un seul push par slot** — `adsbygoogle.push()` n'est appelé que si l'élément
 *    n'a pas déjà été traité, ce qui évite l'erreur classique
 *    « All ins elements already have ads in them » en navigation SPA.
 */
export function AdUnit({
  slot,
  format = 'auto',
  layoutKey,
  minHeight = 100,
  minHeightDesktop,
  className = '',
}: AdUnitProps) {
  const { adsAllowed } = useConsent()
  const { pathname } = useLocation()
  const insRef = useRef<HTMLModElement>(null)

  const enabled = adsAllowed && isAdSenseConfigured() && slot.length > 0

  useEffect(() => {
    if (!enabled) return
    let cancelled = false

    void loadAdSenseScript()
      .then(() => {
        const element = insRef.current
        // `data-adsbygoogle-status` est posé par AdSense : sa présence signifie
        // que ce bloc a déjà reçu une annonce, il ne faut pas le repousser.
        if (cancelled || !element || element.getAttribute('data-adsbygoogle-status')) return
        ;(window.adsbygoogle = window.adsbygoogle ?? []).push({})
      })
      .catch(() => {
        /* Script bloqué : on laisse simplement l'espace vide, sans erreur visible. */
      })

    return () => {
      cancelled = true
    }
    // `pathname` force un nouveau montage/push lors d'un changement de page côté client.
  }, [enabled, slot, pathname])

  if (!enabled) return null

  return (
    <div
      className={`ad-slot ${className}`}
      style={
        {
          '--ad-min-height': `${minHeight}px`,
          '--ad-min-height-desktop': `${minHeightDesktop ?? minHeight}px`,
        } as React.CSSProperties
      }
    >
      <p className="mb-1 text-center text-[11px] tracking-wide text-muted uppercase">Publicité</p>
      <ins
        key={`${slot}-${pathname}`}
        ref={insRef}
        className="adsbygoogle block"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-ad-layout-key={layoutKey}
        data-full-width-responsive="true"
      />
    </div>
  )
}
