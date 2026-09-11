import { useMemo, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, QrCode } from 'lucide-react'
import { PageLayout } from '../Layout/PageLayout'
import { GUIDE_AUTHOR, GUIDES, formatGuideDate, guidePath } from '../../data/guides'
import { SITE_URL } from '../../lib/adsense'
import { useSeo } from '../../hooks/useSeo'

interface GuideLayoutProps {
  slug: string
  children: ReactNode
}

/** Mise en page commune des guides : métadonnées, données structurées Article, articles liés. */
export function GuideLayout({ slug, children }: GuideLayoutProps) {
  const guide = GUIDES.find((item) => item.slug === slug)
  if (!guide) throw new Error(`Guide inconnu : ${slug}`)

  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.title,
      description: guide.description,
      datePublished: guide.publishedAt,
      dateModified: guide.updatedAt,
      inLanguage: 'fr-FR',
      author: { '@type': 'Person', name: GUIDE_AUTHOR },
      publisher: { '@type': 'Organization', name: 'QR Studio', url: SITE_URL },
      mainEntityOfPage: `${SITE_URL}${guidePath(guide.slug)}`,
    }),
    [guide],
  )

  useSeo({ title: `${guide.title} — QR Studio`, description: guide.description, jsonLd })

  const related = GUIDES.filter((item) => item.slug !== slug)

  return (
    <PageLayout
      title={guide.title}
      lead={guide.lead}
      meta={`Par ${GUIDE_AUTHOR} · ${guide.readingMinutes} min de lecture`}
      updatedAt={formatGuideDate(guide.updatedAt)}
      breadcrumb={[{ to: '/guides', label: 'Guides' }]}
      after={
        <>
          <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-accent-200 bg-accent-50 p-6 sm:flex-row sm:items-center dark:border-accent-500/30 dark:bg-accent-500/10">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-600 text-white">
              <QrCode aria-hidden="true" className="h-5 w-5" />
            </span>
            <p className="flex-1 text-sm text-pretty text-ink">
              Mettez ces conseils en pratique : le générateur vérifie le contraste en temps réel et
              exporte en SVG pour l’impression.
            </p>
            <Link
              to="/"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-accent-600 px-4 text-sm font-semibold text-white transition-colors duration-150 hover:bg-accent-700"
            >
              Créer un QR code
            </Link>
          </div>

          <section aria-labelledby="guides-lies" className="mt-12 border-t border-border pt-8">
            <h2 id="guides-lies" className="text-lg font-semibold text-ink">
              À lire aussi
            </h2>
            <div className="mt-4 grid gap-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  to={guidePath(item.slug)}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-surface p-4 transition-colors duration-150 hover:border-accent-400"
                >
                  <span>
                    <span className="block font-medium text-ink group-hover:text-accent-600">{item.title}</span>
                    <span className="mt-1 block text-sm text-muted">{item.excerpt}</span>
                  </span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-muted" />
                </Link>
              ))}
            </div>
          </section>
        </>
      }
    >
      {children}
    </PageLayout>
  )
}
