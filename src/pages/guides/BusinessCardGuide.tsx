import { Link } from 'react-router-dom'
import { GuideLayout } from '../../components/Guides/GuideLayout'
import { AdUnit } from '../../components/Ads/AdUnit'
import { AD_SLOTS } from '../../lib/adsense'

const VCARD_EXAMPLE = `BEGIN:VCARD
VERSION:3.0
N:Martin;Claire;;;
FN:Claire Martin
ORG:Atelier Martin Architecture
TITLE:Architecte DPLG
TEL;TYPE=CELL:+33612345678
EMAIL:claire@martin-archi.fr
URL:https://martin-archi.fr
END:VCARD`

export function BusinessCardGuide() {
  return (
    <GuideLayout slug="qr-code-carte-de-visite">
      <h2 id="options">Trois façons de partager vos coordonnées</h2>
      <p>
        Avant de dessiner quoi que ce soit, il faut décider de ce que le code va déclencher chez la personne
        qui le scanne. Trois approches existent, et chacune a sa logique :
      </p>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Contenu encodé</th>
              <th scope="col">Ce qui se passe au scan</th>
              <th scope="col">Modifiable après impression</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lien vers une page de contact ou un portfolio</td>
              <td>La page s’ouvre dans le navigateur</td>
              <td>Oui, en modifiant la page</td>
            </tr>
            <tr>
              <td>Fiche vCard</td>
              <td>Le téléphone propose d’ajouter le contact au répertoire</td>
              <td>Non, les données sont figées dans le code</td>
            </tr>
            <tr>
              <td>Numéro de téléphone ou adresse e-mail</td>
              <td>L’appel ou un nouveau message est prêt à partir</td>
              <td>Non</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Il n’y a pas de mauvais choix, mais un choix adapté à votre situation : un indépendant qui change
        rarement de numéro n’a pas les mêmes besoins qu’un salarié dont le poste évoluera dans deux ans.
      </p>

      <h2 id="lien">Option 1 : un lien vers votre page de contact</h2>
      <p>
        C’est l’option la plus souple. Le code pointe vers une page de votre site — par exemple{' '}
        <em>martin-archi.fr/contact</em> — qui présente vos coordonnées, vos réalisations et un moyen de
        prendre rendez-vous. Si votre numéro change, vous modifiez la page ; les cartes déjà distribuées
        restent valables. Notre guide{' '}
        <Link to="/guide/qr-code-statique-ou-dynamique">QR code statique ou dynamique</Link> détaille
        pourquoi une adresse sur votre propre domaine est le choix le plus durable.
      </p>
      <p>
        Une astuce permet de combiner le meilleur des deux mondes : proposez sur cette page un bouton «
        Ajouter à mes contacts » qui télécharge un fichier <code>.vcf</code>. Le visiteur enregistre votre
        fiche d’un geste, et vous gardez la main sur son contenu. Autre avantage, l’adresse reste courte :
        31 caractères pour l’exemple ci-dessus, soit une grille de 33 × 33 modules même en correction
        maximale, très confortable sur un petit format.
      </p>

      <h2 id="vcard">Option 2 : la vCard encodée dans le code</h2>
      <p>
        Derrière le nom vCard se cache un format ouvert de carnet d’adresses, que savent importer les
        répertoires d’iOS et d’Android comme Outlook ou Thunderbird. Placée dans un QR code, la fiche se
        suffit à elle-même : pas besoin de réseau ni de site web, le téléphone la lit et propose de
        l’enregistrer. En contrepartie,
        tout est figé : un changement de numéro impose de réimprimer les cartes.
      </p>

      <h3>Créer une vCard avec QR Studio</h3>
      <p>
        Le générateur ne propose pas de formulaire dédié à la vCard. Il est pourtant possible d’en créer
        une, car l’onglet <strong>Texte</strong> encode exactement ce que vous saisissez, caractère pour
        caractère. Il suffit d’y coller une fiche au bon format, en l’adaptant à vos informations :
      </p>
      <pre className="mb-6 overflow-x-auto rounded-lg border border-border bg-subtle p-4 font-mono text-sm leading-relaxed text-ink">
        {VCARD_EXAMPLE}
      </pre>
      <ul>
        <li>
          <strong>BEGIN</strong>, <strong>VERSION</strong> et <strong>END</strong> encadrent la fiche ; la
          version 3.0 est la mieux reconnue par les téléphones ;
        </li>
        <li>
          <strong>N</strong> contient le nom puis le prénom, séparés par un point-virgule ;{' '}
          <strong>FN</strong> est le nom affiché ;
        </li>
        <li>
          <strong>ORG</strong> et <strong>TITLE</strong> indiquent l’entreprise et la fonction ;
        </li>
        <li>
          <strong>TEL</strong> reçoit le numéro au format international, sans espaces ;
        </li>
        <li>
          <strong>EMAIL</strong> et <strong>URL</strong> complètent la fiche.
        </li>
      </ul>
      <p>
        Gardez une information par ligne, sans ligne vide. Le générateur encode le texte en UTF-8, que
        les téléphones récents décodent sans difficulté : les accents d’un nom comme « Hélène » passent.
        Chaque caractère accentué occupe toutefois deux octets et un émoji quatre, ce qui densifie le
        code ; réservez-les à ce qui en a vraiment besoin. Scannez ensuite
        le code avec l’appareil photo d’un iPhone et d’un Android : chacun doit proposer d’ajouter le contact,
        avec tous les champs au bon endroit.
      </p>

      <h3>Le vrai coût d’une vCard : la densité</h3>
      <p>
        Une fiche complète pèse vite plus de 200 caractères. L’exemple ci-dessus en compte 207, ce qui donne
        une grille de 57 × 57 modules en correction M, et de 77 × 77 en correction H. Imprimé sur 3 cm, cela
        représente des modules d’environ 0,46 mm dans le premier cas et 0,35 mm dans le second — en dessous
        du seuil de confort pour une lecture rapide. Réduite à l’essentiel (nom, mobile, e-mail), la même
        fiche tombe à 125 caractères et 49 × 49 modules en M.
      </p>
      <p>Pour une vCard sur carte de visite, trois règles en découlent :</p>
      <ul>
        <li>ne gardez que les champs utiles à la prise de contact ;</li>
        <li>
          baissez la correction à M ou Q dans la section <strong>Cadre et options avancées</strong> et
          renoncez au logo central, qui imposerait le niveau H ;
        </li>
        <li>donnez au code au moins 3 cm de côté, idéalement au verso de la carte.</li>
      </ul>
      <p>
        Le guide sur les{' '}
        <Link to="/guide/niveau-correction-erreur-qr-code">niveaux de correction d’erreur</Link> explique
        pourquoi ce compromis est ici justifié. Il existe aussi un format plus compact, le MECARD, qui tient
        sur une seule ligne et réduit sensiblement la taille du code ; il est reconnu par de nombreux
        lecteurs, mais sa prise en charge varie davantage : testez-le sur plusieurs téléphones avant de
        l’adopter.
      </p>

      <AdUnit slot={AD_SLOTS.inArticle} format="fluid" layout="in-article" minHeight={120} className="my-10" />

      <h2 id="action">Option 3 : un appel ou un e-mail en un scan</h2>
      <p>
        Pour un artisan, un dépanneur ou un commercial dont le métier commence par un coup de fil, le plus
        efficace est parfois de déclencher directement l’action. L’onglet <strong>Téléphone</strong> du
        générateur crée un code qui prépare l’appel : saisissez le numéro au format international, par
        exemple +33 6 12 34 56 78, les espaces sont retirés automatiquement. L’onglet{' '}
        <strong>E-mail</strong> ouvre un nouveau message déjà adressé à vous. Ces codes restent très courts,
        donc très faciles à lire, mais ils ne transmettent qu’une seule information et ne s’enregistrent pas
        dans le répertoire.
      </p>

      <h2 id="taille">Place et taille sur la carte</h2>
      <p>
        Une carte de visite standard mesure 85 × 55 mm. Pour un lien court, un code de 2,5 cm de côté se lit
        sans difficulté à distance de lecture ; pour une vCard, visez 3 cm ou davantage. Le verso est souvent
        le meilleur emplacement : il est plus dégagé, et le recto reste consacré à votre nom et à votre
        identité visuelle.
      </p>
      <p>Quelques contraintes d’impression à connaître avant d’envoyer le fichier :</p>
      <ul>
        <li>
          <strong>La marge de sécurité de l’imprimeur</strong> : gardez le code à au moins 4 mm du bord de
          coupe, faute de quoi un léger décalage du massicot peut rogner la marge claire.
        </li>
        <li>
          <strong>La zone de silence</strong> autour du code ne doit être traversée ni par un filet, ni par
          un aplat de couleur, ni par une photo.
        </li>
        <li>
          <strong>Les finitions</strong> : un pelliculage mat ne pose aucun problème, mais évitez la dorure
          à chaud et le vernis sélectif sur le code lui-même. Leur surface réfléchissante renvoie la lumière
          vers l’objectif et brouille la distinction entre modules clairs et foncés.
        </li>
        <li>
          <strong>Le papier</strong> : un papier texturé ou très absorbant peut faire baver l’encre sur des
          modules de moins d’un demi-millimètre.
        </li>
      </ul>

      <h2 id="design">Intégrer le code au graphisme</h2>
      <p>
        Un code aux couleurs de la carte paraît voulu plutôt que plaqué. Donnez aux modules la teinte
        dominante de votre identité visuelle, conservez un fond clair, et laissez l’indicateur de contraste du{' '}
        <Link to="/">générateur</Link> vous confirmer que la combinaison reste lisible. Donner aux trois
        carrés des coins la teinte de votre logo est une personnalisation discrète et élégante. Une courte
        légende sous le code, comme « Mes coordonnées » ou « Voir mes réalisations », indique ce qui attend
        la personne.
      </p>
      <p>
        Pour l’imprimeur, exportez en <strong>SVG</strong> : le fichier vectoriel reste parfaitement net
        quelle que soit la taille finale. Si votre prestataire exige une image, choisissez le PNG en 2048 px
        plutôt qu’un JPG, dont la compression peut adoucir les contours des modules.
      </p>

      <h2 id="donnees">Une question de données personnelles</h2>
      <p>
        Tout ce qui est encodé peut être lu par n’importe qui tenant la carte en main, et enregistré sans
        votre intervention. Limitez-vous à ce que vous seriez prêt à voir circuler librement : un numéro
        professionnel plutôt que personnel, une adresse de bureau plutôt que votre domicile. Dans une
        entreprise, vérifiez auprès de l’employeur les coordonnées à faire figurer, surtout si les cartes
        sont destinées à être distribuées en grand nombre sur un salon.
      </p>

      <h2 id="check-list">Check-list avant le bon à tirer</h2>
      <ol>
        <li>Le type de contenu (lien, vCard, téléphone) correspond à l’usage de la carte.</li>
        <li>Chaque champ a été relu : une coquille sera imprimée des centaines de fois.</li>
        <li>Le code mesure au moins 2,5 cm, ou 3 cm pour une vCard, et respecte la marge de coupe.</li>
        <li>Aucune finition brillante ou métallisée ne recouvre le code.</li>
        <li>Une épreuve imprimée à taille réelle a été scannée par un iPhone et un Android.</li>
        <li>Le fichier transmis à l’imprimeur est le SVG, ou à défaut un PNG haute résolution.</li>
      </ol>
      <p>
        Pour affiner le dimensionnement, consultez notre guide{' '}
        <Link to="/guide/taille-qr-code-impression">quelle taille pour un QR code imprimé</Link>.
      </p>
    </GuideLayout>
  )
}
