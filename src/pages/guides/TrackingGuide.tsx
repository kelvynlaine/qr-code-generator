import { Link } from 'react-router-dom'
import { GuideLayout } from '../../components/Guides/GuideLayout'
import { AdUnit } from '../../components/Ads/AdUnit'
import { AD_SLOTS } from '../../lib/adsense'
import { guidePath } from '../../data/guides'

export function TrackingGuide() {
  return (
    <GuideLayout slug="mesurer-scans-qr-code-utm">
      <h2 id="question">« Combien de personnes ont scanné mon QR code ? »</h2>
      <p>
        C’est la question qui suit presque toujours une campagne d’affichage ou de flyers. Les services de
        QR codes dynamiques y répondent avec un tableau de bord, au prix d’un abonnement et d’un
        intermédiaire entre vos clients et votre site. Pourtant, si votre QR code mène vers votre propre site
        web, vous disposez déjà de tout le nécessaire pour mesurer les visites qu’il génère, gratuitement et
        sans dépendre d’un tiers : les <strong>paramètres UTM</strong>.
      </p>

      <h2 id="utm">Le principe des paramètres UTM</h2>
      <p>
        Les paramètres UTM sont de courtes étiquettes ajoutées à la fin d’une URL. Elles n’ont aucun effet
        sur la page affichée, mais les outils de mesure d’audience — Google Analytics, Matomo, Plausible et
        la plupart des autres — les lisent et classent la visite en conséquence. Trois paramètres suffisent
        dans la grande majorité des cas :
      </p>
      <ul>
        <li>
          <strong>utm_source</strong> : le support précis, par exemple <code>flyer</code>,{' '}
          <code>affiche-vitrine</code> ou <code>carte-visite</code> ;
        </li>
        <li>
          <strong>utm_medium</strong> : la famille de canal. Utilisez toujours la même valeur pour vos QR
          codes, par exemple <code>qrcode</code>, afin de les regrouper ;
        </li>
        <li>
          <strong>utm_campaign</strong> : l’opération, par exemple <code>soldes-hiver</code> ou{' '}
          <code>salon-2026</code>.
        </li>
      </ul>
      <p>Une adresse prête à encoder ressemble alors à ceci :</p>
      <p>
        <code>https://exemple.fr/offre?utm_source=flyer&amp;utm_medium=qrcode&amp;utm_campaign=soldes-hiver</code>
      </p>
      <p>
        En créant un code par support — un pour les flyers, un pour l’affiche, un pour les cartes de visite —
        vous saurez exactement lequel fonctionne. Respectez une convention stricte : tout en minuscules, sans
        espaces ni accents, et toujours les mêmes mots. Pour les outils d’analyse, <code>Flyer</code> et{' '}
        <code>flyer</code> sont deux sources différentes.
      </p>

      <h2 id="densite">Le revers : une URL plus longue, un code plus dense</h2>
      <p>
        Chaque caractère ajouté à l’adresse rend le QR code plus dense : plus de modules, donc des modules
        plus petits à taille égale, et une lecture plus exigeante. L’URL ci-dessus fait plus de 80 caractères,
        contre une vingtaine sans les paramètres. Sur une affiche, ce n’est pas un problème ; sur une carte
        de visite ou une étiquette, cela peut le devenir. Trois solutions :
      </p>
      <ol>
        <li>
          <strong>raccourcir les valeurs</strong> : <code>utm_source=fly&amp;utm_medium=qr</code> fait le même
          travail ;
        </li>
        <li>
          <strong>agrandir le code</strong>, en suivant les recommandations du guide{' '}
          <Link to={guidePath('taille-qr-code-impression')}>quelle taille pour un QR code imprimé</Link> ;
        </li>
        <li>
          <strong>passer par une redirection sur votre propre domaine</strong>, décrite ci-dessous.
        </li>
      </ol>

      <AdUnit slot={AD_SLOTS.inArticle} format="fluid" layout="in-article" minHeight={120} className="my-10" />

      <h2 id="redirection">La redirection maison : le meilleur des deux mondes</h2>
      <p>
        Si vous gérez votre site, créez une adresse courte qui redirige vers la page finale avec ses
        paramètres UTM : par exemple <code>exemple.fr/flyer</code>. La plupart des hébergeurs, des CMS comme
        WordPress (avec une extension de redirection) et des plateformes comme Shopify ou Wix permettent de
        créer ce type de redirection en quelques clics.
      </p>
      <p>Cette approche cumule les avantages :</p>
      <ul>
        <li>le QR code reste court, donc peu dense et facile à lire ;</li>
        <li>les scans sont mesurés dans votre propre outil d’analyse ;</li>
        <li>
          vous pouvez <strong>changer la destination après impression</strong> en modifiant la redirection —
          ce qui est normalement l’argument principal des QR codes dynamiques payants ;
        </li>
        <li>
          aucun service tiers ne peut couper votre code : tant que votre domaine existe, il fonctionne.
        </li>
      </ul>
      <p>
        La seule contrainte est de conserver votre nom de domaine. Le guide{' '}
        <Link to={guidePath('qr-code-statique-ou-dynamique')}>QR code statique ou dynamique</Link> compare
        en détail cette méthode aux services d’abonnement.
      </p>

      <h2 id="lire">Lire les résultats</h2>
      <p>
        Dans Google Analytics 4, les visites issues de vos QR codes apparaissent dans le rapport{' '}
        <strong>Acquisition du trafic</strong>, en affichant la dimension « Source / support de la session »
        : vous y verrez par exemple la ligne <code>flyer / qrcode</code>. Dans Matomo, elles figurent dans
        le rapport des campagnes. Laissez passer quelques jours avant de conclure : un flyer distribué le
        samedi génère souvent ses visites tout au long de la semaine.
      </p>
      <p>
        Gardez en tête ce que vous mesurez réellement : les <strong>visites sur votre site</strong> issues du
        code, pas les scans eux-mêmes. Un visiteur qui refuse les cookies de mesure d’audience, ou qui ferme
        la page avant son chargement, ne sera pas compté. Les chiffres sont donc un minimum, suffisant pour
        comparer deux supports entre eux.
      </p>

      <h2 id="rgpd">Et le RGPD ?</h2>
      <p>
        Les paramètres UTM ne contiennent aucune donnée personnelle : ils décrivent le support, pas la
        personne. Les règles habituelles de votre outil d’analyse s’appliquent — en particulier le recueil
        du consentement si cet outil dépose des cookies non exemptés. N’ajoutez jamais dans une URL de QR
        code un identifiant de client, un e-mail ou un nom.
      </p>

      <h2 id="check-list">Check-list</h2>
      <ul>
        <li>un code distinct par support à comparer ;</li>
        <li>une convention de nommage en minuscules, appliquée partout ;</li>
        <li>une URL courte, ou une redirection sur votre domaine ;</li>
        <li>le lien testé apparaît bien dans votre outil d’analyse avant l’impression ;</li>
        <li>aucune donnée personnelle dans l’adresse encodée.</li>
      </ul>
    </GuideLayout>
  )
}
