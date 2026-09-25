import { Link } from 'react-router-dom'
import { GuideLayout } from '../../components/Guides/GuideLayout'
import { AdUnit } from '../../components/Ads/AdUnit'
import { AD_SLOTS } from '../../lib/adsense'

export function WifiGuide() {
  return (
    <GuideLayout slug="qr-code-wifi">
      <h2 id="principe">Un QR code qui ne mène vers aucune page</h2>
      <p>
        La plupart des QR codes contiennent une adresse web. Le QR code Wi-Fi fonctionne autrement : il
        transporte une petite fiche de configuration — nom du réseau, type de protection, mot de passe —
        que le système du téléphone sait interpréter. Au lieu d’ouvrir un navigateur, l’appareil propose
        de <strong>rejoindre le réseau</strong>. Un appui suffit, et la connexion est enregistrée comme si
        l’utilisateur avait tout saisi lui-même.
      </p>
      <p>
        Cette lecture est prise en charge nativement par l’appareil photo des iPhone depuis iOS 11 et par
        la grande majorité des téléphones Android récents, soit dans l’appareil photo, soit via Google
        Lens. Sur un modèle plus ancien, une application de lecture de QR codes fait l’affaire. Aucune
        connexion internet n’est nécessaire pour lire le code : tout est dans l’image.
      </p>

      <h2 id="format">La chaîne WIFI, champ par champ</h2>
      <p>
        Derrière les carrés noirs se cache un texte au format normalisé de fait, introduit par la
        bibliothèque de lecture ZXing et repris depuis par tous les systèmes. Pour un réseau protégé,
        le générateur produit par exemple :
      </p>
      <p>
        <code>WIFI:T:WPA;S:Cafe-Invites;P:Soleil-Terrasse-2026;;</code>
      </p>
      <ul>
        <li>
          <strong>T</strong> indique la protection : <code>WPA</code>, <code>WEP</code> ou{' '}
          <code>nopass</code> pour un réseau ouvert ;
        </li>
        <li>
          <strong>S</strong> contient le nom du réseau (le SSID), en respectant scrupuleusement majuscules,
          minuscules et espaces ;
        </li>
        <li>
          <strong>P</strong> contient le mot de passe ; il est omis pour un réseau ouvert ;
        </li>
        <li>
          <strong>H:true</strong>, facultatif, signale un réseau masqué qui ne diffuse pas son nom ;
        </li>
        <li>les deux points-virgules finaux ferment la fiche.</li>
      </ul>
      <p>
        Un détail explique beaucoup de codes « faits maison » qui refusent de fonctionner : les
        caractères <code>;</code>, <code>,</code>, <code>:</code>, <code>"</code> et <code>\</code> ont un
        sens particulier dans ce format. S’ils apparaissent dans le nom du réseau ou dans le mot de passe,
        ils doivent être précédés d’une barre oblique inverse. Le générateur de QR Studio applique cet
        échappement automatiquement : vous saisissez le mot de passe tel qu’il est, sans vous en soucier.
      </p>

      <h2 id="creer">Créer le code pas à pas</h2>
      <ol>
        <li>
          Ouvrez le <Link to="/">générateur</Link> et sélectionnez l’onglet <strong>Wi-Fi</strong>.
        </li>
        <li>
          Dans <strong>Nom du réseau (SSID)</strong>, recopiez le nom exact tel qu’il apparaît dans la liste
          des réseaux de votre téléphone ou sur l’étiquette de la box. Attention à l’espace parasite en fin
          de saisie : il fait partie du nom et suffit à faire échouer la connexion.
        </li>
        <li>
          Choisissez la <strong>Sécurité</strong>. L’option « WPA / WPA2 / WPA3 » correspond à la quasi-totalité
          des box et routeurs actuels.
        </li>
        <li>
          Saisissez le <strong>mot de passe</strong>. Le champ l’affiche en clair : profitez-en pour le
          relire caractère par caractère, en particulier les confusions classiques entre O et 0, l et I.
        </li>
        <li>
          Activez <strong>Réseau masqué</strong> uniquement si votre réseau ne diffuse pas son nom.
        </li>
        <li>
          Personnalisez les couleurs, puis ajoutez un texte explicite sous le code dans la section{' '}
          <strong>Texte personnalisé</strong>, par exemple « Wi-Fi invités : scannez pour vous connecter ».
        </li>
        <li>
          Téléchargez le fichier : PNG pour un affichage ou une impression de bureau, SVG si vous passez
          par un imprimeur.
        </li>
      </ol>

      <h3>Quelle option de sécurité choisir ?</h3>
      <p>
        Le réglage doit refléter la configuration réelle du point d’accès, visible dans l’interface
        d’administration de votre box. Le type WPA couvre WPA2, la norme la plus répandue, et les box en
        mode mixte WPA2/WPA3. Pour un réseau configuré exclusivement en WPA3, la prise en charge dépend du
        téléphone qui scanne : testez avec plusieurs appareils, et basculez le réseau invité en mode mixte
        si certains échouent. Le WEP, lui, est cassé depuis longtemps ; si votre matériel l’utilise
        encore, le problème n’est pas le QR code mais la protection du réseau. Quant au réseau ouvert, il
        dispense de mot de passe, mais n’offre aucun chiffrement entre l’appareil et le point d’accès.
      </p>

      <h3>Le cas du réseau masqué</h3>
      <p>
        Masquer le nom d’un réseau ne le protège pas : il reste détectable par n’importe quel outil
        d’analyse. En revanche, le téléphone ne peut pas le trouver seul, d’où l’indication{' '}
        <code>H:true</code> qui lui dit de le chercher activement. Si vous n’avez pas délibérément masqué
        votre réseau, laissez l’option désactivée.
      </p>

      <AdUnit slot={AD_SLOTS.inArticle} format="fluid" layout="in-article" minHeight={120} className="my-10" />

      <h2 id="depannage">Le code ne connecte pas : les causes fréquentes</h2>
      <p>
        Quand un QR code Wi-Fi est reconnu mais que la connexion échoue, le code lui-même est rarement en
        cause. Passez en revue ces points, dans cet ordre :
      </p>
      <ul>
        <li>
          <strong>Un nom ou un mot de passe différent d’un seul caractère</strong> : casse, espace, tiret
          court ou long. Comparez avec l’interface de la box plutôt qu’avec un post-it.
        </li>
        <li>
          <strong>Un mot de passe changé depuis l’impression</strong> : le code a figé l’ancien. Il faut en
          générer un nouveau et remplacer tous les supports.
        </li>
        <li>
          <strong>Deux réseaux pour deux bandes</strong> : certaines box publient un nom pour le 2,4 GHz et un
          autre pour le 5 GHz. Le code ne vise qu’un seul des deux ; vérifiez que c’est celui que vous
          voulez partager.
        </li>
        <li>
          <strong>Des caractères exotiques</strong> : un émoji ou un symbole comme € dans le nom du réseau ou
          dans le mot de passe peut ne pas être transmis correctement. Pour un réseau invité, préférez des
          lettres, des chiffres et des tirets.
        </li>
        <li>
          <strong>Un téléphone qui connaît déjà le réseau</strong> avec un ancien mot de passe : il faut lui
          faire « oublier » le réseau avant de scanner à nouveau.
        </li>
        <li>
          <strong>Un filtrage par adresse MAC</strong> ou un nombre maximal d’appareils atteint sur le point
          d’accès : le téléphone obtient les bons identifiants, mais la box le refuse.
        </li>
        <li>
          <strong>Un portail captif</strong> : dans un hôtel ou un espace public, la connexion réussit puis
          une page d’accueil s’ouvre pour accepter des conditions. C’est normal, mais mieux vaut le signaler
          à côté du code.
        </li>
      </ul>

      <h2 id="securite">Réseau invité : la précaution qui change tout</h2>
      <p>
        Le mot de passe figure en clair dans l’image. Quiconque photographie votre affiche, ou la voit en
        arrière-plan d’une photo publiée sur les réseaux sociaux, peut le retrouver en quelques secondes.
        Il faut donc raisonner comme si le code était le mot de passe lui-même.
      </p>
      <p>
        La réponse la plus efficace est un <strong>réseau invité</strong>, proposé par la plupart des box
        françaises et des routeurs professionnels. Il donne accès à internet sans exposer les ordinateurs,
        imprimantes, caméras ou caisses enregistreuses branchés sur le réseau principal. Activez l’isolation
        entre clients si l’option existe : les appareils des visiteurs ne se verront pas entre eux. Pour
        une location saisonnière, changer le mot de passe du réseau invité à chaque saison, puis réimprimer
        le code, limite le nombre d’anciens locataires capables de s’y connecter.
      </p>
      <p>
        Côté génération, le code est calculé localement, dans l’onglet de votre navigateur : le mot de passe
        que vous saisissez ne quitte pas votre ordinateur. Pour les autres risques liés aux QR codes affichés
        en public, comme les autocollants frauduleux, consultez notre guide sur{' '}
        <Link to="/guide/securite-qr-code-quishing">la sécurité et le quishing</Link>.
      </p>

      <h2 id="affichage">Où et comment l’afficher</h2>
      <ul>
        <li>
          <strong>Sur un chevalet de comptoir ou de table</strong>, avec un code de 4 à 5 cm de côté : c’est
          l’emplacement le plus naturel dans un café, un restaurant ou un espace de coworking.
        </li>
        <li>
          <strong>Dans le livret d’accueil d’un gîte</strong> ou sur un cadre près de l’entrée, là où les
          voyageurs posent leurs bagages et sortent leur téléphone.
        </li>
        <li>
          <strong>En salle d’attente ou de réunion</strong>, sur une affiche A5 ou A4 à hauteur des yeux,
          plutôt qu’au-dessus d’une porte.
        </li>
        <li>
          <strong>Sur un écran d’accueil</strong> dans une salle de formation, au moment où les participants
          s’installent.
        </li>
      </ul>
      <p>
        Dans tous les cas, écrivez aussi le nom du réseau — et, si le lieu s’y prête, le mot de passe — en
        toutes lettres sous le code. Un visiteur dont le téléphone refuse de scanner, ou qui veut connecter
        un ordinateur portable, doit pouvoir se débrouiller seul. Si le support est plastifié, choisissez
        une finition mate : les reflets d’un film brillant sous un éclairage de plafond gênent la lecture.
        Pour dimensionner le code selon la distance, reportez-vous à notre guide{' '}
        <Link to="/guide/taille-qr-code-impression">quelle taille pour un QR code imprimé</Link>.
      </p>

      <h2 id="check-list">Check-list avant d’imprimer</h2>
      <ol>
        <li>Le nom du réseau est copié à l’identique, sans espace superflu.</li>
        <li>Le type de sécurité correspond à la configuration de la box.</li>
        <li>Le réseau partagé est un réseau invité, isolé du réseau principal.</li>
        <li>
          Le code a été testé avec un téléphone qui n’a jamais rejoint ce réseau, ou qui l’a « oublié »
          avant le test.
        </li>
        <li>Un iPhone et un Android ont tous deux réussi la connexion.</li>
        <li>Le nom du réseau est imprimé lisiblement sous le code, avec une courte consigne.</li>
        <li>Vous savez qui réimprimera le code le jour où le mot de passe changera.</li>
      </ol>
      <p>
        Un code Wi-Fi bien préparé fait gagner du temps à chaque visiteur et à votre équipe, qui n’aura
        plus à épeler un mot de passe au comptoir. Si vous en installez un dans un restaurant, notre guide
        consacré au <Link to="/guide/qr-code-menu-restaurant">QR code de menu</Link> explique comment le
        faire cohabiter avec celui de la carte.
      </p>
    </GuideLayout>
  )
}
