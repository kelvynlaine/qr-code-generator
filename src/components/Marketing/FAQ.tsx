import { Fragment, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { FAQ_ITEMS, type FaqItem } from '../../data/faq'
import { AdUnit } from '../Ads/AdUnit'
import { AD_SLOTS } from '../../lib/adsense'

interface FAQProps {
  /** Nombre de questions affichées (la page d'accueil n'en montre qu'un extrait). */
  limit?: number
  /** Insère un bloc in-article toutes les N questions. */
  adEvery?: number
  showAllLink?: boolean
  heading?: string
}

function FAQItem({ item, defaultOpen = false }: { item: FaqItem; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = useId()
  const buttonId = useId()

  return (
    <li className="border-b border-border">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex min-h-16 w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-150 hover:text-accent-600"
        >
          <span className="font-medium text-ink">{item.question}</span>
          <ChevronDown
            aria-hidden="true"
            className={`h-5 w-5 shrink-0 text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </h3>
      {open && (
        <div id={panelId} role="region" aria-labelledby={buttonId} className="space-y-3 pb-5">
          {item.answer.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="text-pretty text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </li>
  )
}

export function FAQ({ limit, adEvery, showAllLink = false, heading = 'Questions fréquentes' }: FAQProps) {
  const items = limit ? FAQ_ITEMS.slice(0, limit) : FAQ_ITEMS

  return (
    <section id="faq" aria-labelledby="faq-title" className="border-t border-border bg-subtle">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 id="faq-title" className="text-center text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl">
          {heading}
        </h2>

        <ul className="mt-10 border-t border-border">
          {items.map((item, index) => (
            <Fragment key={item.question}>
              <FAQItem item={item} />
              {/* Bloc natif inséré dans le flux de lecture, jamais près d'un bouton du générateur. */}
              {adEvery && (index + 1) % adEvery === 0 && index + 1 < items.length && (
                <li>
                  <AdUnit slot={AD_SLOTS.inArticle} format="fluid" minHeight={120} className="my-6" />
                </li>
              )}
            </Fragment>
          ))}
        </ul>

        {showAllLink && (
          <p className="mt-8 text-center">
            <Link
              to="/faq"
              className="inline-flex min-h-11 items-center rounded-lg border border-border bg-surface px-5 font-medium text-ink transition-colors duration-150 hover:border-accent-400 hover:text-accent-600"
            >
              Voir toutes les questions
            </Link>
          </p>
        )}
      </div>
    </section>
  )
}
