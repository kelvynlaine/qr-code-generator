import { useEffect, useId, useRef, useState } from 'react'
import { Cookie } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useConsent } from '../../lib/consent'
import { Toggle } from '../ui/Controls'

/**
 * Bannière de consentement conforme RGPD / Consent Mode v2.
 *
 * « Tout accepter », « Tout refuser » et « Personnaliser » ont exactement le même
 * poids visuel (même taille, même hiérarchie) : refuser doit être aussi simple
 * qu'accepter. Aucun contenu du site n'est bloqué tant que le choix n'est pas fait —
 * seuls les scripts publicitaires le sont.
 */
export function ConsentBanner() {
  const { status, accept, reject } = useConsent()
  const [showDetails, setShowDetails] = useState(false)
  const [adsChoice, setAdsChoice] = useState(false)
  const titleId = useId()
  const bannerRef = useRef<HTMLDivElement>(null)

  // La bannière prend le focus à l'ouverture pour être annoncée aux lecteurs d'écran.
  useEffect(() => {
    if (status === 'pending') bannerRef.current?.focus()
  }, [status])

  if (status !== 'pending') return null

  const buttonBase =
    'min-h-11 flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors duration-150'

  return (
    <div
      ref={bannerRef}
      tabIndex={-1}
      role="dialog"
      aria-labelledby={titleId}
      aria-describedby={`${titleId}-desc`}
      className="fixed inset-x-0 bottom-0 z-90 border-t border-border bg-surface p-4 shadow-[0_-8px_30px_rgb(15_23_42_/_0.12)] sm:p-5"
    >
      <div className="mx-auto max-w-4xl">
        <div className="flex items-start gap-3">
          <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-600 sm:flex dark:bg-accent-500/15 dark:text-accent-300">
            <Cookie aria-hidden="true" className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <h2 id={titleId} className="font-semibold text-ink">
              Nous utilisons des cookies publicitaires
            </h2>
            <p id={`${titleId}-desc`} className="mt-1 text-sm text-pretty text-muted">
              Le générateur de QR code est gratuit et financé par la publicité. Avec votre accord,
              Google et ses partenaires déposent des cookies pour afficher des annonces
              personnalisées et en mesurer la performance.{' '}
              <strong className="font-medium text-ink">
                Votre choix n’a aucun effet sur le générateur : il reste entièrement utilisable dans
                tous les cas.
              </strong>{' '}
              Détails dans notre{' '}
              <Link
                to="/politique-de-confidentialite"
                className="font-medium text-accent-600 underline underline-offset-2 dark:text-accent-300"
              >
                politique de confidentialité
              </Link>
              .
            </p>
          </div>
        </div>

        {showDetails && (
          <div className="mt-4 space-y-3 rounded-xl border border-border bg-subtle p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-ink">Cookies strictement nécessaires</p>
                <p className="text-xs text-muted">
                  Mémorisation de votre thème et de ce choix de consentement. Toujours actifs, ils ne
                  servent à aucun suivi publicitaire.
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-border px-2.5 py-1 text-xs font-medium text-muted">
                Requis
              </span>
            </div>
            <div className="border-t border-border pt-3">
              <Toggle
                label="Cookies publicitaires (Google AdSense)"
                description="Annonces personnalisées et mesure d’audience publicitaire."
                checked={adsChoice}
                onChange={setAdsChoice}
              />
            </div>
          </div>
        )}

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <button type="button" onClick={accept} className={`${buttonBase} bg-accent-600 text-white hover:bg-accent-700`}>
            Tout accepter
          </button>
          <button
            type="button"
            onClick={reject}
            className={`${buttonBase} bg-accent-600 text-white hover:bg-accent-700`}
          >
            Tout refuser
          </button>
          {showDetails ? (
            <button
              type="button"
              onClick={() => (adsChoice ? accept() : reject())}
              className={`${buttonBase} border border-border bg-surface text-ink hover:border-accent-400`}
            >
              Enregistrer mes choix
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowDetails(true)}
              className={`${buttonBase} border border-border bg-surface text-ink hover:border-accent-400`}
            >
              Personnaliser
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
