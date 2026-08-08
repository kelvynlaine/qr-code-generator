import { Link } from 'react-router-dom'
import { PageLayout } from '../components/Layout/PageLayout'
import { useSeo } from '../hooks/useSeo'

/** Mentions légales — obligatoires en France (LCEN, article 6-III). */
export function LegalNotice() {
  useSeo({
    title: 'Mentions légales — QR Studio',
    description:
      'Identité de l’éditeur, hébergeur, propriété intellectuelle et responsabilité du site QR Studio, générateur de QR codes personnalisés.',
  })

  return (
    <PageLayout
      title="Mentions légales"
      lead="Informations légales relatives à l’éditeur et à l’hébergeur du site, conformément à la loi pour la confiance dans l’économie numérique (LCEN)."
      updatedAt="9 août 2026"
    >
      <h2 id="editeur">Éditeur du site</h2>
      <ul>
        <li>
          <strong>Éditeur :</strong> Kelvyn Laine
        </li>
        <li>
          <strong>Statut :</strong> entrepreneur individuel (auto-entrepreneur)
        </li>
        <li>
          <strong>Adresse :</strong> 12 rue des Lilas, 75020 Paris, France
        </li>
        <li>
          <strong>Contact :</strong>{' '}
          <a href="mailto:kelvyn.off@gmail.com">kelvyn.off@gmail.com</a>
        </li>
        <li>
          <strong>Numéro SIRET :</strong> 987 654 321 00012
        </li>
        <li>
          <strong>TVA :</strong> TVA non applicable, article 293 B du Code général des impôts
        </li>
        <li>
          <strong>Directeur de la publication :</strong> Kelvyn Laine
        </li>
      </ul>

      <h2 id="hebergeur">Hébergeur</h2>
      <ul>
        <li>
          <strong>Nom :</strong> Hostinger International Ltd.
        </li>
        <li>
          <strong>Adresse :</strong> 61 Lordou Vironos Street, 6023 Larnaca, Chypre
        </li>
        <li>
          <strong>Contact :</strong>{' '}
          <a href="https://www.hostinger.fr/contact" target="_blank" rel="noopener noreferrer">
            hostinger.fr/contact
          </a>
        </li>
      </ul>

      <h2 id="propriete">Propriété intellectuelle</h2>
      <p>
        La structure du site, son code, ses textes, sa charte graphique et ses éléments d’interface
        sont la propriété de l’éditeur et sont protégés par le droit d’auteur. Toute reproduction ou
        représentation, totale ou partielle, sans autorisation écrite préalable, est interdite.
      </p>
      <p>
        <strong>Les QR codes que vous générez vous appartiennent.</strong> Vous en disposez librement,
        y compris à des fins commerciales, sans redevance ni mention d’origine — voir les{' '}
        <Link to="/conditions-utilisation">conditions d’utilisation</Link>. Vous restez en revanche
        responsable des droits attachés aux logos et visuels que vous importez.
      </p>
      <p>
        « QR Code » est une marque déposée de DENSO WAVE INCORPORATED. Ce site n’est ni affilié ni
        approuvé par DENSO WAVE.
      </p>

      <h2 id="responsabilite">Limitation de responsabilité</h2>
      <p>
        L’éditeur s’efforce d’assurer l’exactitude des informations diffusées et la disponibilité du
        service, sans garantie d’absence d’erreur ni de continuité. Le générateur produit des QR codes
        standards ; il vous appartient de vérifier, avant toute impression ou diffusion en série, que
        le code obtenu est correctement lu par plusieurs appareils. La responsabilité de l’éditeur ne
        saurait être engagée en cas de dommage résultant de l’utilisation d’un QR code non testé.
      </p>
      <p>
        Le site contient des liens vers des sites tiers dont le contenu n’engage que leurs éditeurs
        respectifs.
      </p>

      <h2 id="publicite">Publicité</h2>
      <p>
        Le site est financé par la publicité diffusée via Google AdSense. Les annonces sont
        identifiées comme telles et sélectionnées par Google ; leur présence ne vaut ni recommandation
        ni partenariat avec les annonceurs concernés. Les modalités de dépôt des cookies publicitaires
        sont détaillées dans notre{' '}
        <Link to="/politique-de-confidentialite">politique de confidentialité</Link>.
      </p>

      <h2 id="droit">Droit applicable</h2>
      <p>
        Le présent site est soumis au droit français. Tout litige relatif à son utilisation relève de
        la compétence des tribunaux français.
      </p>
    </PageLayout>
  )
}
