import { Link } from 'react-router-dom'
import { GuideLayout } from '../../components/Guides/GuideLayout'
import { AdUnit } from '../../components/Ads/AdUnit'
import { AD_SLOTS } from '../../lib/adsense'

export function StaticVsDynamicGuide() {
  return (
    <GuideLayout slug="qr-code-statique-ou-dynamique">
      <h2 id="statique">Ce qu’encode un QR code statique</h2>
      <p>
        Un QR code statique contient directement l’information finale : l’adresse de votre page, un
        numéro de téléphone, les identifiants d’un réseau Wi-Fi. Le téléphone lit l’image et agit,
        sans aucun intermédiaire. C’est le fonctionnement d’origine du format, et c’est ce que produit
        QR Studio.
      </p>
      <p>Cette simplicité a des conséquences très concrètes :</p>
      <ul>
        <li>
          <strong>il ne peut pas expirer</strong> : aucune infrastructure n’est nécessaire pour qu’il
          fonctionne, il marchera tant que la destination existe ;
        </li>
        <li>
          <strong>aucun tiers ne voit passer les scans</strong> de vos clients ;
        </li>
        <li>
          <strong>il est gratuit</strong>, sans abonnement, de façon définitive.
        </li>
      </ul>
      <p>
        Ses limites sont tout aussi nettes : son contenu est figé — changer la destination impose un
        nouveau code, donc une réimpression — et il ne fournit par lui-même aucune statistique de scan.
      </p>

      <h2 id="dynamique">Le principe du QR code dynamique</h2>
      <p>
        Un QR code dynamique n’encode pas votre adresse, mais une adresse courte qui appartient au
        service qui l’a généré. Au moment du scan, ce service redirige le visiteur vers la destination
        que vous avez configurée dans votre compte. D’où les deux avantages mis en avant : on peut
        modifier la destination après impression, et le service comptabilise les scans (date,
        localisation approximative, type d’appareil).
      </p>
      <p>
        La contrepartie est structurelle : <strong>chaque scan dépend de ce service</strong>. S’il
        cesse son activité, modifie ses conditions, ou si l’abonnement n’est pas renouvelé, la
        redirection peut s’arrêter — et tous les supports imprimés deviennent inutilisables en même
        temps. Certaines offres présentées comme gratuites reposent sur une période d’essai à l’issue
        de laquelle les codes créés sont désactivés. Avant de choisir, lisez précisément ce qui se
        passe à la fin de l’abonnement.
      </p>
      <p>
        S’y ajoutent une question de confidentialité, puisque le prestataire enregistre les scans de
        vos clients, et une limite technique : seuls les liens web peuvent être redirigés. Un code
        Wi-Fi, un numéro de téléphone ou un e-mail pré-rempli fonctionnent forcément en statique.
      </p>

      <AdUnit slot={AD_SLOTS.inArticle} format="fluid" layout="in-article" minHeight={120} className="my-10" />

      <h2 id="troisieme-voie">La troisième voie : un code statique vers votre propre domaine</h2>
      <p>
        Il existe une solution qui cumule les avantages des deux approches, et elle reste méconnue :
        générer un QR code <strong>statique</strong> qui pointe vers une adresse de votre propre site,
        par exemple <em>votre-site.fr/menu</em>.
      </p>
      <ul>
        <li>
          Pour modifier ce que voient les visiteurs, vous mettez à jour la page elle-même, ou vous
          configurez sur votre site une redirection vers une nouvelle destination. Le code imprimé,
          lui, ne change pas.
        </li>
        <li>
          Vous ne dépendez d’aucun prestataire : tant que votre nom de domaine est renouvelé, le code
          fonctionne.
        </li>
        <li>
          L’adresse est lisible et rassurante. Vous pouvez l’imprimer en clair sous le code, ce qui
          aide aussi vos clients à repérer une éventuelle fraude.
        </li>
      </ul>
      <p>
        Pour les statistiques, ajoutez des paramètres UTM à l’adresse encodée, par exemple{' '}
        <code>?utm_source=flyer&amp;utm_medium=qr</code> : votre outil de mesure d’audience distinguera
        les visites provenant de chaque support. Restez raisonnable sur la longueur, car chaque
        caractère ajouté densifie le code — notre guide sur la{' '}
        <Link to="/guide/taille-qr-code-impression">taille des QR codes imprimés</Link> détaille cet
        effet.
      </p>

      <h2 id="choisir">Comment choisir</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Situation</th>
              <th scope="col">Recommandation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Carte de visite, packaging, plaque gravée : support durable</td>
              <td>Statique, vers une adresse de votre domaine</td>
            </tr>
            <tr>
              <td>Accès Wi-Fi, numéro de téléphone, e-mail</td>
              <td>Statique (la redirection est impossible)</td>
            </tr>
            <tr>
              <td>Menu de restaurant qui change souvent</td>
              <td>Statique, vers une page de votre site que vous mettez à jour</td>
            </tr>
            <tr>
              <td>Campagne courte avec suivi détaillé et plusieurs destinations à tester</td>
              <td>Dynamique, en connaissant sa date de fin</td>
            </tr>
            <tr>
              <td>Aucun site web, mais besoin de modifier la destination</td>
              <td>Dynamique, après avoir vérifié les conditions de résiliation</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 id="resume">En résumé</h2>
      <p>
        Le QR code dynamique loue une fonctionnalité — la modification après impression — que vous
        pouvez souvent obtenir gratuitement avec votre propre nom de domaine. Il reste pertinent pour
        des campagnes ponctuelles ou en l’absence de site web, à condition de savoir exactement ce qu’il
        advient des codes le jour où l’abonnement s’arrête. Pour tout ce qui est imprimé pour durer, le
        statique reste le choix le plus sûr.
      </p>
    </GuideLayout>
  )
}
