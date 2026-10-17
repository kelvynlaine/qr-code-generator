import { Link } from 'react-router-dom'
import { GuideLayout } from '../../components/Guides/GuideLayout'
import { AdUnit } from '../../components/Ads/AdUnit'
import { AD_SLOTS } from '../../lib/adsense'
import { guidePath } from '../../data/guides'

export function EmailPhoneGuide() {
  return (
    <GuideLayout slug="qr-code-email-telephone">
      <h2 id="principe">Déclencher une action plutôt qu’ouvrir une page</h2>
      <p>
        Un QR code n’est pas obligé de mener vers un site web. Il peut aussi préparer un e-mail ou lancer un
        appel téléphonique. Le téléphone reconnaît alors le type de contenu et propose directement l’action :
        ouvrir la messagerie avec le destinataire déjà rempli, ou composer le numéro. Pour un service
        après-vente, un artisan, une petite annonce ou un formulaire de candidature, c’est souvent plus
        efficace qu’une page de contact à laquelle il faut encore naviguer.
      </p>

      <h2 id="email">Le QR code e-mail</h2>
      <p>
        Le générateur encode un lien au format standard <code>mailto:</code>, le même que celui des liens
        « Envoyer un e-mail » sur le web. Trois champs sont disponibles :
      </p>
      <ul>
        <li>
          <strong>l’adresse du destinataire</strong>, seul champ obligatoire ;
        </li>
        <li>
          <strong>l’objet</strong>, très utile pour trier les messages reçus : « Demande de devis — salon de
          Lyon » vous dira d’où vient le contact ;
        </li>
        <li>
          <strong>le corps du message</strong>, pour amorcer la demande : « Bonjour, je souhaite recevoir la
          brochure. Mon code postal : … ».
        </li>
      </ul>
      <p>
        Par exemple, un code d’inscription à une liste d’attente pourrait contenir :{' '}
        <code>mailto:contact@exemple.fr?subject=Liste%20d%27attente&amp;body=Bonjour%2C%20je%20souhaite%20…</code>.
        Les espaces et caractères accentués sont encodés automatiquement : vous saisissez le texte
        normalement, le générateur s’occupe du reste.
      </p>
      <p>
        Deux limites à connaître. D’abord, l’utilisateur doit avoir une application de messagerie
        configurée sur son téléphone ; c’est le cas de la grande majorité des smartphones, mais pas de tous.
        Ensuite, certaines applications ignorent le corps du message prérempli. Mettez donc l’information
        essentielle dans l’<strong>objet</strong>, qui est presque toujours repris.
      </p>

      <h2 id="telephone">Le QR code téléphone</h2>
      <p>
        L’onglet <strong>Téléphone</strong> encode un lien <code>tel:</code>. Au scan, le téléphone affiche
        le numéro et propose de l’appeler — l’appel n’est jamais lancé sans confirmation de l’utilisateur.
      </p>
      <p>
        Saisissez de préférence le numéro au <strong>format international</strong> : <code>+33 6 12 34 56 78</code>{' '}
        plutôt que <code>06 12 34 56 78</code>. Le format international fonctionne aussi bien pour un appel
        depuis la France que depuis l’étranger, ou depuis un téléphone équipé d’une carte SIM étrangère —
        un détail qui compte sur un support destiné à des touristes. Les espaces sont retirés
        automatiquement à l’encodage.
      </p>

      <AdUnit slot={AD_SLOTS.inArticle} format="fluid" layout="in-article" minHeight={120} className="my-10" />

      <h2 id="usages">Quels usages pour chaque type</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Situation</th>
              <th scope="col">Type conseillé</th>
              <th scope="col">Pourquoi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dépannage, urgence, artisan</td>
              <td>Téléphone</td>
              <td>Le client veut parler à quelqu’un tout de suite</td>
            </tr>
            <tr>
              <td>Demande de devis, candidature</td>
              <td>E-mail avec objet prérempli</td>
              <td>Laisse une trace écrite et permet de joindre des documents</td>
            </tr>
            <tr>
              <td>Panneau « À vendre » ou « À louer »</td>
              <td>Téléphone</td>
              <td>Le passant appelle depuis le trottoir, sans recopier le numéro</td>
            </tr>
            <tr>
              <td>Retour produit, SAV</td>
              <td>E-mail avec objet incluant la référence</td>
              <td>Le message arrive déjà classé</td>
            </tr>
            <tr>
              <td>Carte de visite</td>
              <td>vCard ou lien</td>
              <td>
                Permet d’enregistrer toutes les coordonnées d’un coup — voir le{' '}
                <Link to={guidePath('qr-code-carte-de-visite')}>guide carte de visite</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="confidentialite">Attention aux coordonnées personnelles</h2>
      <p>
        Un QR code imprimé est lisible par n’importe qui, et son contenu ne peut plus être modifié. Pour un
        affichage public, préférez une adresse e-mail et un numéro dédiés à l’activité plutôt que vos
        coordonnées personnelles : vous pourrez les rediriger ou les fermer si elles attirent du démarchage.
        Le guide <Link to={guidePath('qr-code-statique-ou-dynamique')}>QR code statique ou dynamique</Link>{' '}
        explique pourquoi un code statique ne peut pas être modifié après impression.
      </p>

      <h2 id="lisibilite">Toujours afficher l’information en clair</h2>
      <p>
        Sous un QR code e-mail ou téléphone, écrivez aussi l’adresse ou le numéro en toutes lettres, grâce à
        la section « Texte personnalisé » du <Link to="/">générateur</Link>. Une partie de votre public
        préférera recopier, n’aura pas de lecteur de QR code à portée de main, ou voudra simplement savoir
        ce qu’il s’apprête à composer avant de scanner. C’est aussi une question de confiance : un code dont
        la destination est annoncée inspire davantage que du mystère (voir le guide{' '}
        <Link to={guidePath('securite-qr-code-quishing')}>QR codes et sécurité</Link>).
      </p>

      <h2 id="check-list">Check-list</h2>
      <ul>
        <li>l’adresse ou le numéro a été vérifié caractère par caractère ;</li>
        <li>le numéro est au format international ;</li>
        <li>l’objet de l’e-mail contient l’information essentielle ;</li>
        <li>les coordonnées encodées sont professionnelles, pas personnelles ;</li>
        <li>l’information est aussi écrite en clair sous le code ;</li>
        <li>le scan a été testé et ouvre bien la messagerie ou le composeur.</li>
      </ul>
    </GuideLayout>
  )
}
