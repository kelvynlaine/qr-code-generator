import { ArrowRight, Download, MousePointerClick, Palette, ScanLine } from 'lucide-react'
import { Link } from 'react-router-dom'

const STEPS = [
  {
    icon: MousePointerClick,
    title: 'Choisissez votre contenu',
    text: 'Un lien, un texte, une adresse e-mail, un numéro de téléphone ou un accès Wi-Fi.',
  },
  {
    icon: Palette,
    title: 'Personnalisez le design',
    text: 'Couleurs, dégradés, formes des modules et des yeux, logo central, cadre et texte.',
  },
  {
    icon: ScanLine,
    title: 'Vérifiez la lisibilité',
    text: 'L’aperçu se met à jour en direct et vous alerte si le contraste rend le scan risqué.',
  },
  {
    icon: Download,
    title: 'Téléchargez',
    text: 'PNG, JPG ou SVG vectoriel, jusqu’en 4096 px pour l’impression grand format.',
  },
]

export function HowItWorks() {
  return (
    <section id="comment-ca-marche" aria-labelledby="how-title" className="border-t border-border bg-subtle">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="how-title" className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl">
            Comment ça marche
          </h2>
          <p className="mt-4 text-lg text-pretty text-muted">
            Quatre étapes, aucune inscription, moins d’une minute.
          </p>
        </div>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, title, text }, index) => (
            <li
              key={title}
              className="relative rounded-2xl border border-border bg-surface p-6 transition-shadow duration-200 hover:shadow-md"
            >
              <span className="absolute top-6 right-6 text-4xl font-bold text-accent-100 dark:text-accent-500/20">
                {index + 1}
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-600 text-white">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm text-pretty text-muted">{text}</p>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-center">
          <Link
            to="/comment-ca-marche"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-surface px-5 font-medium text-ink transition-colors duration-150 hover:border-accent-400 hover:text-accent-600"
          >
            Lire le guide détaillé
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </p>
      </div>
    </section>
  )
}
