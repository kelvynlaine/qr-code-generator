import { Link } from 'react-router-dom'
import { GuideLayout } from '../../components/Guides/GuideLayout'
import { AdUnit } from '../../components/Ads/AdUnit'
import { AD_SLOTS } from '../../lib/adsense'

export function ReadableColorsGuide() {
  return (
    <GuideLayout slug="personnaliser-qr-code-sans-perdre-la-lecture">
      <h2 id="lecture">Comment un téléphone lit un QR code</h2>
      <p>
        Pour savoir ce que l’on peut modifier sans risque, il faut comprendre ce que cherche le
        lecteur. Il repère d’abord les trois grands carrés situés dans les coins, les{' '}
        <em>motifs de repérage</em>, souvent appelés « yeux » : ils permettent de localiser le code et
        de connaître son orientation. Il s’appuie ensuite, sur la plupart des versions, sur un ou
        plusieurs petits <em>motifs d’alignement</em> qui corrigent les déformations de perspective.
        Enfin, l’image est ramenée à deux valeurs : chaque module est classé clair ou foncé par rapport
        à un seuil.
      </p>
      <p>
        Toute personnalisation qui brouille l’une de ces trois étapes — repérage, géométrie, distinction
        entre clair et foncé — dégrade la lecture. Tout le reste est libre.
      </p>

      <h2 id="contraste">Le contraste avant la couleur</h2>
      <p>
        La séparation entre clair et foncé repose sur la <strong>luminosité</strong>, pas sur la teinte.
        Deux couleurs très différentes à l’œil, comme un rouge et un vert de luminosité proche, peuvent
        se transformer en deux gris presque identiques pour le lecteur. Le bon réflexe consiste donc à
        raisonner en luminosité : des modules nettement foncés sur un fond nettement clair.
      </p>
      <p>
        L’indicateur affiché sous l’aperçu du générateur calcule le rapport de contraste avec la
        formule des recommandations d’accessibilité WCAG. Nous l’interprétons ainsi : au-delà de 5:1,
        la lecture est confortable ; entre 3:1 et 5:1, elle devient sensible à l’éclairage et à la
        qualité d’impression ; en dessous de 3:1, un échec est probable. Il ne s’agit pas de seuils
        normalisés pour les QR codes, mais de repères volontairement prudents.
      </p>
      <ul>
        <li>
          <strong>Combinaisons sûres</strong> : bleu marine, vert forêt, bordeaux, violet foncé ou brun
          sur fond blanc ou crème.
        </li>
        <li>
          <strong>À éviter</strong> : modules jaunes, orange clair, rose pâle ou gris clair ; fonds
          saturés ou foncés.
        </li>
      </ul>

      <h2 id="inversion">Attention aux codes inversés</h2>
      <p>
        Un QR code aux modules clairs sur fond foncé est reconnu par de nombreuses applications récentes,
        mais pas par toutes. Pour un support imprimé destiné au grand public, qui scannera avec
        l’appareil qu’il a sous la main, gardez la configuration classique. Le générateur signale
        d’ailleurs cette inversion dès qu’elle apparaît.
      </p>

      <h2 id="degrades">Dégradés : c’est la couleur la plus claire qui compte</h2>
      <p>
        Un dégradé n’est jamais plus lisible que sa zone la plus claire. Un dégradé allant d’un indigo
        profond vers un violet moyen fonctionne très bien ; un dégradé qui s’éclaircit jusqu’au rose
        pâle crée une zone où le code disparaît littéralement. L’indicateur du générateur estime le
        contraste à partir de la teinte moyenne du dégradé : pour un dégradé très étendu, vérifiez aussi
        la couleur la plus claire, en la testant seule en mode « Uni ».
      </p>

      <AdUnit slot={AD_SLOTS.inArticle} format="fluid" layout="in-article" minHeight={120} className="my-10" />

      <h2 id="formes">Formes des modules et des yeux</h2>
      <p>
        Les modules ronds ou arrondis réduisent légèrement la surface foncée de chaque module. Avec un
        bon contraste et une taille suffisante, c’est sans conséquence ; sur un code très petit ou mal
        éclairé, les carrés classiques gardent un léger avantage.
      </p>
      <p>
        Les yeux sont la zone la plus sensible, puisque le lecteur les cherche en premier. On peut sans
        difficulté les arrondir ou leur donner une couleur distincte — c’est même l’une des
        personnalisations les plus élégantes —, à condition qu’ils restent foncés et bien délimités : un
        contour plein et un centre plein, séparés par une bande claire nette.
      </p>

      <h2 id="logo">Logo central et correction d’erreur</h2>
      <p>
        La correction d’erreur ajoute des données redondantes au code. Quatre niveaux existent : L
        permet de reconstituer environ 7 % des données, M environ 15 %, Q environ 25 % et H environ
        30 %. C’est ce mécanisme qui autorise un logo : il masque des modules que le lecteur
        reconstitue grâce à la redondance.
      </p>
      <p>Deux précisions évitent les mauvaises surprises :</p>
      <ul>
        <li>
          ces pourcentages portent sur les données, pas exactement sur la surface de l’image : un logo
          qui couvre 30 % du code n’est pas garanti lisible au niveau H ;
        </li>
        <li>un logo ne doit jamais toucher les yeux ni les motifs d’alignement.</li>
      </ul>
      <p>
        Le générateur passe automatiquement en niveau H lorsqu’un logo est importé et limite la surface
        masquée en fonction de ce niveau. Restez malgré tout sur des valeurs modérées du réglage « Taille
        du logo », conservez le halo de sécurité, et testez.
      </p>

      <h2 id="test">Le protocole de test</h2>
      <ol>
        <li>Exportez le fichier final — pas une capture d’écran de l’aperçu.</li>
        <li>Scannez-le avec l’appareil photo natif d’un iPhone et d’un téléphone Android.</li>
        <li>Testez-le imprimé, à la taille réelle, et pas seulement à l’écran.</li>
        <li>Faites varier la distance et l’angle de prise de vue.</li>
        <li>Essayez dans un éclairage défavorable : pénombre, reflets, lumière artificielle colorée.</li>
      </ol>
      <p>
        Si un seul de ces tests échoue, augmentez d’abord le contraste ou la taille avant de modifier
        quoi que ce soit d’autre : ce sont les deux leviers les plus efficaces. Pour dimensionner
        correctement le code, voyez notre guide{' '}
        <Link to="/guide/taille-qr-code-impression">quelle taille pour un QR code imprimé</Link>.
      </p>
    </GuideLayout>
  )
}
