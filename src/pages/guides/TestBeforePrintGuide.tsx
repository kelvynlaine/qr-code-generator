import { Link } from 'react-router-dom'
import { GuideLayout } from '../../components/Guides/GuideLayout'
import { AdUnit } from '../../components/Ads/AdUnit'
import { AD_SLOTS } from '../../lib/adsense'
import { guidePath } from '../../data/guides'

export function TestBeforePrintGuide() {
  return (
    <GuideLayout slug="tester-qr-code-avant-impression">
      <h2 id="pourquoi">Un code qui marche à l’écran peut échouer sur papier</h2>
      <p>
        Scanner le QR code directement sur l’écran de l’ordinateur, juste après l’avoir créé, rassure — mais
        ne prouve pas grand-chose. L’écran est rétroéclairé, le code y est affiché en grand et parfaitement
        net. Une fois imprimé, il sera plus petit, peut-être sur un papier brillant qui reflète la lumière,
        lu à bout de bras dans un couloir mal éclairé, ou recadré par le graphiste qui a rogné la marge.
        Le seul test qui vaut est celui qui reproduit les conditions réelles.
      </p>

      <h2 id="contenu">Étape 1 : vérifier le contenu</h2>
      <p>
        Avant de juger la lisibilité, vérifiez que le code mène bien là où il doit. Scannez-le et contrôlez
        la destination exacte :
      </p>
      <ul>
        <li>
          <strong>pour un lien</strong> : la page s’ouvre-t-elle sans erreur, en HTTPS, et s’affiche-t-elle
          correctement sur mobile ? Une page pensée pour ordinateur fera fuir la plupart des visiteurs ;
        </li>
        <li>
          <strong>pour un Wi-Fi</strong> : le téléphone se connecte-t-il réellement au réseau ? Testez avec un
          appareil qui n’a jamais rejoint ce réseau, sinon le test ne prouve rien (voir le{' '}
          <Link to={guidePath('qr-code-wifi')}>guide du QR code Wi-Fi</Link>) ;
        </li>
        <li>
          <strong>pour un e-mail ou un téléphone</strong> : l’adresse ou le numéro pré-rempli est-il exact,
          caractère par caractère ?
        </li>
      </ul>
      <p>
        Une coquille dans une URL est la cause d’échec la plus fréquente — et la seule qu’aucune
        correction d’erreur ne rattrapera : le code sera parfaitement lisible, il mènera simplement au
        mauvais endroit.
      </p>

      <h2 id="appareils">Étape 2 : tester sur plusieurs téléphones</h2>
      <p>
        Les lecteurs de QR codes ne se valent pas. L’appareil photo d’un iPhone récent lit des codes
        difficiles que d’autres modèles refusent. Testez au minimum :
      </p>
      <ul>
        <li>un iPhone, avec l’application Appareil photo native ;</li>
        <li>un téléphone Android, avec l’appareil photo ou Google Lens ;</li>
        <li>
          si possible, un téléphone ancien ou d’entrée de gamme : il représente une part non négligeable de
          votre public, et son capteur est moins tolérant.
        </li>
      </ul>
      <p>
        Le code doit être détecté en une à deux secondes, sans avoir à chercher l’angle. S’il faut
        s’approcher, reculer ou s’y reprendre, vos utilisateurs abandonneront.
      </p>

      <AdUnit slot={AD_SLOTS.inArticle} format="fluid" layout="in-article" minHeight={120} className="my-10" />

      <h2 id="epreuve">Étape 3 : imprimer une épreuve à taille réelle</h2>
      <p>
        Imprimez le document tel qu’il sera diffusé, à <strong>l’échelle 100 %</strong> — vérifiez que
        l’option « ajuster à la page » de l’imprimante est désactivée. Mesurez le code à la règle : il doit
        avoir exactement la taille prévue. Contrôlez ensuite à l’œil nu :
      </p>
      <ul>
        <li>
          la <strong>marge blanche</strong> autour du code est intacte, sur au moins la largeur de quatre
          modules : aucun texte, trait de coupe ou bord de page ne vient la grignoter ;
        </li>
        <li>les modules sont nets, sans bavure d’encre qui les fait fusionner ;</li>
        <li>les trois grands carrés d’angle (les « yeux ») sont entiers et bien visibles.</li>
      </ul>

      <h2 id="conditions">Étape 4 : reproduire les conditions d’usage</h2>
      <p>
        Placez l’épreuve là où le support vivra, ou dans des conditions proches, et scannez-la comme le
        ferait un passant :
      </p>
      <ul>
        <li>
          <strong>à la bonne distance</strong> : une affiche lue à deux mètres doit être testée à deux mètres.
          Le guide <Link to={guidePath('taille-qr-code-impression')}>quelle taille pour un QR code
          imprimé</Link> détaille le lien entre taille et distance ;
        </li>
        <li>
          <strong>sous la vraie lumière</strong> : faible éclairage d’une salle de restaurant, plein soleil
          d’une vitrine, néons d’un salon. Un papier brillant ou une plastification peuvent créer des reflets
          qui masquent une partie du code ;
        </li>
        <li>
          <strong>avec un angle</strong> : un code collé sur une table, un comptoir ou en hauteur est rarement
          scanné de face ;
        </li>
        <li>
          <strong>sur la surface finale</strong> : un emballage courbe, une bouteille ou un tissu déforment le
          code, ce qui impose un format plus grand et un niveau de{' '}
          <Link to={guidePath('niveau-correction-erreur-qr-code')}>correction d’erreur</Link> plus élevé.
        </li>
      </ul>

      <h2 id="echec">Si le test échoue</h2>
      <p>Dans l’ordre, les corrections les plus efficaces sont les suivantes :</p>
      <ol>
        <li>agrandir le code : c’est presque toujours la solution la plus sûre ;</li>
        <li>
          augmenter le contraste : modules plus foncés, fond plus clair, pas de dégradé vers une teinte claire ;
        </li>
        <li>réduire ou retirer le logo central ;</li>
        <li>
          raccourcir le contenu : une URL plus courte donne un code moins dense, aux modules plus gros à taille
          égale ;
        </li>
        <li>passer à un papier mat si les reflets sont en cause.</li>
      </ol>

      <h2 id="check-list">Check-list de validation</h2>
      <ul>
        <li>la destination est correcte et la page est adaptée au mobile ;</li>
        <li>le code est lu en moins de deux secondes sur iPhone et sur Android ;</li>
        <li>l’épreuve est imprimée à 100 % et mesure la taille prévue ;</li>
        <li>la marge blanche est intacte sur tout le pourtour ;</li>
        <li>le scan fonctionne à la distance, sous la lumière et selon l’angle réels.</li>
      </ul>
    </GuideLayout>
  )
}
