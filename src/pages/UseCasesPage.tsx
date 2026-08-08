import { Link } from 'react-router-dom'
import { PageLayout } from '../components/Layout/PageLayout'
import { AdUnit } from '../components/Ads/AdUnit'
import { AD_SLOTS } from '../lib/adsense'
import { useSeo } from '../hooks/useSeo'

export function UseCasesPage() {
  useSeo({
    title: 'À quoi sert un QR code personnalisé ? 6 cas d’usage concrets — QR Studio',
    description:
      'Restaurant, carte de visite, événement, réseaux sociaux, packaging, Wi-Fi invité : comment utiliser un QR code personnalisé, avec les bonnes pratiques de taille, de placement et de test.',
  })

  return (
    <PageLayout
      title="À quoi sert un QR code personnalisé ?"
      lead="Un QR code noir et blanc fonctionne. Un QR code à vos couleurs, avec votre logo et une consigne claire, est nettement plus scanné — parce qu’il inspire confiance et qu’on comprend immédiatement ce qu’il y a derrière."
    >
      <h2 id="restaurants">Restaurants, cafés et commerces</h2>
      <p>
        C’est l’usage qui a fait entrer le QR code dans les habitudes. Un code sur la table ou en
        vitrine ouvre la carte, la carte des vins, la page d’avis Google ou le programme de fidélité.
        L’intérêt réel n’est pas d’économiser du papier : c’est de pouvoir modifier le contenu sans
        rien réimprimer. Le code pointe vers une page que vous maîtrisez, et cette page change autant
        de fois que nécessaire.
      </p>
      <p>
        En pratique, comptez au minimum 3 cm de côté pour un chevalet de table, ajoutez une consigne
        explicite (« Scannez pour voir la carte » fonctionne mieux que « Scannez-moi ») et évitez de
        placer le code sous un film plastique brillant : les reflets sont la première cause d’échec de
        scan en salle.
      </p>

      <h2 id="cartes-de-visite">Cartes de visite et signatures</h2>
      <p>
        Sur une carte de visite, le QR code remplace la saisie manuelle : il renvoie vers votre site,
        votre page de prise de rendez-vous, votre profil professionnel ou vos coordonnées complètes.
        L’espace disponible étant réduit, c’est le cas où la personnalisation compte le plus : un code
        aux couleurs de la carte, avec les yeux dans la teinte de votre logo, s’intègre au graphisme
        au lieu de le trouer.
      </p>
      <p>
        Attention à la taille minimale : en dessous de 2 cm, un code dense devient capricieux selon la
        qualité d’impression. Raccourcissez l’URL encodée — moins de caractères, moins de modules,
        donc des modules plus gros à taille égale.
      </p>

      <h2 id="evenements">Événements, affiches et billetterie</h2>
      <p>
        Affiches, flyers, kakémonos, projections en fin de conférence : le QR code transforme un
        support passif en point d’entrée. Programme, plan d’accès, billetterie, formulaire
        d’inscription, questionnaire de satisfaction — tout ce qui demanderait de retaper une adresse
        gagne à passer par un code.
      </p>
      <p>
        La règle de distance est ici déterminante : un QR code se scanne à environ dix fois sa
        largeur. Sur une affiche lue à trois mètres, il faut donc un code d’au moins 30 cm de côté.
        C’est la principale erreur constatée sur les supports grand format, où le code est souvent
        dimensionné pour l’esthétique et non pour l’usage. Exportez en SVG pour ces formats : le
        vectoriel reste net à n’importe quelle échelle.
      </p>

      <AdUnit slot={AD_SLOTS.inArticle} format="fluid" minHeight={120} className="my-10" />

      <h2 id="reseaux-sociaux">Réseaux sociaux et création de contenu</h2>
      <p>
        Un QR code en vitrine, sur un packaging, en fin de vidéo ou sur un stand de salon convertit une
        audience physique en audience en ligne. Il est souvent plus efficace de pointer vers une page
        de liens regroupant vos comptes que vers un réseau unique : le visiteur choisit la plateforme
        qu’il utilise déjà.
      </p>
      <p>
        Si le code apparaît dans une vidéo, laissez-le à l’écran au moins cinq secondes, sur fond fixe
        et sans animation : un lecteur a besoin de plusieurs images stables pour verrouiller le code.
      </p>

      <h2 id="packaging">Packaging, étiquettes et notices</h2>
      <p>
        Sur un emballage, la place est comptée et la réglementation impose déjà beaucoup de mentions.
        Le QR code déporte tout le reste : notice détaillée, tutoriel vidéo, composition, origine du
        produit, enregistrement de garantie, tri des déchets. Le contenu peut évoluer après
        l’impression, ce qui est précieux sur un packaging produit en grande série.
      </p>
      <p>
        Vérifiez le rendu sur le support réel avant lancement : un code imprimé sur carton brut, sur
        film transparent ou sur surface courbe ne se comporte pas comme un aplat blanc. Sur support
        difficile, montez la correction d’erreur au niveau H et augmentez la marge blanche autour du
        code — cette marge, dite <em>quiet zone</em>, fait partie du standard et son absence est une
        cause fréquente d’échec.
      </p>

      <h2 id="wifi">Accès Wi-Fi invité</h2>
      <p>
        Un QR code Wi-Fi connecte le visiteur sans qu’il ait à saisir un mot de passe de trente
        caractères. Très pratique en boutique, en cabinet, en location saisonnière ou en salle de
        réunion. Deux précautions : le mot de passe est encodé en clair dans l’image, donc le code ne
        s’affiche qu’à l’endroit où vous accepteriez d’afficher le mot de passe lui-même ; et si votre
        box propose un réseau invité séparé, utilisez-le plutôt que le réseau principal.
      </p>

      <h2 id="bonnes-pratiques">Ce qui fait vraiment la différence</h2>
      <p>
        Quel que soit le support, quatre facteurs déterminent le taux de scan : un contraste franc
        entre modules et fond, une taille adaptée à la distance de lecture, une consigne qui annonce
        ce qu’on obtient en scannant, et un test réel sur au moins deux téléphones avant diffusion. La
        personnalisation graphique vient après — elle augmente la confiance et la mémorisation, mais
        elle ne rattrape jamais un code trop petit ou trop pâle.
      </p>

      <p>
        <Link to="/">Créer mon QR code</Link> ou lire le guide{' '}
        <Link to="/comment-ca-marche">Comment ça marche</Link>.
      </p>
    </PageLayout>
  )
}
