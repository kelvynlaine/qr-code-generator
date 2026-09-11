import { Link } from 'react-router-dom'
import { GuideLayout } from '../../components/Guides/GuideLayout'
import { AdUnit } from '../../components/Ads/AdUnit'
import { AD_SLOTS } from '../../lib/adsense'

export function QrSecurityGuide() {
  return (
    <GuideLayout slug="securite-qr-code-quishing">
      <h2 id="quishing">Qu’est-ce que le quishing ?</h2>
      <p>
        Le <em>quishing</em>, contraction de « QR » et « phishing », désigne l’hameçonnage par QR code.
        Le principe est celui d’un faux e-mail : conduire la victime vers une page qui imite un service
        légitime afin de lui soutirer des identifiants, des coordonnées bancaires ou un paiement.
      </p>
      <p>
        Le QR code rend l’arnaque plus efficace pour deux raisons. On ne voit pas l’adresse avant de
        scanner, contrairement à un lien que l’on peut survoler. Et le scan se fait sur un téléphone,
        où la barre d’adresse est réduite et où l’on vérifie spontanément moins ce que l’on ouvre.
      </p>

      <h3>Les scénarios les plus courants</h3>
      <ul>
        <li>
          <strong>L’autocollant superposé</strong> : un faux QR code est collé par-dessus le code
          légitime d’un horodateur, d’une borne de recharge ou d’une affiche, et renvoie vers un faux
          site de paiement.
        </li>
        <li>
          <strong>Le courrier ou l’e-mail urgent</strong> : colis en attente, amende impayée, compte à
          vérifier. Le QR code sert aussi à contourner les filtres de messagerie qui analysent les liens
          écrits en clair.
        </li>
        <li>
          <strong>La fausse application</strong> : un code affiché dans la rue propose de télécharger une
          application en dehors des boutiques officielles.
        </li>
      </ul>

      <h2 id="scanner">Pour ceux qui scannent : cinq réflexes</h2>
      <ol>
        <li>
          <strong>Lisez l’adresse avant de l’ouvrir.</strong> L’appareil photo d’iOS comme d’Android
          affiche un aperçu du lien. Méfiez-vous des domaines inconnus, des fautes d’orthographe
          subtiles et des raccourcisseurs d’URL.
        </li>
        <li>
          <strong>Regardez le support.</strong> Un code sur un autocollant, légèrement de travers ou
          collé sur un autre, est un signal d’alerte.
        </li>
        <li>
          <strong>Vérifiez par un autre canal</strong> tout QR code qui mène directement à une demande
          de paiement, de mot de passe ou d’informations bancaires : passez par l’application officielle
          ou tapez l’adresse vous-même.
        </li>
        <li>
          <strong>N’installez jamais d’application</strong> depuis un QR code trouvé sur la voie publique :
          allez directement dans le store officiel.
        </li>
        <li>
          <strong>Gardez en tête où se situe le risque.</strong> Dans l’immense majorité des cas, un QR
          code ne peut rien faire sans votre action : le danger vient de la page ouverte et de ce que
          vous y saisissez, pas du scan lui-même.
        </li>
      </ol>

      <AdUnit slot={AD_SLOTS.inArticle} format="fluid" layout="in-article" minHeight={120} className="my-10" />

      <h2 id="imprimer">Pour ceux qui impriment : protéger ses clients</h2>
      <p>
        Si vos clients scannent vos codes, vous êtes également concerné : un autocollant frauduleux posé
        sur votre affiche engage votre image, même si vous n’y êtes pour rien.
      </p>
      <ul>
        <li>
          <strong>Encodez une adresse de votre propre nom de domaine</strong> et imprimez-la en clair sous
          le code (« votre-site.fr/menu ») : le client peut vérifier que l’adresse ouverte correspond à
          celle qui est écrite.
        </li>
        <li>
          <strong>Évitez les raccourcisseurs génériques</strong> : ils masquent la destination et
          habituent vos clients à ouvrir des liens illisibles — exactement ce dont profitent les
          fraudeurs.
        </li>
        <li>
          <strong>Utilisez HTTPS</strong> sur toutes les pages atteintes par un QR code.
        </li>
        <li>
          <strong>Protégez physiquement les codes exposés</strong> : derrière une vitre, sous
          plastification, imprimés directement sur le support plutôt qu’en autocollant.
        </li>
        <li>
          <strong>Contrôlez régulièrement</strong> les supports en libre accès : un collage frauduleux se
          repère en quelques secondes.
        </li>
        <li>
          <strong>Si vous demandez un paiement</strong>, faites-le sur une page qui affiche clairement
          votre identité, et proposez une alternative à ceux qui préfèrent ne pas scanner.
        </li>
      </ul>

      <h2 id="wifi">Le cas particulier du QR code Wi-Fi</h2>
      <p>
        Un QR code Wi-Fi contient le nom du réseau et le mot de passe en clair, lisibles par n’importe
        quelle application de lecture. Toute personne qui photographie le code connaît donc votre mot de
        passe. Trois précautions en découlent :
      </p>
      <ul>
        <li>
          utilisez un <strong>réseau invité</strong> séparé de votre réseau principal — la plupart des
          box et routeurs le proposent ;
        </li>
        <li>changez le mot de passe si le code a été exposé longtemps dans un lieu public ;</li>
        <li>
          n’affichez le code que là où vous accepteriez de donner le mot de passe de vive voix.
        </li>
      </ul>

      <h2 id="statique">Ce qu’un QR code statique change</h2>
      <p>
        Un QR code statique, comme ceux que produit QR Studio, encode directement votre adresse. Aucun
        prestataire intermédiaire ne peut modifier sa destination, ni être piraté pour le faire. Cela ne
        protège pas contre un autocollant posé par-dessus — aucun QR code n’en est capable —, mais cela
        supprime un point de défaillance. Nous détaillons ces différences dans le guide{' '}
        <Link to="/guide/qr-code-statique-ou-dynamique">QR code statique ou dynamique</Link>.
      </p>
      <p>
        Et parce que le générateur fonctionne entièrement dans votre navigateur, le contenu que vous
        encodez — y compris un mot de passe Wi-Fi — n’est transmis à aucun serveur.
      </p>
    </GuideLayout>
  )
}
