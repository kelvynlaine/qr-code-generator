import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { loadAdSenseScript } from './adsense'

/**
 * Gestion du consentement publicitaire (RGPD + Google Consent Mode v2).
 *
 * Règles appliquées :
 * - aucun script publicitaire n'est chargé avant un choix explicite ;
 * - le refus est aussi accessible que l'acceptation (pas de dark pattern) ;
 * - le refus n'empêche jamais l'utilisation du générateur ;
 * - le choix est mémorisé localement pour ne pas être redemandé à chaque visite.
 */

export type ConsentStatus = 'pending' | 'granted' | 'denied'

const STORAGE_KEY = 'qr-studio-consent-v1'
/** Un consentement expire au bout de 6 mois (recommandation CNIL : 13 mois maximum). */
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 182

interface StoredConsent {
  ads: boolean
  date: number
}

interface ConsentContextValue {
  status: ConsentStatus
  /** Vrai si l'utilisateur a accepté les cookies publicitaires. */
  adsAllowed: boolean
  accept: () => void
  reject: () => void
  /** Rouvre la bannière pour permettre de modifier son choix (lien de footer). */
  reopen: () => void
}

const ConsentContext = createContext<ConsentContextValue | null>(null)

function readStoredConsent(): ConsentStatus {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return 'pending'
    const parsed = JSON.parse(raw) as StoredConsent
    if (Date.now() - parsed.date > MAX_AGE_MS) return 'pending'
    return parsed.ads ? 'granted' : 'denied'
  } catch {
    return 'pending'
  }
}

/** Met à jour Google Consent Mode v2 (le script `gtag` est initialisé dans index.html). */
function updateConsentMode(granted: boolean): void {
  const value = granted ? 'granted' : 'denied'
  window.gtag?.('consent', 'update', {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  })
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<ConsentStatus>(() => readStoredConsent())

  // Un consentement déjà accordé lors d'une visite précédente doit être rejoué au démarrage.
  useEffect(() => {
    if (status === 'granted') {
      updateConsentMode(true)
      void loadAdSenseScript().catch(() => {
        /* Bloqueur de publicité ou réseau indisponible : le site reste pleinement fonctionnel. */
      })
    }
  }, [status])

  const persist = useCallback((ads: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ads, date: Date.now() } satisfies StoredConsent))
    } catch {
      /* Stockage indisponible (navigation privée) : le choix vaut pour la session. */
    }
  }, [])

  const accept = useCallback(() => {
    persist(true)
    setStatus('granted')
  }, [persist])

  const reject = useCallback(() => {
    persist(false)
    updateConsentMode(false)
    setStatus('denied')
  }, [persist])

  const reopen = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
    setStatus('pending')
  }, [])

  const value = useMemo<ConsentContextValue>(
    () => ({ status, adsAllowed: status === 'granted', accept, reject, reopen }),
    [status, accept, reject, reopen],
  )

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
}

export function useConsent(): ConsentContextValue {
  const context = useContext(ConsentContext)
  if (!context) throw new Error('useConsent doit être utilisé dans un ConsentProvider.')
  return context
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}
