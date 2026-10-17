import { Link } from 'react-router-dom'
import { Mail, MessageSquare, ShieldCheck } from 'lucide-react'
import { PageLayout } from '../components/Layout/PageLayout'
import { useSeo } from '../hooks/useSeo'

/**
 * Page Contact.
 *
 * AdSense refuse les sites sans identité claire : cette page explique qui édite
 * l'outil, pourquoi, et comment le joindre. Le formulaire est volontairement
 * remplacé par un contact e-mail direct — sans backend, un formulaire ne pourrait
 * rien envoyer, et un faux formulaire est pire que pas de formulaire.
 */
export function Contact() {
  useSeo({
    title: 'Contact — CodeQRGen',
    description:
      'Contacter l’éditeur de CodeQRGen pour une question, un bug, une suggestion ou une demande relative à vos données personnelles.',
  })

  return (
    <PageLayout
      title="Contact"
      lead="Une question, un bug, une suggestion ou une demande RGPD : voici comment me joindre."
    >
      <p>
        Pour savoir qui édite le site et comment il fonctionne, consultez la page{' '}
        <Link to="/a-propos">À propos</Link>.
      </p>

      <h2 id="contact">Nous écrire</h2>
      <p>
        Une question, un bug, une suggestion de fonctionnalité, une demande relative à vos données
        personnelles ? Une seule adresse, relevée régulièrement :
      </p>
      <p>
        <a
          href="mailto:kelvyn.off@gmail.com"
          className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-accent-600 px-4 py-2.5 font-semibold text-white no-underline transition-colors duration-150 hover:bg-accent-700"
        >
          <Mail aria-hidden="true" className="h-4 w-4" />
          kelvyn.off@gmail.com
        </a>
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          {
            icon: MessageSquare,
            title: 'Support et bugs',
            text: 'Précisez votre navigateur et, si possible, les réglages utilisés : c’est souvent suffisant pour reproduire le problème.',
          },
          {
            icon: ShieldCheck,
            title: 'Demandes RGPD',
            text: 'Accès, suppression, opposition : réponse sous un mois maximum.',
          },
          {
            icon: Mail,
            title: 'Partenariats',
            text: 'Propositions publicitaires ou éditoriales, à la même adresse.',
          },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-xl border border-border bg-surface p-4">
            <Icon aria-hidden="true" className="h-5 w-5 text-accent-600 dark:text-accent-300" />
            <h3 className="mt-2 text-sm font-semibold text-ink">{title}</h3>
            <p className="mt-1 text-sm text-muted">{text}</p>
          </div>
        ))}
      </div>

      <h2 id="legal">Informations légales</h2>
      <p>
        L’identité complète de l’éditeur et de l’hébergeur figure sur la page{' '}
        <Link to="/mentions-legales">Mentions légales</Link>. Les règles d’usage du service sont
        détaillées dans les <Link to="/conditions-utilisation">conditions d’utilisation</Link>, et le
        traitement des données dans la{' '}
        <Link to="/politique-de-confidentialite">politique de confidentialité</Link>.
      </p>
    </PageLayout>
  )
}
