import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { GUIDES, guidePath } from '../../data/guides'

/** Aperçu des guides sur la page d'accueil : maillage interne vers le contenu éditorial. */
export function GuidesTeaser() {
  return (
    <section aria-labelledby="guides-title" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="guides-title" className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl">
            Guides pratiques
          </h2>
          <p className="mt-4 text-lg text-pretty text-muted">
            Taille d’impression, contraste, sécurité : les règles à connaître pour que votre QR code
            soit vraiment scanné.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {GUIDES.map((guide) => (
            <Link
              key={guide.slug}
              to={guidePath(guide.slug)}
              className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="font-semibold text-ink group-hover:text-accent-600">{guide.title}</span>
              <span className="mt-2 flex-1 text-sm text-pretty text-muted">{guide.excerpt}</span>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-600 dark:text-accent-300">
                Lire le guide
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
