import { Link } from 'react-router-dom'
import { GuideLayout } from '../../components/Guides/GuideLayout'
import { AdUnit } from '../../components/Ads/AdUnit'
import { AD_SLOTS } from '../../lib/adsense'

export function MenuRestaurantGuide() {
  return (
    <GuideLayout slug="qr-code-menu-restaurant">
      <h2 id="destination">Commencez par la page, pas par le code</h2>
      <p>
        Un client qui scanne un QR code de menu juge l’établissement sur ce qui s’affiche dans les trois
        secondes suivantes. Le code n’est qu’une porte d’entrée : la vraie décision porte sur ce qu’il ouvre.
        Deux options dominent.
      </p>
      <h3>Le PDF : rapide à mettre en place, pénible à lire</h3>
      <p>
        Exporter la carte papier en PDF et la mettre en ligne prend dix minutes. Mais un document conçu pour
        un format A4 oblige le client à zoomer puis à faire défiler dans tous les sens sur un écran de six
        pouces. Le fichier est souvent lourd, se télécharge mal en terrasse avec une connexion 4G faible, et
        il est mal restitué par les lecteurs d’écran utilisés par les personnes malvoyantes. Si vous gardez
        un PDF, faites-en une version dédiée au mobile : une colonne, gros caractères, poids réduit.
      </p>
      <h3>La page web : l’option à privilégier</h3>
      <p>
        Une simple page de votre site, par exemple <em>mon-bistrot.fr/carte</em>, s’adapte à la taille de
        l’écran, se charge vite et se modifie en quelques clics quand le plat du jour change. Surtout, elle
        permet de <strong>garder le même QR code pendant des années</strong> : vous mettez à jour la page,
        jamais le code imprimé. C’est l’application directe du principe détaillé dans notre guide{' '}
        <Link to="/guide/qr-code-statique-ou-dynamique">QR code statique ou dynamique</Link>.
      </p>
      <p>Une bonne page de menu répond à quelques critères simples :</p>
      <ul>
        <li>elle s’ouvre sans application à installer, sans compte à créer et sans fenêtre surgissante ;</li>
        <li>les prix sont visibles immédiatement, sans devoir ouvrir chaque plat ;</li>
        <li>la taille du texte reste confortable sans zoomer, y compris pour un lecteur de plus de soixante ans ;</li>
        <li>les allergènes sont indiqués plat par plat ou dans un tableau facile à trouver ;</li>
        <li>une version anglaise, au minimum, est accessible d’un appui si vous accueillez des touristes.</li>
      </ul>

      <h2 id="obligations">Ce que le QR code ne remplace pas</h2>
      <p>
        Le menu numérique est un complément, pas une dispense. En France, les restaurants doivent afficher
        à l’extérieur, pendant le service, les menus et les prix proposés : un QR code en vitrine ne suffit
        pas à remplir cette obligation. De même, l’information sur les allergènes doit rester accessible à
        chaque client, y compris à celui qui n’a pas de smartphone ou dont la batterie est vide. Gardez donc
        quelques cartes papier à disposition et formez l’équipe à répondre aux questions. En cas de doute
        sur vos obligations, la direction départementale de la protection des populations de votre
        territoire est l’interlocuteur compétent.
      </p>

      <h2 id="creer">Créer le code de la carte</h2>
      <ol>
        <li>
          Dans le <Link to="/">générateur</Link>, restez sur l’onglet <strong>Lien</strong> et collez
          l’adresse complète de la page, en commençant par <code>https://</code>.
        </li>
        <li>
          Reprenez la couleur principale de votre identité visuelle dans la section{' '}
          <strong>Couleurs et palettes</strong>, sur un fond clair. L’indicateur de contraste affiché sous
          l’aperçu vous alerte si la combinaison devient risquée.
        </li>
        <li>
          Ajoutez éventuellement votre logo dans <strong>Logo central</strong> : la correction d’erreur passe
          alors automatiquement au niveau maximal.
        </li>
        <li>
          Écrivez une consigne dans <strong>Texte personnalisé</strong> : « Notre carte du jour » ou
          « Scannez pour découvrir le menu » est plus engageant qu’un code muet.
        </li>
        <li>
          Activez le <strong>cadre</strong> si le code doit se détacher d’un fond chargé, comme une ardoise
          ou un set de table imprimé.
        </li>
        <li>
          Exportez en SVG pour votre imprimeur, ou en PNG 2048 px si vous imprimez vous-même.
        </li>
      </ol>

      <h3>Un code différent pour chaque table ?</h3>
      <p>
        Ajouter un paramètre comme <code>?table=12</code> à l’adresse n’a d’intérêt que si votre site sait
        l’exploiter, par exemple pour une commande à table. Sinon, un code unique suffit et simplifie la
        gestion : un seul fichier, un seul modèle de chevalet, aucun risque d’inverser deux tables. Pour
        savoir si le code de la vitrine est plus scanné que celui des tables, deux codes distincts avec
        des paramètres de suivi suffisent ; chaque caractère ajouté densifie cependant le code, donc restez
        concis.
      </p>

      <AdUnit slot={AD_SLOTS.inArticle} format="fluid" layout="in-article" minHeight={120} className="my-10" />

      <h2 id="supports">Choisir le support</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Support</th>
              <th scope="col">Atout</th>
              <th scope="col">Point de vigilance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Chevalet de table</td>
              <td>Stable, à hauteur de regard, déplaçable</td>
              <td>Code de 4 à 5 cm minimum ; chevalet à nettoyer sans effacer l’encre</td>
            </tr>
            <tr>
              <td>Autocollant sur la table</td>
              <td>Impossible à perdre, toujours à la même place</td>
              <td>Caché par les assiettes et les verres ; usure rapide sans vernis protecteur</td>
            </tr>
            <tr>
              <td>Vitrine</td>
              <td>Le passant consulte la carte avant d’entrer</td>
              <td>Reflets de la vitre ; code plus grand, car lu à un mètre ou plus</td>
            </tr>
            <tr>
              <td>Set de table en papier</td>
              <td>Coût faible, visibilité maximale</td>
              <td>Taches et plis : correction d’erreur élevée indispensable</td>
            </tr>
            <tr>
              <td>Ticket ou addition</td>
              <td>Le client repart avec le lien</td>
              <td>Impression thermique peu précise : code simple, sans logo, pas trop petit</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Pour ajuster les dimensions selon la distance de lecture de chaque support, appuyez-vous sur notre
        guide <Link to="/guide/taille-qr-code-impression">quelle taille pour un QR code imprimé</Link>.
      </p>

      <h2 id="lecture">Lumière, reflets et usure</h2>
      <p>
        Une salle de restaurant est un environnement difficile pour un appareil photo : lumière tamisée le
        soir, soleil direct en terrasse, spots qui se reflètent sur les supports plastifiés. Trois réglages
        font la différence. Un <strong>contraste franc</strong>, avec des modules foncés sur un fond clair,
        reste lisible dans la pénombre. Une <strong>finition mate</strong> évite que le reflet d’une lampe ne
        masque la moitié du code. Enfin, un <strong>niveau de correction d’erreur élevé</strong> — le
        générateur utilise H par défaut — permet au code de résister à une tache de sauce ou à un coin
        corné. Notre guide sur les{' '}
        <Link to="/guide/niveau-correction-erreur-qr-code">niveaux de correction d’erreur</Link> détaille ce
        mécanisme.
      </p>
      <p>
        Les produits d’entretien finissent par attaquer l’encre des autocollants. Inspectez les supports une
        fois par mois et remplacez ceux dont les modules commencent à pâlir : un code à moitié effacé
        fonctionne encore sur un téléphone récent, puis cesse brusquement de fonctionner sur les autres.
      </p>

      <h2 id="securite">Protéger vos clients des faux codes</h2>
      <p>
        Les QR codes de restaurant sont une cible connue : un escroc colle son propre code par-dessus le
        vôtre et redirige vers une fausse page de paiement ou de commande. Imprimez l’adresse de la carte en
        clair sous le code, pour que le client puisse comparer. Privilégiez les codes imprimés directement
        sur le support plutôt que des autocollants faciles à recouvrir, et jetez un œil aux tables à
        l’ouverture. Les autres réflexes sont réunis dans notre guide sur{' '}
        <Link to="/guide/securite-qr-code-quishing">la sécurité des QR codes</Link>.
      </p>

      <h2 id="accessibilite">Penser à tous les clients</h2>
      <p>
        Tout le monde n’est pas à l’aise avec le scan. Une personne âgée, un client malvoyant, un touriste
        sans forfait de données ou quelqu’un qui ne souhaite simplement pas sortir son téléphone à table
        doit pouvoir commander sans friction. Proposez spontanément la carte papier plutôt que d’attendre
        qu’on la demande, et assurez-vous que la page du menu reste lisible avec la taille de texte agrandie
        dans les réglages du téléphone. Un menu numérique réussi n’exclut personne.
      </p>

      <h3>Un code pour le Wi-Fi sur le même chevalet ?</h3>
      <p>
        C’est tentant, et souvent apprécié. Mais deux QR codes côte à côte sans légende créent la confusion :
        le client scanne au hasard. Séparez-les nettement, donnez à chacun un titre explicite (« La carte »,
        « Wi-Fi ») et, si possible, une couleur de cadre différente. Le guide{' '}
        <Link to="/guide/qr-code-wifi">QR code Wi-Fi</Link> explique comment préparer le second.
      </p>

      <h2 id="check-list">Check-list de mise en service</h2>
      <ol>
        <li>La page du menu s’ouvre en moins de trois secondes en 4G, sans application.</li>
        <li>Les prix et les allergènes sont à jour et faciles à trouver.</li>
        <li>L’adresse encodée est celle de votre domaine, et elle est imprimée en clair sous le code.</li>
        <li>Une épreuve imprimée a été scannée à la place du client, assis, sous l’éclairage du soir.</li>
        <li>Un iPhone et un Android ouvrent tous deux la bonne page.</li>
        <li>Des cartes papier restent disponibles et l’affichage extérieur des prix est en place.</li>
        <li>Une personne de l’équipe est chargée de vérifier les supports chaque semaine.</li>
      </ol>
    </GuideLayout>
  )
}
