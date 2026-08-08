import { ArrowRight, Building2, CalendarDays, Package, Share2, Store, Wifi } from 'lucide-react'
import { Link } from 'react-router-dom'

const CASES = [
  {
    icon: Store,
    title: 'Restaurants et commerces',
    text: 'Menu en ligne, carte des vins, avis Google ou programme de fidélité : un QR code sur la table remplace le papier et se met à jour sans réimprimer.',
  },
  {
    icon: Building2,
    title: 'Cartes de visite et signatures',
    text: 'Un QR code aux couleurs de votre marque sur une carte de visite renvoie vers votre site, votre prise de rendez-vous ou vos coordonnées.',
  },
  {
    icon: CalendarDays,
    title: 'Événements et billetterie',
    text: 'Affiches, flyers, kakémonos : les participants accèdent au programme, au plan d’accès ou à la billetterie en un scan.',
  },
  {
    icon: Share2,
    title: 'Réseaux sociaux',
    text: 'Transformez une vitrine, un packaging ou une vidéo en point d’entrée vers votre compte Instagram, TikTok ou LinkedIn.',
  },
  {
    icon: Package,
    title: 'Packaging et étiquettes',
    text: 'Notice, tutoriel vidéo, origine du produit, garantie : vous ajoutez de l’information sans surcharger l’emballage.',
  },
  {
    icon: Wifi,
    title: 'Accès Wi-Fi invité',
    text: 'Vos visiteurs se connectent en scannant, sans dicter un mot de passe de trente caractères.',
  },
]

export function UseCases() {
  return (
    <section id="cas-usage" aria-labelledby="usecases-title">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="usecases-title" className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl">
            À quoi sert un QR code personnalisé&nbsp;?
          </h2>
          <p className="mt-4 text-lg text-pretty text-muted">
            Un QR code noir et blanc fonctionne. Un QR code à vos couleurs, avec votre logo et un
            appel à l’action lisible, est nettement plus scanné — parce qu’il inspire confiance et
            qu’on comprend immédiatement ce qu’il y a derrière.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CASES.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-600 dark:bg-accent-500/15 dark:text-accent-300">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm text-pretty text-muted">{text}</p>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center">
          <Link
            to="/cas-usage"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border bg-surface px-5 font-medium text-ink transition-colors duration-150 hover:border-accent-400 hover:text-accent-600"
          >
            Voir les cas d’usage en détail
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </p>
      </div>
    </section>
  )
}
