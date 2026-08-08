import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'

export function NotFound() {
  useSeo({
    title: 'Page introuvable — QR Studio',
    description: 'Cette page n’existe pas ou plus. Retournez au générateur de QR codes.',
    noIndex: true,
  })

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-semibold text-accent-600 dark:text-accent-300">Erreur 404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl">
        Cette page n’existe pas
      </h1>
      <p className="mt-4 text-pretty text-muted">
        Le lien est peut-être erroné ou la page a été déplacée. Le générateur, lui, est toujours là.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center rounded-lg bg-accent-600 px-5 font-semibold text-white transition-colors duration-150 hover:bg-accent-700"
        >
          Retour au générateur
        </Link>
        <Link
          to="/faq"
          className="inline-flex min-h-11 items-center rounded-lg border border-border bg-surface px-5 font-medium text-ink transition-colors duration-150 hover:border-accent-400"
        >
          Consulter la FAQ
        </Link>
      </div>
    </div>
  )
}
