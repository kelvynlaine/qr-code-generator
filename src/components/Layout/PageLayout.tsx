import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { AdUnit } from '../Ads/AdUnit'
import { AD_SLOTS } from '../../lib/adsense'

interface PageLayoutProps {
  title: string
  lead?: string
  /** Date de dernière mise à jour, déjà formatée. */
  updatedAt?: string
  /** Ligne d'informations sous le titre (auteur, temps de lecture…). */
  meta?: string
  /** Niveaux intermédiaires du fil d'Ariane, entre « Accueil » et la page courante. */
  breadcrumb?: { to: string; label: string }[]
  /** Colonne latérale (desktop) : sommaire, encarts, publicité. */
  aside?: ReactNode
  /** Contenu placé après l'article, hors de la typographie éditoriale. */
  after?: ReactNode
  children: ReactNode
}

/**
 * Gabarit des pages de contenu (éditoriales et légales).
 *
 * La publicité latérale n'apparaît que sur ces pages, jamais à côté du générateur :
 * elle reste ainsi loin de tout bouton d'action du produit.
 */
export function PageLayout({
  title,
  lead,
  updatedAt,
  meta,
  breadcrumb = [],
  aside,
  after,
  children,
}: PageLayoutProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <nav aria-label="Fil d’Ariane" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted">
        <Link to="/" className="transition-colors duration-150 hover:text-accent-600">
          Accueil
        </Link>
        {breadcrumb.map((item) => (
          <span key={item.to} className="flex items-center gap-1">
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
            <Link to={item.to} className="transition-colors duration-150 hover:text-accent-600">
              {item.label}
            </Link>
          </span>
        ))}
        <ChevronRight aria-hidden="true" className="h-4 w-4" />
        <span className="text-ink">{title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
        <article className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl">{title}</h1>
          {lead && <p className="mt-4 text-lg text-pretty text-muted">{lead}</p>}
          {(meta || updatedAt) && (
            <p className="mt-3 text-sm text-muted">
              {meta}
              {meta && updatedAt && ' · '}
              {updatedAt && `Mis à jour le ${updatedAt}`}
            </p>
          )}
          <div className="rich-text mt-8">{children}</div>
          {after}
        </article>

        <aside className="hidden lg:sticky lg:top-24 lg:block">
          {aside}
          <AdUnit
            slot={AD_SLOTS.sidebar}
            format="rectangle"
            minHeight={250}
            minHeightDesktop={600}
            className="mt-6"
          />
        </aside>
      </div>
    </div>
  )
}
