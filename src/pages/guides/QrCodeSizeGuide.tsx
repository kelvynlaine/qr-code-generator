import { Link } from 'react-router-dom'
import { GuideLayout } from '../../components/Guides/GuideLayout'
import { AdUnit } from '../../components/Ads/AdUnit'
import { AD_SLOTS } from '../../lib/adsense'

export function QrCodeSizeGuide() {
  return (
    <GuideLayout slug="taille-qr-code-impression">
      <h2 id="regle-des-dix">La règle des dix</h2>
      <p>
        Le repère le plus utile est une règle empirique : un QR code se scanne confortablement jusqu’à
        une distance d’environ <strong>dix fois sa largeur</strong>. Un code de 3 cm se lit sans effort
        à 30 cm, un code de 20 cm à 2 mètres. Ce n’est pas une norme, mais un ordre de grandeur qui
        tient compte de la résolution d’un appareil photo de smartphone courant, du temps de mise au
        point et d’un fait très simple : la personne ne cherchera pas longtemps.
      </p>
      <p>
        La règle s’utilise dans les deux sens. Si vous connaissez la distance à laquelle les gens
        passeront devant votre support, divisez-la par dix pour obtenir la largeur minimale. Si la
        place est contrainte, elle vous indique à quelle distance il faudra s’approcher — et donc si
        l’emplacement choisi a du sens. Un code de 5 cm en haut d’une vitrine, lu depuis le trottoir
        à trois mètres, ne sera tout simplement jamais scanné.
      </p>

      <h2 id="modules">Ce qui compte vraiment : la taille des modules</h2>
      <p>
        Un QR code est une grille de petits carrés appelés <em>modules</em>. Pour lire le code,
        l’appareil doit distinguer chacun d’eux. Or leur nombre n’est pas fixe : il dépend de la
        quantité de données encodées et du niveau de correction d’erreur. Le format prévoit 40
        versions, de 21 × 21 modules pour la version 1 à 177 × 177 pour la version 40 ; chaque
        version ajoute quatre modules par côté.
      </p>
      <p>
        À taille imprimée égale, plus la grille est dense, plus chaque module est petit. C’est
        pourquoi deux QR codes de 3 cm peuvent se comporter très différemment. Quelques exemples
        concrets, pour un code imprimé à 3 cm de large, marge blanche comprise :
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Contenu encodé</th>
              <th scope="col">Correction</th>
              <th scope="col">Grille</th>
              <th scope="col">Taille d’un module</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>https://codeqrgen.fr (20 caractères)</td>
              <td>M</td>
              <td>25 × 25 (version 2)</td>
              <td>0,91 mm</td>
            </tr>
            <tr>
              <td>https://codeqrgen.fr (20 caractères)</td>
              <td>H</td>
              <td>29 × 29 (version 3)</td>
              <td>0,81 mm</td>
            </tr>
            <tr>
              <td>URL de 60 caractères avec paramètres de suivi</td>
              <td>H</td>
              <td>45 × 45 (version 7)</td>
              <td>0,57 mm</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        La conséquence pratique est importante : <strong>raccourcir ce que vous encodez</strong> est le
        moyen le plus efficace de fiabiliser un petit QR code. Une adresse courte sur votre propre
        domaine vaut mieux qu’un lien de 80 caractères chargé de paramètres. À titre de repère, viser
        des modules d’au moins 0,4 mm pour une lecture à courte distance laisse une marge confortable
        face aux imprécisions d’impression.
      </p>

      <h2 id="marge">N’oubliez pas la marge blanche</h2>
      <p>
        La norme du QR code (ISO/IEC 18004) prévoit une zone vide d’au moins quatre modules tout
        autour du code, appelée <em>quiet zone</em>. C’est elle qui permet au lecteur de détecter où
        le code commence et où il s’arrête. La supprimer pour gagner quelques millimètres, ou coller le
        code contre une photo, un aplat de couleur ou le bord d’une page, compte parmi les causes
        d’échec les plus fréquentes. Dans le générateur, le réglage « Marge autour du QR code » et le
        cadre optionnel servent précisément à la préserver.
      </p>

      <AdUnit slot={AD_SLOTS.inArticle} format="fluid" layout="in-article" minHeight={120} className="my-10" />

      <h2 id="par-support">Tailles recommandées par support</h2>
      <p>
        Les valeurs ci-dessous appliquent la règle des dix à des situations courantes. Elles
        supposent un contenu court et un contraste franc ; avec une URL longue ou un logo central,
        prévoyez plus grand.
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Support</th>
              <th scope="col">Distance de lecture typique</th>
              <th scope="col">Largeur conseillée</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Carte de visite</td>
              <td>20 à 30 cm</td>
              <td>2,5 à 3 cm</td>
            </tr>
            <tr>
              <td>Flyer, étiquette produit</td>
              <td>20 à 40 cm</td>
              <td>3 à 4 cm</td>
            </tr>
            <tr>
              <td>Chevalet de table, menu</td>
              <td>30 à 50 cm</td>
              <td>4 à 5 cm</td>
            </tr>
            <tr>
              <td>Affiche A3 en vitrine</td>
              <td>environ 1 m</td>
              <td>10 cm</td>
            </tr>
            <tr>
              <td>Affiche A1, kakémono</td>
              <td>2 à 3 m</td>
              <td>20 à 30 cm</td>
            </tr>
            <tr>
              <td>Panneau extérieur</td>
              <td>5 m et plus</td>
              <td>50 cm et plus</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="resolution">Quelle résolution exporter ?</h2>
      <p>
        Pour l’impression, la référence est de 300 points par pouce à la taille finale. Le calcul est
        simple : largeur en centimètres ÷ 2,54 × 300.
      </p>
      <ul>
        <li>3 cm → environ 355 pixels ;</li>
        <li>5 cm → environ 590 pixels ;</li>
        <li>10 cm → environ 1 180 pixels ;</li>
        <li>30 cm → environ 3 540 pixels.</li>
      </ul>
      <p>
        Au-delà d’une dizaine de centimètres, préférez le format <strong>SVG</strong> : vectoriel, il
        reste net à n’importe quelle échelle et c’est le fichier qu’attendent la plupart des
        imprimeurs. Évitez en revanche d’agrandir un PNG exporté trop petit : l’agrandissement rend les
        contours des modules flous, ce qui gêne précisément la distinction entre zones claires et
        foncées.
      </p>

      <h2 id="avant-impression">Avant d’imprimer en série</h2>
      <ol>
        <li>Imprimez une épreuve à taille réelle, sur le support définitif si possible.</li>
        <li>Scannez-la à la distance prévue avec au moins deux téléphones différents.</li>
        <li>Testez dans la lumière du lieu : vitrine en plein soleil, salle tamisée, reflets.</li>
        <li>Vérifiez que le lien ouvre la bonne page, en HTTPS, et qu’elle s’affiche bien sur mobile.</li>
      </ol>
      <p>
        Ce contrôle prend cinq minutes. Réimprimer mille flyers prend nettement plus longtemps. Pour
        aller plus loin sur l’apparence du code, consultez notre guide{' '}
        <Link to="/guide/personnaliser-qr-code-sans-perdre-la-lecture">
          personnaliser un QR code sans nuire à sa lecture
        </Link>
        .
      </p>
    </GuideLayout>
  )
}
