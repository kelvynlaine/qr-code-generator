import { Link } from 'react-router-dom'
import { PageLayout } from '../components/Layout/PageLayout'
import { useSeo } from '../hooks/useSeo'

export function Terms() {
  useSeo({
    title: 'Conditions générales d’utilisation — QR Studio',
    description:
      'Conditions d’utilisation du générateur de QR codes QR Studio : usage autorisé, usage commercial, responsabilité, publicité et évolution du service.',
  })

  return (
    <PageLayout
      title="Conditions générales d’utilisation"
      lead="En utilisant QR Studio, vous acceptez les conditions ci-dessous. Elles sont volontairement courtes et lisibles."
      updatedAt="9 août 2026"
    >
      <h2 id="objet">1. Objet</h2>
      <p>
        Les présentes conditions régissent l’accès et l’utilisation du site QR Studio, service en
        ligne gratuit permettant de générer, personnaliser et télécharger des QR codes. L’utilisation
        du site vaut acceptation pleine et entière de ces conditions.
      </p>

      <h2 id="acces">2. Accès au service</h2>
      <p>
        Le service est accessible gratuitement, sans création de compte et sans limite de nombre de
        générations. Il fonctionne intégralement dans votre navigateur : aucun contenu saisi n’est
        transmis à un serveur, comme détaillé dans la{' '}
        <Link to="/politique-de-confidentialite">politique de confidentialité</Link>.
      </p>
      <p>
        L’éditeur peut faire évoluer, suspendre ou interrompre tout ou partie du service, notamment
        pour maintenance, sans préavis ni indemnité. Le service étant gratuit, aucune garantie de
        disponibilité n’est due.
      </p>

      <h2 id="usage">3. Usage autorisé</h2>
      <p>
        Les QR codes que vous générez vous appartiennent. Vous pouvez les utiliser librement, y
        compris à des fins commerciales : cartes de visite, packaging, affichage, publicité,
        supports imprimés ou numériques. Aucune redevance, aucune attribution et aucune licence
        supplémentaire ne sont exigées.
      </p>
      <p>Vous vous engagez en revanche à ne pas utiliser le service pour :</p>
      <ul>
        <li>
          diffuser des liens vers des contenus illicites, frauduleux, trompeurs, ou portant atteinte
          aux droits de tiers ;
        </li>
        <li>
          conduire des campagnes d’hameçonnage (<em>phishing</em>), diffuser des logiciels
          malveillants ou usurper l’identité d’un tiers ;
        </li>
        <li>
          détourner ou recouvrir le QR code d’un tiers dans le but de rediriger ses utilisateurs à
          son insu ;
        </li>
        <li>
          importer un logo ou un visuel sur lequel vous ne détenez pas les droits nécessaires ;
        </li>
        <li>
          tenter de perturber le fonctionnement du site, d’en contourner les protections ou d’en
          automatiser massivement l’usage.
        </li>
      </ul>
      <p>
        Vous êtes seul responsable du contenu que vous encodez et de l’usage que vous faites des
        fichiers générés.
      </p>

      <h2 id="garantie">4. Absence de garantie et responsabilité</h2>
      <p>
        Le service est fourni « en l’état ». L’éditeur ne garantit pas que les QR codes générés seront
        lisibles par l’intégralité des lecteurs du marché, en particulier lorsque vous choisissez des
        couleurs à faible contraste, un logo volumineux ou des formes de modules très arrondies. Un
        indicateur de lisibilité vous alerte en temps réel, mais il ne remplace pas un test réel :{' '}
        <strong>
          testez systématiquement le fichier exporté avec au moins deux appareils avant une
          impression en série
        </strong>
        . La responsabilité de l’éditeur ne peut être engagée pour un préjudice résultant d’un QR code
        non testé, d’une erreur de saisie, ou de l’indisponibilité du service.
      </p>

      <h2 id="publicite">5. Publicité</h2>
      <p>
        Le service est financé par la publicité affichée via Google AdSense. Les emplacements
        publicitaires sont conçus pour ne jamais gêner l’utilisation du générateur ni provoquer de
        clic accidentel. Aucune publicité n’est affichée avant votre consentement, et le refus des
        cookies publicitaires ne restreint en rien l’accès au service.
      </p>

      <h2 id="donnees">6. Données personnelles</h2>
      <p>
        Le traitement des données est décrit dans la{' '}
        <Link to="/politique-de-confidentialite">politique de confidentialité</Link>, qui fait partie
        intégrante des présentes conditions.
      </p>

      <h2 id="modification">7. Modification des conditions</h2>
      <p>
        Ces conditions peuvent être modifiées à tout moment. La version applicable est celle publiée
        sur cette page à la date de votre utilisation du service ; la date de dernière mise à jour
        figure en haut de page.
      </p>

      <h2 id="droit">8. Droit applicable</h2>
      <p>
        Les présentes conditions sont soumises au droit français. À défaut de résolution amiable, tout
        litige relève de la compétence des tribunaux français. Conformément au code de la
        consommation, un consommateur peut recourir gratuitement à un médiateur de la consommation en
        vue de la résolution amiable d’un litige.
      </p>
    </PageLayout>
  )
}
