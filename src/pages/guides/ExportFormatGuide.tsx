import { Link } from 'react-router-dom'
import { GuideLayout } from '../../components/Guides/GuideLayout'
import { AdUnit } from '../../components/Ads/AdUnit'
import { AD_SLOTS } from '../../lib/adsense'
import { guidePath } from '../../data/guides'

export function ExportFormatGuide() {
  return (
    <GuideLayout slug="format-qr-code-png-jpg-svg">
      <h2 id="enjeu">Le format, une décision qui se voit à l’impression</h2>
      <p>
        À l’écran, un QR code exporté en PNG, en JPG ou en SVG paraît identique. La différence apparaît
        plus tard : bords flous sur une affiche, fond blanc disgracieux sur un visuel coloré, fichier
        refusé par l’imprimeur. Choisir le bon format dès l’export évite de refaire le travail — ou pire,
        de découvrir le problème sur mille exemplaires imprimés.
      </p>

      <h2 id="matriciel-vectoriel">Matriciel ou vectoriel : la distinction de base</h2>
      <p>
        Le <strong>PNG</strong> et le <strong>JPG</strong> sont des formats <em>matriciels</em> : l’image
        est une grille de pixels de taille fixe. Agrandie au-delà de sa résolution, elle se pixellise ou
        devient floue. Le <strong>SVG</strong> est un format <em>vectoriel</em> : il décrit les formes
        mathématiquement — « un carré ici, de telle taille ». Il peut être agrandi à l’infini sans aucune
        perte, d’une étiquette de 2 cm à une bâche de 3 mètres.
      </p>
      <p>
        Pour un QR code, cette distinction est plus importante que pour une photo : le téléphone doit
        distinguer nettement chaque module. Des bords baveux ou des pixels intermédiaires gris rendent la
        lecture plus difficile, surtout en petit format ou sous un éclairage faible.
      </p>

      <h2 id="comparatif">Les trois formats comparés</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Critère</th>
              <th scope="col">PNG</th>
              <th scope="col">JPG</th>
              <th scope="col">SVG</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Qualité</th>
              <td>Sans perte</td>
              <td>Avec perte (compression)</td>
              <td>Parfaite à toute taille</td>
            </tr>
            <tr>
              <th scope="row">Fond transparent</th>
              <td>Oui</td>
              <td>Non</td>
              <td>Oui</td>
            </tr>
            <tr>
              <th scope="row">Agrandissement</th>
              <td>Limité à la résolution exportée</td>
              <td>Limité, artefacts visibles</td>
              <td>Illimité</td>
            </tr>
            <tr>
              <th scope="row">Compatibilité</th>
              <td>Universelle</td>
              <td>Universelle</td>
              <td>Logiciels de PAO, navigateurs, Canva, Word récent</td>
            </tr>
            <tr>
              <th scope="row">Usage idéal</th>
              <td>Web, réseaux sociaux, bureautique</td>
              <td>Envoi rapide quand rien d’autre n’est accepté</td>
              <td>Impression professionnelle, grands formats</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="png">PNG : le choix par défaut</h2>
      <p>
        Le PNG conserve chaque pixel à l’identique et gère la transparence. C’est le format à privilégier
        pour un site web, une publication sur les réseaux sociaux, un document Word ou PowerPoint, ou une
        impression sur une imprimante de bureau. La seule question à se poser est celle de la{' '}
        <strong>résolution</strong> : un PNG doit être exporté assez grand pour la taille finale.
      </p>
      <p>
        La règle de l’imprimerie est de viser <strong>300 pixels par pouce</strong> (2,54 cm). Un code
        imprimé à 3 cm de côté demande donc environ 3 ÷ 2,54 × 300 ≈ 354 px ; un code de 10 cm, environ
        1 180 px. En pratique, l’export 1024 px du générateur couvre la plupart des usages courants, et
        les exports 2048 et 4096 px laissent de la marge pour les grands formats.
      </p>

      <h2 id="jpg">JPG : à éviter sauf contrainte</h2>
      <p>
        Le JPG a été conçu pour les photographies. Sa compression lisse les transitions et crée de légers
        halos autour des contours nets — exactement ce qu’un QR code n’aime pas. Il ne gère pas non plus la
        transparence : le fond sera toujours rempli. Il reste utile dans un cas précis : une plateforme ou
        un formulaire qui n’accepte que le JPG. Exportez alors en grande taille pour limiter les artefacts.
      </p>

      <AdUnit slot={AD_SLOTS.inArticle} format="fluid" layout="in-article" minHeight={120} className="my-10" />

      <h2 id="svg">SVG : le format des imprimeurs</h2>
      <p>
        Pour une affiche, un kakémono, un emballage ou tout document confié à un imprimeur professionnel, le
        SVG est le bon choix. Il s’ouvre dans Illustrator, Inkscape, Affinity Designer ou Figma, et peut
        être converti en PDF ou en EPS si l’imprimeur le demande. Le graphiste peut aussi changer une couleur
        pour l’aligner exactement sur la charte, sans dégrader le code.
      </p>
      <p>
        Une précaution : si vous ajoutez un <strong>logo importé en image</strong> (PNG ou JPG), ce logo
        reste matriciel à l’intérieur du SVG. Importez-le dans une résolution suffisante pour la taille
        d’impression prévue.
      </p>

      <h2 id="transparence">Le cas du fond transparent</h2>
      <p>
        L’option « Fond transparent » permet de poser le QR code directement sur un visuel. Elle n’est
        disponible qu’en PNG et en SVG. Elle impose une vigilance particulière : le code doit rester
        lisible sur la couleur réelle qui se trouvera derrière lui, et la <strong>marge blanche</strong>{' '}
        autour du code (la « zone de silence ») doit être préservée. Sur un fond chargé ou foncé, mieux
        vaut garder un fond clair uni. Le guide{' '}
        <Link to={guidePath('personnaliser-qr-code-sans-perdre-la-lecture')}>personnaliser un QR code sans
        nuire à sa lecture</Link> explique pourquoi.
      </p>

      <h2 id="resume">En résumé</h2>
      <ul>
        <li>
          <strong>Web, réseaux sociaux, bureautique</strong> : PNG en 1024 px ;
        </li>
        <li>
          <strong>impression maison ou petits formats</strong> : PNG en 2048 px ;
        </li>
        <li>
          <strong>imprimeur, grand format, emballage</strong> : SVG ;
        </li>
        <li>
          <strong>plateforme qui n’accepte que le JPG</strong> : JPG en grande taille, en dernier recours.
        </li>
      </ul>
      <p>
        Quel que soit le format, testez le fichier final, une fois mis en page, avant de lancer le tirage :
        la méthode est décrite dans le guide{' '}
        <Link to={guidePath('tester-qr-code-avant-impression')}>tester un QR code avant de l’imprimer</Link>.
      </p>
    </GuideLayout>
  )
}
