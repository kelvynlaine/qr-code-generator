import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import { GUIDES, guidePath } from '../data/guides'
import { SITE_URL } from '../lib/adsense'
import { useSeo } from '../hooks/useSeo'
import { AdUnit } from '../components/Ads/AdUnit'
import { AD_SLOTS } from '../lib/adsense'

const ITEM_LIST_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Guides pratiques sur les QR codes',
  itemListElement: GUIDES.map((guide, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${SITE_URL}${guidePath(guide.slug)}`,
    name: guide.title,
  })),
}

export function GuidesIndex() {
  useSeo({
    title: 'Guides pratiques sur les QR codes — QR Studio',
    description:
      'Taille d’impression, QR code statique ou dynamique, personnalisation lisible, sécurité : des guides concrets pour créer des QR codes qui fonctionnent.',
    jsonLd: ITEM_LIST_JSON_LD,
  })

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <nav aria-label="Fil d’Ariane" className="mb-6 flex items-center gap-1 text-sm text-muted">
        <Link to="/" className="transition-colors duration-150 hover:text-accent-600">
          Accueil
        </Link>
        <span aria-hidden="true">›</span>
        <span className="text-ink">Guides</span>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl">
        Guides pratiques sur les QR codes
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-pretty text-muted">
        Créer un QR code prend une minute. Créer un QR code qui sera réellement scanné demande de
        connaître quelques règles : la bonne taille pour le support, un contraste suffisant, une
        destination qui ne disparaîtra pas, et les précautions qui protègent vos clients. Ces guides les
        rassemblent, avec des chiffres concrets.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {GUIDES.map((guide) => (
          <article
            key={guide.slug}
            className="flex flex-col rounded-2xl border border-border bg-surface p-6 transition-shadow duration-200 hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-balance text-ink">
              <Link to={guidePath(guide.slug)} className="transition-colors duration-150 hover:text-accent-600">
                {guide.title}
              </Link>
            </h2>
            <p className="mt-2 flex-1 text-sm text-pretty text-muted">{guide.lead}</p>
            <div className="mt-5 flex items-center justify-between gap-4 text-sm">
              <span className="inline-flex items-center gap-1.5 text-muted">
                <Clock aria-hidden="true" className="h-4 w-4" />
                {guide.readingMinutes} min de lecture
              </span>
              <Link
                to={guidePath(guide.slug)}
                aria-label={`Lire le guide : ${guide.title}`}
                className="inline-flex min-h-11 items-center gap-1.5 font-medium text-accent-600 dark:text-accent-300"
              >
                Lire
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <AdUnit slot={AD_SLOTS.inArticle} format="fluid" layout="in-article" minHeight={120} className="mt-12" />
    </div>
  )
}
