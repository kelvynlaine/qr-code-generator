import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { adUnitsEnabled, ADSENSE_CLIENT_ID } from '../../lib/adsense'

interface AdUnitProps {
  /** Identifiant du bloc AdSense. Vide = emplacement désactivé. */
  slot: string
  format?: 'auto' | 'fluid' | 'horizontal' | 'rectangle'
  /** `in-article` pour les blocs natifs In-Article (attendu par AdSense avec format="fluid"). */
  layout?: 'in-article'
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
 * 1. **Mode neutre** — tant que les blocs manuels ne sont pas activés (site pas
 *    encore approuvé) ou sans slot, le composant ne rend rien du tout. Le layout
 *    du site est donc identique avec et sans publicité. Le consentement est géré
 *    par le message Google, qui encadre lui-même la diffusion des annonces.
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
  layout,
  layoutKey,
  minHeight = 100,
  minHeightDesktop,
  className = '',
}: AdUnitProps) {
  const { pathname } = useLocation()
  const insRef = useRef<HTMLModElement>(null)

  const enabled = adUnitsEnabled() && slot.length > 0

  useEffect(() => {
    if (!enabled) return
    const element = insRef.current
    // `data-adsbygoogle-status` est posé par AdSense : sa présence signifie
    // que ce bloc a déjà reçu une annonce, il ne faut pas le repousser.
    if (!element || element.getAttribute('data-adsbygoogle-status')) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle ?? []).push({})
    } catch {
      /* Script bloqué : on laisse simplement l'espace vide, sans erreur visible. */
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
        data-ad-layout={layout}
        data-ad-layout-key={layoutKey}
        data-full-width-responsive="true"
      />
    </div>
  )
}
