import { Download, ShieldCheck, Sparkles, Zap } from 'lucide-react'

const BADGES = [
  { icon: Zap, label: 'Aperçu en temps réel' },
  { icon: Download, label: 'PNG, JPG et SVG' },
  { icon: ShieldCheck, label: '100 % dans votre navigateur' },
]

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-7xl px-4 pt-12 pb-10 text-center sm:px-6 sm:pt-16">
      <p className="inline-flex items-center gap-2 rounded-full border border-accent-200 bg-accent-50 px-3 py-1 text-sm font-medium text-accent-700 dark:border-accent-500/30 dark:bg-accent-500/10 dark:text-accent-300">
        <Sparkles aria-hidden="true" className="h-4 w-4" />
        Gratuit, sans inscription, sans limite
      </p>

      <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-bold tracking-tight text-balance text-ink sm:text-5xl lg:text-6xl">
        Créez un QR code{' '}
        <span className="bg-gradient-to-r from-accent-600 to-purple-600 bg-clip-text text-transparent">
          à votre image
        </span>
      </h1>

      <p className="mx-auto mt-5 max-w-2xl text-lg text-pretty text-muted">
        Couleurs, dégradés, formes, logo et texte personnalisé : composez votre QR code, voyez le
        résultat instantanément, puis téléchargez-le en haute définition.
      </p>

      <ul className="mt-7 flex flex-wrap items-center justify-center gap-2">
        {BADGES.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-muted"
          >
            <Icon aria-hidden="true" className="h-4 w-4 text-accent-600 dark:text-accent-300" />
            {label}
          </li>
        ))}
      </ul>
    </section>
  )
}
