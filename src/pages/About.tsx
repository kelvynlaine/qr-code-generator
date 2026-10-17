import { Link } from 'react-router-dom'
import { PageLayout } from '../components/Layout/PageLayout'
import { useSeo } from '../hooks/useSeo'
import { GUIDE_AUTHOR, GUIDES, guidePath } from '../data/guides'
import { SITE_URL } from '../lib/adsense'

/** Page « À propos » : qui édite le site, pourquoi, comment il est financé et comment les guides sont écrits. */
export function About() {
  useSeo({
    title: 'À propos de CodeQRGen — qui sommes-nous ?',
    description:
      'CodeQRGen est un générateur de QR codes indépendant, édité par Kelvyn Laine : l’histoire du projet, ses principes, son financement et la méthode de rédaction des guides.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'À propos de CodeQRGen',
      url: `${SITE_URL}/a-propos`,
      inLanguage: 'fr-FR',
      mainEntity: {
        '@type': 'Organization',
        name: 'CodeQRGen',
        url: SITE_URL,
        founder: { '@type': 'Person', name: GUIDE_AUTHOR },
        email: 'kelvyn.off@gmail.com',
      },
    },
  })

  return (
    <PageLayout
      title="À propos de CodeQRGen"
      lead="Un générateur de QR codes indépendant, gratuit et sans inscription, conçu et maintenu par une seule personne — avec un objectif simple : que le code imprimé fonctionne encore dans cinq ans."
    >
      <h2 id="qui">Qui est derrière le site</h2>
      <p>
        CodeQRGen est édité par <strong>{GUIDE_AUTHOR}</strong>, développeur web indépendant basé en
        France. Je conçois, développe et rédige seul l’ensemble du site : le générateur, les guides et
        les pages d’aide. Il n’y a ni agence, ni équipe marketing, ni rédacteurs anonymes derrière
        CodeQRGen — chaque page est signée et je réponds moi-même aux messages.
      </p>
      <p>
        Le projet part d’un constat : beaucoup de générateurs « gratuits » imposent un compte, un
        filigrane, ou encodent un lien de redirection qui leur appartient. Le jour où l’essai gratuit
        se termine, le code déjà imprimé sur des flyers ou des cartes cesse de fonctionner tant qu’un
        abonnement n’est pas souscrit. CodeQRGen a été conçu pour faire l’inverse.
      </p>

      <h2 id="principes">Les principes du générateur</h2>
      <ul>
        <li>
          <strong>Des QR codes statiques, qui n’expirent jamais.</strong> Votre lien, votre texte ou
          votre accès Wi-Fi est encodé directement dans l’image, sans intermédiaire. Personne — pas même
          moi — ne peut le désactiver ou le rediriger. Les avantages et limites de ce choix sont
          détaillés dans le guide{' '}
          <Link to={guidePath('qr-code-statique-ou-dynamique')}>QR code statique ou dynamique</Link>.
        </li>
        <li>
          <strong>Tout se passe dans votre navigateur.</strong> Le contenu encodé, le logo importé et vos
          réglages ne sont envoyés à aucun serveur : le site n’a pas de base de données ni de backend.
        </li>
        <li>
          <strong>Aucune fonction bridée.</strong> Export PNG, JPG et SVG jusqu’à 4096 px, logo, dégradés,
          cadre et texte : tout est accessible sans compte ni paiement.
        </li>
        <li>
          <strong>La lisibilité avant l’esthétique.</strong> Le générateur mesure le contraste en temps
          réel et vous prévient lorsqu’une personnalisation rend le scan risqué.
        </li>
      </ul>

      <h2 id="guides">Comment les guides sont rédigés</h2>
      <p>
        Les {GUIDES.length} guides du site répondent aux questions que l’on se pose réellement au moment
        d’imprimer un QR code : quelle taille, quelles couleurs, que mettre dedans, comment éviter les
        arnaques. Chaque article suit la même méthode :
      </p>
      <ol>
        <li>
          partir des sources techniques de référence — la norme ISO/IEC 18004 qui définit le QR code, la
          documentation des systèmes iOS et Android, les recommandations de la CNIL et de
          cybermalveillance.gouv.fr pour les sujets de sécurité ;
        </li>
        <li>
          vérifier les conseils avec le générateur lui-même et des téléphones réels avant publication ;
        </li>
        <li>
          dater chaque article et le mettre à jour lorsqu’un système ou une pratique évolue — la date de
          dernière mise à jour figure en tête de chaque guide.
        </li>
      </ol>
      <p>
        Vous avez repéré une erreur ou une information dépassée ? Écrivez-moi depuis la page{' '}
        <Link to="/contact">contact</Link> : les corrections sont publiées rapidement, et je préfère
        mille fois un signalement à un conseil faux qui circule.
      </p>

      <h2 id="financement">Comment le site est financé</h2>
      <p>
        CodeQRGen est gratuit et le restera. Les frais d’hébergement et de nom de domaine, ainsi que le
        temps passé à écrire les guides, sont couverts par la publicité Google AdSense, affichée
        uniquement avec votre consentement (vous pouvez modifier votre choix à tout moment depuis le
        lien « Gérer les cookies » en bas de page).
      </p>
      <p>
        Je me suis fixé quelques règles : pas d’interstitiel avant le téléchargement, pas de publicité
        collée aux boutons du générateur, pas de contenu sponsorisé déguisé en guide. Aucun article n’est
        rémunéré par une marque.
      </p>

      <h2 id="suite">Et la suite ?</h2>
      <p>
        De nouveaux guides sont publiés régulièrement, et le générateur évolue selon vos retours. Pour
        commencer, le plus simple est de <Link to="/">créer votre QR code</Link> ou de parcourir{' '}
        <Link to="/guides">tous les guides</Link>. Les informations légales complètes figurent dans les{' '}
        <Link to="/mentions-legales">mentions légales</Link>.
      </p>
    </PageLayout>
  )
}
