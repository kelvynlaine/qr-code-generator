import { Link } from 'react-router-dom'
import { GuideLayout } from '../../components/Guides/GuideLayout'
import { AdUnit } from '../../components/Ads/AdUnit'
import { AD_SLOTS } from '../../lib/adsense'

export function ErrorCorrectionGuide() {
  return (
    <GuideLayout slug="niveau-correction-erreur-qr-code">
      <h2 id="principe">Une assurance intégrée au code</h2>
      <p>
        Un QR code ne contient pas seulement votre adresse ou votre texte. En plus des données utiles, il
        embarque des <strong>données de correction</strong>, calculées à partir des premières. Lorsqu’une
        partie de l’image est illisible — un pli, une goutte, un reflet, un logo posé au centre —, le lecteur
        s’en sert pour reconstituer ce qui manque, à la manière d’un correcteur qui devinerait les lettres
        effacées d’un mot à partir du reste de la phrase, mais avec une rigueur mathématique.
      </p>
      <p>
        La technique employée s’appelle le code de <strong>Reed-Solomon</strong>. On la retrouve dans les
        CD, les DVD, les communications spatiales ou certains systèmes de stockage. Elle ne travaille pas
        sur des pixels mais sur des <em>mots de code</em> : des paquets de huit modules qui représentent
        chacun un octet. Le code est divisé en blocs, et sur les versions un peu denses ces blocs sont
        entrelacés dans l’image : une tache localisée abîme alors quelques octets de plusieurs blocs plutôt
        que beaucoup d’octets d’un seul, ce qui augmente les chances de réparation.
      </p>

      <h2 id="niveaux">Les quatre niveaux</h2>
      <p>
        La norme ISO/IEC 18004 définit quatre niveaux, désignés par une lettre. Le choix se fait au moment de
        la génération et ne peut plus être modifié ensuite : il est inscrit dans le code lui-même.
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Niveau</th>
              <th scope="col">Part des mots de code récupérables</th>
              <th scope="col">Profil</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>L (Low)</td>
              <td>environ 7 %</td>
              <td>Le plus compact ; pour un écran propre et un contenu long</td>
            </tr>
            <tr>
              <td>M (Medium)</td>
              <td>environ 15 %</td>
              <td>Le compromis courant pour un usage numérique ou un contenu dense</td>
            </tr>
            <tr>
              <td>Q (Quartile)</td>
              <td>environ 25 %</td>
              <td>Supports imprimés manipulés, étiquettes, emballages</td>
            </tr>
            <tr>
              <td>H (High)</td>
              <td>environ 30 %</td>
              <td>Logo central, extérieur, supports exposés à l’usure</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Ce que ces pourcentages ne disent pas</h3>
      <p>
        Le chiffre porte sur la proportion d’octets que le décodeur sait reconstituer, et non sur une
        surface que l’on pourrait recouvrir à volonté. Une rayure fine qui traverse le code en diagonale
        touche un grand nombre d’octets à la fois ; elle peut dépasser la capacité de correction alors
        qu’elle ne couvre qu’une infime partie de l’image. À l’inverse, une tache ronde de même surface qui
        tombe sur une zone compacte sera plus facilement absorbée.
      </p>

      <h3>Ce qui n’est jamais réparable</h3>
      <p>
        La correction d’erreur protège les données, pas la structure qui permet de les trouver. Si les
        motifs de repérage, ces carrés concentriques placés dans trois angles, sont abîmés, le lecteur ne localise tout
        simplement pas le code. Même chose si la marge claire qui l’entoure est envahie par un décor. Quant
        au niveau de correction lui-même, il est inscrit dans une petite zone d’information de format,
        dupliquée à deux endroits près des coins et protégée par son propre mécanisme : c’est ainsi que le
        lecteur sait comment décoder le reste.
      </p>

      <h2 id="densite">Le prix de la robustesse : un code plus dense</h2>
      <p>
        Les octets de correction occupent de la place. À contenu égal, monter en niveau oblige à passer à
        une grille plus grande, donc à des modules plus petits pour une même taille imprimée. Voici ce que
        cela donne pour l’adresse <em>https://www.restaurant-exemple.fr/carte</em> (39 caractères), imprimée
        sur 3 cm de large avec la marge réglementaire de quatre modules :
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Niveau</th>
              <th scope="col">Grille</th>
              <th scope="col">Taille d’un module à 3 cm</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>L</td>
              <td>29 × 29 (version 3)</td>
              <td>0,81 mm</td>
            </tr>
            <tr>
              <td>M</td>
              <td>29 × 29 (version 3)</td>
              <td>0,81 mm</td>
            </tr>
            <tr>
              <td>Q</td>
              <td>33 × 33 (version 4)</td>
              <td>0,73 mm</td>
            </tr>
            <tr>
              <td>H</td>
              <td>37 × 37 (version 5)</td>
              <td>0,67 mm</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Pour un contenu court comme celui-ci, l’écart reste modeste et le niveau H ne pose aucun problème.
        Il devient déterminant lorsque le contenu s’allonge. Une grille de 37 × 37 modules (version 5)
        accueille jusqu’à 106 octets en niveau L, mais seulement 44 en niveau H ; une grille de 57 × 57
        (version 10) passe de 271 octets en L à 119 en H. Une fiche de contact complète ou un long texte
        peuvent ainsi produire, en niveau H, un code trop serré pour être imprimé petit. Le guide{' '}
        <Link to="/guide/taille-qr-code-impression">quelle taille pour un QR code imprimé</Link> explique
        pourquoi la taille des modules est le vrai critère de lisibilité.
      </p>

      <AdUnit slot={AD_SLOTS.inArticle} format="fluid" layout="in-article" minHeight={120} className="my-10" />

      <h2 id="logo">Le cas du logo central</h2>
      <p>
        Poser un logo au milieu d’un QR code revient à effacer volontairement des modules et à compter sur
        la correction d’erreur pour les reconstituer. Le budget de réparation est donc en partie consommé
        avant même la première impression : il en reste moins pour absorber une salissure ou un mauvais
        éclairage. C’est pourquoi un logo appelle toujours le niveau H.
      </p>
      <p>
        Dans le générateur de QR Studio, l’import d’une image dans la section <strong>Logo central</strong>{' '}
        règle automatiquement la correction sur H. Rien ne vous empêche ensuite de redescendre
        manuellement à un niveau inférieur : évitez-le tant qu’un logo est présent. De même, gardez le
        réglage « Taille du logo » dans des valeurs raisonnables et laissez actif le halo de sécurité, qui
        dégage proprement les modules autour de l’image. Un logo plus petit, bien détouré, laisse davantage
        de marge au décodeur qu’un grand logo dont les bords se mêlent aux modules.
      </p>

      <h2 id="choisir">Comment choisir, situation par situation</h2>
      <ul>
        <li>
          <strong>Code affiché sur un écran</strong> (présentation, borne, site web) : M suffit dans la
          plupart des cas, L si le contenu est très long et l’écran de bonne qualité.
        </li>
        <li>
          <strong>Carte de visite avec une fiche de contact encodée</strong> : M ou Q, sans logo, pour garder
          un code aéré sur un petit format. Notre guide{' '}
          <Link to="/guide/qr-code-carte-de-visite">QR code sur carte de visite</Link> chiffre cet exemple.
        </li>
        <li>
          <strong>Flyer, affiche, menu, packaging</strong> avec une adresse courte : Q ou H, sans hésiter.
        </li>
        <li>
          <strong>Support en extérieur, étiquette exposée, ticket thermique, set de table</strong> : H, et un
          code imprimé un peu plus grand.
        </li>
        <li>
          <strong>Logo central</strong> : H, dans tous les cas.
        </li>
      </ul>

      <h2 id="generateur">Régler le niveau dans le générateur</h2>
      <p>
        Le réglage se trouve dans la section <strong>Cadre et options avancées</strong>, sous le libellé
        « Niveau de correction d’erreur ». Il est positionné sur H par défaut, le choix le plus tolérant pour
        un usage imprimé. Si vous le modifiez, observez l’aperçu : vous verrez la grille se resserrer ou
        s’aérer en temps réel. Saisissez votre propre contenu dans le <Link to="/">générateur</Link> et
        faites défiler les quatre niveaux : c’est la façon la plus parlante de visualiser le compromis.
      </p>

      <h2 id="tester">Tester la robustesse de votre code</h2>
      <ol>
        <li>Imprimez le code à sa taille définitive, sur le support réel si possible.</li>
        <li>
          Masquez progressivement une petite zone au centre avec un morceau de papier, en restant loin des
          trois carrés des coins, et scannez à chaque étape.
        </li>
        <li>
          Si le code cesse de fonctionner dès le premier recouvrement, la marge de sécurité est faible :
          réduisez le logo, raccourcissez le contenu ou augmentez la taille.
        </li>
        <li>Recommencez sous un éclairage défavorable et avec un léger angle de prise de vue.</li>
      </ol>

      <h2 id="idees-recues">Trois idées reçues</h2>
      <ul>
        <li>
          <strong>« H est toujours le meilleur choix. »</strong> Pas pour un contenu très long à afficher en
          petit : la densité supplémentaire peut nuire davantage que la robustesse ne rapporte.
        </li>
        <li>
          <strong>« La correction compense un mauvais contraste. »</strong> Non : si les couleurs sont trop
          proches, c’est l’ensemble du code que le lecteur peine à binariser, bien au-delà de ce que la
          redondance peut rattraper. Voyez notre guide pour{' '}
          <Link to="/guide/personnaliser-qr-code-sans-perdre-la-lecture">
            personnaliser un QR code sans nuire à sa lecture
          </Link>
          .
        </li>
        <li>
          <strong>« On peut recouvrir 30 % du code. »</strong> Le chiffre concerne des octets, pas une
          surface, et suppose que rien d’autre n’est abîmé. En pratique, on se garde toujours une marge.
        </li>
      </ul>
    </GuideLayout>
  )
}
