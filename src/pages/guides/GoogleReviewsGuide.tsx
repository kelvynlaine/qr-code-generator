import { Link } from 'react-router-dom'
import { GuideLayout } from '../../components/Guides/GuideLayout'
import { AdUnit } from '../../components/Ads/AdUnit'
import { AD_SLOTS } from '../../lib/adsense'
import { guidePath } from '../../data/guides'

export function GoogleReviewsGuide() {
  return (
    <GuideLayout slug="qr-code-avis-google">
      <h2 id="pourquoi">Pourquoi un QR code change la donne pour les avis</h2>
      <p>
        Un client satisfait a rarement l’idée de laisser un avis, et encore moins l’envie de chercher
        votre fiche dans Google Maps, de trouver le bon onglet puis le bouton « Écrire un avis ». Chaque
        étape supplémentaire fait perdre une partie des bonnes volontés. Le QR code supprime ces étapes :
        un scan, et le formulaire de notation s’ouvre directement, étoiles comprises.
      </p>
      <p>
        L’enjeu dépasse la simple vanité. Le nombre d’avis, leur note moyenne et leur fraîcheur pèsent
        dans la visibilité locale d’un commerce sur Google, et dans la décision des clients qui comparent
        deux adresses voisines. Un établissement qui collecte régulièrement des avis récents inspire plus
        confiance qu’un concurrent dont le dernier commentaire date de trois ans.
      </p>

      <h2 id="lien">Récupérer le bon lien d’avis</h2>
      <p>
        Tout repose sur l’adresse encodée. Il ne faut pas utiliser le lien de votre fiche Google Maps,
        qui oblige le client à chercher le bouton d’avis, mais le <strong>lien direct vers le formulaire</strong>,
        que Google fournit à chaque propriétaire de fiche :
      </p>
      <ol>
        <li>
          connectez-vous au compte Google qui gère votre <strong>fiche d’établissement</strong> (ex-Google
          My Business) ;
        </li>
        <li>
          recherchez le nom de votre commerce sur Google ou ouvrez Google Maps : le panneau de gestion de
          la fiche s’affiche ;
        </li>
        <li>
          cliquez sur <strong>« Demander des avis »</strong> (parfois intitulé « Recueillir plus d’avis ») ;
        </li>
        <li>
          copiez le lien proposé. Il prend généralement la forme <code>https://g.page/r/…/review</code>.
        </li>
      </ol>
      <p>
        Avant d’aller plus loin, collez ce lien dans un navigateur privé, ou envoyez-le sur votre propre
        téléphone : il doit ouvrir directement la fenêtre de notation de votre établissement. Si c’est le
        cas, il est prêt à être encodé.
      </p>

      <h2 id="creer">Créer le QR code</h2>
      <p>
        Dans le <Link to="/">générateur</Link>, laissez l’onglet <strong>Lien</strong> sélectionné et
        collez l’adresse. Le lien d’avis est court, ce qui donne un code peu dense et facile à scanner,
        même en petit format. Quelques réglages font ensuite la différence :
      </p>
      <ul>
        <li>
          <strong>Ajoutez un appel à l’action</strong> sous le code avec la section « Texte personnalisé » :
          « Votre avis compte — 30 secondes » fonctionne bien mieux qu’un code muet ;
        </li>
        <li>
          <strong>reprenez vos couleurs</strong>, en gardant des modules foncés sur fond clair. Le guide{' '}
          <Link to={guidePath('personnaliser-qr-code-sans-perdre-la-lecture')}>personnaliser un QR code sans
          nuire à sa lecture</Link> détaille les limites à respecter ;
        </li>
        <li>
          <strong>exportez en SVG</strong> si le code part chez un imprimeur, en PNG pour un affichage
          écran ou une impression bureautique.
        </li>
      </ul>

      <AdUnit slot={AD_SLOTS.inArticle} format="fluid" layout="in-article" minHeight={120} className="my-10" />

      <h2 id="emplacements">Où le placer pour qu’il soit scanné</h2>
      <p>
        Le bon emplacement est celui où le client a à la fois <strong>un moment libre</strong> et
        <strong> une expérience encore fraîche</strong>. Quelques exemples éprouvés selon les métiers :
      </p>
      <ul>
        <li>
          <strong>restaurant, café</strong> : sur la note ou le porte-addition, au moment où le repas vient
          de se terminer ;
        </li>
        <li>
          <strong>commerce</strong> : sur un chevalet près de la caisse, ou imprimé sur le ticket ;
        </li>
        <li>
          <strong>artisan, prestataire à domicile</strong> : sur la facture ou la carte laissée en fin
          d’intervention ;
        </li>
        <li>
          <strong>hébergement</strong> : dans le livret d’accueil ou sur un carton au moment du départ ;
        </li>
        <li>
          <strong>vente en ligne</strong> : sur une carte glissée dans le colis.
        </li>
      </ul>
      <p>
        Pour un chevalet de comptoir, un code d’environ 4 à 5 cm de côté suffit ; sur un ticket de caisse,
        visez au moins 2,5 cm. Le guide{' '}
        <Link to={guidePath('taille-qr-code-impression')}>quelle taille pour un QR code imprimé</Link> donne
        la méthode de calcul complète.
      </p>

      <h2 id="regles">Les règles à ne pas enfreindre</h2>
      <p>
        Google encadre strictement la collecte d’avis, et le droit français sanctionne les avis trompeurs.
        Trois pratiques sont à proscrire, même si elles semblent anodines :
      </p>
      <ul>
        <li>
          <strong>Récompenser un avis</strong> (remise, boisson offerte, participation à un tirage au sort) :
          le règlement de Google interdit les avis obtenus contre une contrepartie, et la fiche peut être
          pénalisée ;
        </li>
        <li>
          <strong>Filtrer les clients</strong> en ne présentant le QR code qu’à ceux qui semblent ravis, ou en
          redirigeant les mécontents vers un formulaire privé : Google qualifie cette pratique de « review
          gating » et la refuse ;
        </li>
        <li>
          <strong>Rédiger ou faire rédiger de faux avis</strong> : c’est une pratique commerciale trompeuse
          au sens du Code de la consommation.
        </li>
      </ul>
      <p>
        Demander un avis à tous les clients, sans condition et sans cadeau, est en revanche parfaitement
        autorisé — c’est exactement ce que permet un QR code affiché au comptoir.
      </p>

      <h2 id="repondre">Après le scan : répondre aux avis</h2>
      <p>
        Un QR code augmente le volume d’avis, y compris les avis mitigés. Répondre à chacun, poliment et
        rapidement, montre aux futurs clients que l’établissement est tenu. Une réponse factuelle à une
        critique pèse souvent plus lourd, pour un lecteur, que dix avis cinq étoiles sans commentaire.
      </p>

      <h2 id="check-list">Check-list</h2>
      <ul>
        <li>le lien testé ouvre directement le formulaire d’avis de la bonne fiche ;</li>
        <li>un appel à l’action court accompagne le code ;</li>
        <li>le code est placé là où le client a une minute devant lui ;</li>
        <li>aucune contrepartie n’est promise en échange de l’avis ;</li>
        <li>le code imprimé a été scanné sur un iPhone et sur un Android avant le tirage.</li>
      </ul>
    </GuideLayout>
  )
}
