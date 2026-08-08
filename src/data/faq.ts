/**
 * Questions fréquentes, partagées entre la section de la page d'accueil,
 * la page /faq et les données structurées Schema.org (FAQPage).
 *
 * Les réponses sont volontairement en texte brut : elles doivent pouvoir être
 * sérialisées telles quelles dans le JSON-LD lu par Google.
 */
export interface FaqItem {
  question: string
  /** Un ou plusieurs paragraphes. */
  answer: string[]
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Le service est-il vraiment gratuit ?',
    answer: [
      'Oui. La génération, la personnalisation et le téléchargement sont gratuits et illimités, sans création de compte, sans filigrane et sans version « premium » qui débloquerait la haute résolution. Le site est financé par la publicité, affichée uniquement si vous l’acceptez.',
      'Aucune fonctionnalité n’est réservée à un compte payant : le SVG vectoriel et l’export 4096 px, que beaucoup de services facturent, sont disponibles dès la première visite.',
    ],
  },
  {
    question: 'Mes QR codes expirent-ils ?',
    answer: [
      'Non. Les QR codes générés ici sont statiques : votre contenu est encodé directement dans l’image, sans passer par un lien de redirection appartenant au service. Il n’y a donc aucun serveur intermédiaire susceptible de tomber, d’être désactivé ou de devenir payant. Vos codes fonctionneront tant que la page vers laquelle ils pointent existe.',
      'C’est une différence majeure avec les QR codes dits « dynamiques » proposés ailleurs : ceux-ci passent par une redirection contrôlée par l’éditeur du service, ce qui permet de modifier la destination après impression, mais rend vos supports dépendants de la survie et de la politique tarifaire de ce service. Ici, la contrepartie est claire : pour changer la destination, il faut générer un nouveau code.',
    ],
  },
  {
    question: 'Puis-je utiliser ces QR codes commercialement ?',
    answer: [
      'Oui, sans restriction ni redevance : cartes de visite, packaging, affichage, publicité, supports imprimés ou numériques. Aucune attribution n’est demandée.',
      'Une seule réserve, qui ne dépend pas de nous : vous devez détenir les droits sur le logo ou le visuel que vous importez au centre du code.',
    ],
  },
  {
    question: 'Quelle est la différence entre PNG, JPG et SVG ?',
    answer: [
      'Le PNG est le format polyvalent : compression sans perte, contours nets, transparence possible. C’est le bon choix par défaut, aussi bien pour le web que pour l’impression.',
      'Le JPG est plus léger, mais compressé avec perte et sans transparence. La compression peut créer de légers artefacts autour des modules, ce qui n’aide pas la lecture : réservez-le aux contextes où le poids du fichier prime réellement.',
      'Le SVG est vectoriel : il s’agrandit à l’infini sans jamais pixelliser. C’est le format à transmettre à un imprimeur ou à un graphiste, et le seul à privilégier pour une affiche, un kakémono ou une sérigraphie.',
    ],
  },
  {
    question: 'Comment garantir que mon QR code reste scannable avec des couleurs personnalisées ?',
    answer: [
      'Trois règles couvrent la quasi-totalité des cas. Gardez d’abord un contraste franc : les modules doivent être nettement plus foncés que le fond. L’indicateur affiché sous l’aperçu calcule ce rapport en direct et vous alerte dès qu’il devient risqué. N’inversez ensuite jamais clair et foncé : de nombreux lecteurs refusent les QR codes en négatif. Enfin, si vous ajoutez un logo, laissez la correction d’erreur au niveau H, qui tolère jusqu’à 30 % de surface masquée.',
      'Deux détails techniques font souvent la différence sur le terrain : conservez la marge blanche autour du code (la « quiet zone » fait partie du standard, la supprimer casse la détection), et respectez la distance de lecture — un QR code se scanne à environ dix fois sa largeur, donc un code de 3 cm se lit à 30 cm, pas à trois mètres.',
      'Dans tous les cas, testez le fichier exporté, pas l’aperçu à l’écran, avec au moins deux téléphones différents avant une impression en série.',
    ],
  },
  {
    question: 'Mes données sont-elles stockées ?',
    answer: [
      'Non. Tout est calculé dans votre navigateur : le contenu encodé, le logo importé et vos réglages ne quittent jamais votre appareil et ne sont enregistrés sur aucun serveur. Il n’y a d’ailleurs pas de backend auquel les envoyer. Fermer l’onglet suffit à tout effacer.',
      'Seules deux informations sont conservées localement, sur votre appareil : votre préférence de thème clair/sombre et votre réponse à la bannière cookies. Le détail figure dans notre politique de confidentialité.',
    ],
  },
  {
    question: 'Puis-je mettre mon logo au centre du QR code ?',
    answer: [
      'Oui. Importez une image PNG, JPG ou SVG de moins de 2 Mo : elle reste dans votre navigateur, comme le reste. Un halo de sécurité masque les modules situés sous le logo pour un rendu propre, et la correction d’erreur passe automatiquement au niveau maximum.',
      'Gardez le logo raisonnablement petit — au-delà d’environ 30 % de la largeur du code, même le niveau H ne suffit plus toujours, en particulier si le contenu encodé est long.',
    ],
  },
  {
    question: 'Quelle taille choisir pour l’impression ?',
    answer: [
      'Pour un support imprimé, exportez en SVG quand c’est possible : le vectoriel s’adapte à n’importe quelle dimension sans perte. Si vous devez fournir un fichier matriciel, visez au moins 300 points par pouce à la taille finale — soit environ 1024 px pour un code de 8 cm, et 2048 à 4096 px pour un grand format.',
      'Dimensionnez ensuite le code selon la distance de lecture, pas selon la place disponible : environ un dixième de la distance de scan prévue.',
    ],
  },
  {
    question: 'Pourquoi des publicités sur le site ?',
    answer: [
      'C’est ce qui permet de garder le service entièrement gratuit, sans compte et sans fonctionnalité verrouillée. Les emplacements ont été choisis pour ne jamais gêner le parcours de création : aucune publicité n’est collée aux boutons du générateur, il n’y a pas d’interstitiel avant le téléchargement, et l’ancre mobile est fermable et n’apparaît qu’une fois la zone de téléchargement dépassée.',
      'Si vous refusez les cookies publicitaires, le générateur reste strictement identique et pleinement utilisable.',
    ],
  },
]
