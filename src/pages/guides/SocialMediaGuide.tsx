import { Link } from 'react-router-dom'
import { GuideLayout } from '../../components/Guides/GuideLayout'
import { AdUnit } from '../../components/Ads/AdUnit'
import { AD_SLOTS } from '../../lib/adsense'

export function SocialMediaGuide() {
  return (
    <GuideLayout slug="qr-code-reseaux-sociaux">
      <h2 id="pourquoi">Pourquoi un QR code plutôt qu’un nom de compte</h2>
      <p>
        Écrire « @lumen.ceramique » sur une affiche semble suffire. En pratique, chaque étape entre la
        lecture et l’abonnement fait perdre des visiteurs : ouvrir l’application, toucher la loupe, taper le
        nom sans oublier le point, choisir le bon compte parmi les homonymes. Un QR code supprime toutes ces
        étapes. La personne pointe son téléphone, arrive sur le profil, et il ne lui reste qu’à appuyer sur
        « S’abonner ».
      </p>
      <p>
        Cette réduction de friction compte surtout dans les moments brefs : un passant devant une vitrine,
        un client qui attend son tour en caisse, un visiteur de salon qui repart vers le stand suivant.
        C’est là que le QR code transforme une rencontre physique en audience durable.
      </p>

      <h2 id="adresse">Trouver la bonne adresse à encoder</h2>
      <p>
        Chaque plateforme donne à ses profils une adresse web publique. C’est elle qu’il faut encoder, en
        remplaçant l’identifiant par le vôtre :
      </p>
      <ul>
        <li>
          Instagram : <code>https://www.instagram.com/identifiant</code>
        </li>
        <li>
          TikTok : <code>https://www.tiktok.com/@identifiant</code>
        </li>
        <li>
          YouTube : <code>https://www.youtube.com/@identifiant</code>
        </li>
        <li>
          LinkedIn : <code>https://www.linkedin.com/in/identifiant</code> pour un profil,{' '}
          <code>https://www.linkedin.com/company/identifiant</code> pour une page d’entreprise
        </li>
        <li>
          Facebook : <code>https://www.facebook.com/identifiant</code>
        </li>
      </ul>
      <p>
        Sur un téléphone où l’application est installée, ces adresses ouvrent généralement directement le
        profil dans l’application ; sinon, le profil s’affiche dans le navigateur. Méfiez-vous en revanche
        des liens copiés depuis le bouton « Partager » des applications : ils ajoutent souvent, après un
        point d’interrogation, des paramètres de suivi qui allongent l’adresse sans rien apporter. Supprimez
        tout ce qui suit le <code>?</code> avant de générer le code, puis vérifiez que le lien fonctionne
        toujours.
      </p>

      <h3>Et les QR codes proposés par les applications ?</h3>
      <p>
        Instagram, TikTok ou LinkedIn savent générer eux-mêmes un QR code de profil. Pour un partage
        improvisé, d’un téléphone à l’autre, c’est parfait. Pour un support imprimé, un code que vous
        concevez vous-même offre davantage de maîtrise : couleurs de votre charte, légende adaptée, choix
        de la taille et du format de fichier, export vectoriel pour l’imprimeur. Et surtout, vous choisissez
        l’adresse encodée, ce qui ouvre la possibilité d’une page de liens.
      </p>

      <h2 id="page-de-liens">Un seul réseau ou une page de liens ?</h2>
      <p>
        Si vous êtes actif sur un réseau principal, pointez directement vers lui : chaque étape
        supplémentaire coûte des abonnés. Si votre public se répartit entre plusieurs plateformes, une page
        qui les regroupe laisse chacun choisir celle qu’il utilise déjà.
      </p>
      <p>
        Dans ce second cas, hébergez la page sur votre propre site, par exemple{' '}
        <em>lumen-ceramique.fr/liens</em>, plutôt que sur un service tiers de « lien en bio ». Vous pourrez
        ajouter ou retirer un réseau sans jamais toucher au code imprimé, et vous ne dépendrez pas de la
        pérennité d’un prestataire — un raisonnement développé dans notre guide{' '}
        <Link to="/guide/qr-code-statique-ou-dynamique">QR code statique ou dynamique</Link>. L’adresse
        reste en outre courte : 32 caractères ici, contre plus de 90 pour une adresse de profil chargée de
        paramètres de suivi, et un code nettement plus aéré.
      </p>

      <h2 id="creer">Créer le code</h2>
      <ol>
        <li>
          Dans le <Link to="/">générateur</Link>, onglet <strong>Lien</strong>, collez l’adresse nettoyée.
        </li>
        <li>
          Appliquez vos couleurs dans <strong>Couleurs et palettes</strong>. Évitez de reproduire les dégradés
          très clairs de certaines plateformes : le contraste doit rester franc.
        </li>
        <li>
          Si vous ajoutez un logo, préférez le vôtre à celui du réseau social : c’est votre marque que le
          public doit reconnaître. Le générateur règle alors de lui-même la correction d’erreur sur H.
        </li>
        <li>
          Dans <strong>Texte personnalisé</strong>, écrivez votre nom de compte en clair, par exemple
          « @lumen.ceramique » : il rassure et sert de solution de repli à ceux qui ne scannent pas.
        </li>
        <li>
          Exportez selon l’usage : PNG en 512 px pour l’insérer dans un visuel numérique, SVG pour une
          impression. Le fond transparent, disponible en PNG et en SVG, permet de poser le code sur une photo
          ou un visuel coloré — à condition que la zone située derrière le code reste claire et unie.
        </li>
      </ol>

      <AdUnit slot={AD_SLOTS.inArticle} format="fluid" layout="in-article" minHeight={120} className="my-10" />

      <h2 id="ou-afficher">Où l’afficher</h2>
      <ul>
        <li>
          <strong>À la caisse</strong> : le temps d’attente est un temps de scan disponible. Un petit
          présentoir près du terminal de paiement fonctionne mieux qu’une affiche au fond de la boutique.
        </li>
        <li>
          <strong>Dans les colis et sur le packaging</strong> : la carte de remerciement glissée dans une
          commande est lue au moment où le client est le plus satisfait.
        </li>
        <li>
          <strong>Sur un stand de salon ou de marché</strong> : sur un kakémono, le code doit être assez grand
          pour être scanné à deux ou trois mètres, soit 20 à 30 cm de côté.
        </li>
        <li>
          <strong>En vitrine</strong>, à hauteur des yeux, avec une accroche lisible depuis le trottoir.
        </li>
        <li>
          <strong>À la fin d’une conférence ou d’une vidéo projetée</strong> : laissez le code affiché
          plusieurs secondes, le temps que le public sorte son téléphone.
        </li>
      </ul>
      <p>
        Pour calculer la taille adaptée à chaque distance, consultez notre guide{' '}
        <Link to="/guide/taille-qr-code-impression">quelle taille pour un QR code imprimé</Link>.
      </p>

      <h3>Le piège de l’écran de téléphone</h3>
      <p>
        Publier un QR code dans une story ou une publication destinée à être vue sur mobile n’a guère de
        sens : on ne peut pas scanner l’écran que l’on tient dans la main. Certains téléphones savent
        analyser un QR code présent dans une image, mais le geste est peu connu. Sur les réseaux, utilisez
        plutôt les liens cliquables prévus par chaque plateforme, et réservez le QR code aux supports
        physiques et aux grands écrans.
      </p>

      <h2 id="inciter">Donner une raison de scanner</h2>
      <p>
        Un code accompagné de « Scannez-moi » ne dit pas ce que l’on gagne à le faire. Une promesse concrète
        change tout :
      </p>
      <ul>
        <li>« Les coulisses de l’atelier chaque semaine » ;</li>
        <li>« Nos nouveautés en avant-première » ;</li>
        <li>« Tutoriels d’entretien de vos pièces en vidéo » ;</li>
        <li>« Suivez-nous et recevez une surprise à votre prochaine visite ».</li>
      </ul>
      <p>
        Tenez la promesse faite : un visiteur déçu se désabonne aussi vite qu’il s’est abonné. Si vous
        organisez un jeu-concours, relisez au préalable les règles de la plateforme concernée, qui encadrent
        strictement ce type d’opération.
      </p>

      <h2 id="mesurer">Mesurer les résultats sans outil payant</h2>
      <p>
        Les codes générés par QR Studio sont statiques : aucun compteur de scans n’est intégré. Ce n’est pas
        un obstacle si vous passez par votre propre page de liens : ajoutez à l’adresse un paramètre de
        campagne, par exemple <code>?utm_source=salon</code>, et les statistiques de votre site feront
        apparaître séparément les visiteurs venus de chaque support. Pour un lien direct vers un profil, les
        statistiques de la plateforme indiquent l’évolution des visites et des abonnés sans en préciser
        l’origine : comparez alors la période qui suit une opération avec la précédente, ou associez à chaque
        support une offre spécifique mentionnée en caisse.
      </p>

      <h2 id="check-list">Check-list avant de lancer</h2>
      <ol>
        <li>L’adresse encodée ouvre le bon profil ou la bonne page, sans paramètre superflu.</li>
        <li>Le nom de compte est écrit en clair sous le code.</li>
        <li>L’accroche dit ce que la personne gagne à scanner.</li>
        <li>Le contraste est validé par l’indicateur du générateur.</li>
        <li>Le code a été testé imprimé, à la distance réelle, sur un iPhone et un Android.</li>
        <li>Le profil est prêt à accueillir les nouveaux venus : biographie à jour, publications récentes.</li>
      </ol>
      <p>
        Pour les supports où vous voulez aussi transmettre vos coordonnées complètes, voyez notre guide
        consacré au <Link to="/guide/qr-code-carte-de-visite">QR code sur carte de visite</Link>.
      </p>
    </GuideLayout>
  )
}
