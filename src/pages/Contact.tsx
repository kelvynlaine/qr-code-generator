import { Link } from 'react-router-dom'
import { Mail, MessageSquare, ShieldCheck } from 'lucide-react'
import { PageLayout } from '../components/Layout/PageLayout'
import { useSeo } from '../hooks/useSeo'

/**
 * Page « À propos / Contact ».
 *
 * AdSense refuse les sites sans identité claire : cette page explique qui édite
 * l'outil, pourquoi, et comment le joindre. Le formulaire est volontairement
 * remplacé par un contact e-mail direct — sans backend, un formulaire ne pourrait
 * rien envoyer, et un faux formulaire est pire que pas de formulaire.
 */
export function Contact() {
  useSeo({
    title: 'À propos et contact — QR Studio',
    description:
      'Qui édite QR Studio, pourquoi ce générateur de QR codes est gratuit, et comment nous contacter pour une question, un bug ou une demande RGPD.',
  })

  return (
    <PageLayout
      title="À propos et contact"
      lead="QR Studio est un outil indépendant, gratuit et sans inscription, pensé pour créer des QR codes réellement utilisables — pas pour collecter des adresses e-mail."
    >
      <h2 id="projet">Le projet</h2>
      <p>
        La plupart des générateurs de QR codes gratuits ont le même défaut : ils sont gratuits en
        apparence. Le QR code produit passe par un lien de redirection appartenant au service, ce qui
        permet d’en couper l’accès plus tard, ou impose un compte payant pour retirer un filigrane.
        Quand le code est déjà imprimé sur dix mille flyers, la note arrive au pire moment.
      </p>
      <p>
        QR Studio prend le problème par l’autre bout. Les QR codes générés ici sont{' '}
        <strong>statiques</strong> : votre lien est encodé directement dans l’image, sans
        intermédiaire. Personne — pas même nous — ne peut les désactiver, les rediriger ou les faire
        expirer. En contrepartie, changer la destination impose de générer un nouveau code : c’est le
        prix de l’indépendance, et il est assumé.
      </p>
      <p>
        Le second parti pris est technique : tout s’exécute dans votre navigateur. Le contenu que vous
        encodez, le logo que vous importez et vos réglages ne transitent par aucun serveur. Ce n’est
        pas un argument marketing, c’est une conséquence de l’architecture — il n’y a pas de backend
        auquel envoyer quoi que ce soit.
      </p>

      <h2 id="modele">Comment le service est financé</h2>
      <p>
        Le site est financé par la publicité (Google AdSense), affichée uniquement avec votre accord.
        Nous avons volontairement écarté les emplacements les plus rémunérateurs mais les plus
        agressifs : pas d’interstitiel avant le téléchargement, pas de publicité collée aux boutons du
        générateur, pas de compte à créer pour exporter en haute définition. Un visiteur qui n’arrive
        pas à faire son QR code ne revient pas — et un site sans visiteurs ne rapporte rien.
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
