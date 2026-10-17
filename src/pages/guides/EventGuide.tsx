import { Link } from 'react-router-dom'
import { GuideLayout } from '../../components/Guides/GuideLayout'
import { AdUnit } from '../../components/Ads/AdUnit'
import { AD_SLOTS } from '../../lib/adsense'
import { guidePath } from '../../data/guides'

export function EventGuide() {
  return (
    <GuideLayout slug="qr-code-mariage-evenement">
      <h2 id="idee">Un petit carré pour éviter beaucoup de questions</h2>
      <p>
        Un mariage, un anniversaire, une fête d’association ou un séminaire génèrent toujours les mêmes
        questions : « C’est où exactement ? », « Il y a du Wi-Fi ? », « Où est-ce qu’on met les photos ? ».
        Un QR code bien placé y répond avant même qu’elles soient posées. Il ne remplace pas le faire-part
        ni le mot d’accueil, mais il évite de surcharger l’un et l’autre d’informations pratiques.
      </p>

      <h2 id="avant">Avant l’événement : sur le faire-part ou l’invitation</h2>
      <p>
        Sur une invitation papier, le QR code sert surtout à renvoyer vers une information qui évoluera ou
        qui prendrait trop de place :
      </p>
      <ul>
        <li>
          <strong>le formulaire de réponse</strong> (Google Forms, Framaforms ou le formulaire de votre site de
          mariage) : vos invités répondent en une minute, et vous centralisez les réponses, les régimes
          alimentaires et le nombre d’enfants ;
        </li>
        <li>
          <strong>le site de l’événement</strong>, avec le programme, les hébergements à proximité et la liste
          de cadeaux ;
        </li>
        <li>
          <strong>l’itinéraire</strong> : un lien Google Maps ou Apple Plans vers le lieu exact. Sur un domaine
          ou une salle à la campagne, mieux vaut un point précis que l’adresse postale, souvent approximative
          pour les GPS.
        </li>
      </ul>
      <p>
        Le format d’un faire-part est petit : prévoyez un code d’au moins 2 à 2,5 cm de côté et une adresse
        courte. Le guide <Link to={guidePath('taille-qr-code-impression')}>quelle taille pour un QR code
        imprimé</Link> explique comment la longueur du lien influe sur la taille nécessaire.
      </p>

      <h2 id="pendant">Pendant l’événement : sur place</h2>
      <p>Le jour même, quelques usages font gagner un temps précieux aux organisateurs :</p>
      <ul>
        <li>
          <strong>le partage de photos</strong> : un lien vers un album partagé (Google Photos, iCloud ou un
          dossier en ligne ouvert en dépôt) permet de récupérer en une soirée les photos prises par tous les
          invités. Placez-le sur chaque table, avec une phrase claire : « Vos photos ici » ;
        </li>
        <li>
          <strong>le Wi-Fi</strong> de la salle, si elle en dispose : un{' '}
          <Link to={guidePath('qr-code-wifi')}>QR code Wi-Fi</Link> connecte les invités sans épeler le mot de
          passe ;
        </li>
        <li>
          <strong>le plan de table ou le programme</strong> : une page web consultable sur téléphone, en
          complément du panneau affiché à l’entrée ;
        </li>
        <li>
          <strong>le livre d’or numérique</strong> : un formulaire ou un service de messages vidéo, pour les
          invités qui préfèrent dicter quelques mots plutôt qu’écrire.
        </li>
      </ul>

      <AdUnit slot={AD_SLOTS.inArticle} format="fluid" layout="in-article" minHeight={120} className="my-10" />

      <h2 id="design">Accorder le QR code à la décoration</h2>
      <p>
        Un QR code noir et carré détonne sur une papeterie soignée. Le <Link to="/">générateur</Link> permet
        de l’accorder au thème de l’événement : modules arrondis ou en points, couleur reprise de la
        papeterie, cadre et petit texte d’invitation sous le code. Quelques limites restent à respecter pour
        qu’il fonctionne :
      </p>
      <ul>
        <li>
          gardez des modules <strong>foncés sur fond clair</strong> : un doré pâle sur crème ou un blanc sur
          kraft seront souvent illisibles. L’indicateur de contraste du générateur vous prévient ;
        </li>
        <li>
          préservez la marge claire autour du code, même si le graphisme de la carte est chargé ;
        </li>
        <li>
          si vous ajoutez un monogramme ou un logo au centre, gardez-le petit et augmentez le niveau de{' '}
          <Link to={guidePath('niveau-correction-erreur-qr-code')}>correction d’erreur</Link>.
        </li>
      </ul>
      <p>
        Pour une impression chez un papetier ou un imprimeur, exportez en SVG ; le guide{' '}
        <Link to={guidePath('format-qr-code-png-jpg-svg')}>PNG, JPG ou SVG</Link> détaille pourquoi.
      </p>

      <h2 id="pieges">Les pièges propres aux événements</h2>
      <ul>
        <li>
          <strong>Le lien qui expire</strong> : certains formulaires, albums ou raccourcisseurs gratuits
          expirent ou se ferment. Vérifiez la durée de vie du service, surtout si les faire-part partent six
          mois à l’avance ;
        </li>
        <li>
          <strong>l’album mal paramétré</strong> : un album partagé en lecture seule empêche les invités
          d’ajouter leurs photos. Testez le dépôt depuis un compte qui n’est pas le vôtre ;
        </li>
        <li>
          <strong>la lumière tamisée</strong> : en soirée, un code posé sur une table peu éclairée se lit mal.
          Agrandissez-le et privilégiez un papier mat, sans reflet ;
        </li>
        <li>
          <strong>les invités moins à l’aise</strong> : écrivez toujours l’information essentielle en clair à
          côté du code — l’adresse du lieu, l’heure, le nom du réseau Wi-Fi.
        </li>
      </ul>

      <h2 id="check-list">Check-list</h2>
      <ul>
        <li>chaque lien a été ouvert depuis un téléphone qui n’est pas le vôtre ;</li>
        <li>les services utilisés resteront actifs jusqu’après l’événement ;</li>
        <li>le contraste reste bon malgré les couleurs de la papeterie ;</li>
        <li>
          une épreuve imprimée a été scannée dans des conditions proches du jour J (voir{' '}
          <Link to={guidePath('tester-qr-code-avant-impression')}>tester un QR code avant de l’imprimer</Link>) ;
        </li>
        <li>l’information essentielle figure aussi en clair, à côté du code.</li>
      </ul>
    </GuideLayout>
  )
}
