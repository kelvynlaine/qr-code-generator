/**
 * Métadonnées des guides éditoriaux, partagées par la page d'index, la mise en
 * page des articles, les routes et le sitemap généré au pré-rendu.
 */
export interface GuideMeta {
  slug: string
  title: string
  /** Balise meta description (≈ 150 caractères). */
  description: string
  /** Chapeau affiché sous le titre de l'article. */
  lead: string
  /** Résumé court pour les cartes. */
  excerpt: string
  readingMinutes: number
  publishedAt: string
  updatedAt: string
}

export const GUIDE_AUTHOR = 'Kelvyn Laine'

export const GUIDES: GuideMeta[] = [
  {
    slug: 'taille-qr-code-impression',
    title: 'Quelle taille pour un QR code imprimé ?',
    description:
      'Distance de lecture, taille des modules, marge blanche, résolution d’export : comment dimensionner un QR code pour une carte de visite, un flyer ou une affiche.',
    lead: 'Un QR code trop petit est la première cause d’échec sur les supports imprimés. Voici comment calculer la bonne taille, support par support, avant de lancer l’impression.',
    excerpt: 'La règle des dix, le rôle de la densité du code et les tailles recommandées par support.',
    readingMinutes: 7,
    publishedAt: '2026-09-11',
    updatedAt: '2026-09-11',
  },
  {
    slug: 'qr-code-statique-ou-dynamique',
    title: 'QR code statique ou dynamique : lequel choisir ?',
    description:
      'Fonctionnement, avantages et risques des QR codes statiques et dynamiques, et la solution pour modifier la destination d’un code déjà imprimé sans abonnement.',
    lead: 'Derrière la même image se cachent deux technologies très différentes. Le choix engage la durée de vie de tous vos supports imprimés — mieux vaut le faire en connaissance de cause.',
    excerpt: 'Pourquoi certains QR codes cessent de fonctionner, et comment garder la main sur la destination.',
    readingMinutes: 6,
    publishedAt: '2026-09-11',
    updatedAt: '2026-09-11',
  },
  {
    slug: 'personnaliser-qr-code-sans-perdre-la-lecture',
    title: 'Personnaliser un QR code sans nuire à sa lecture',
    description:
      'Couleurs, contraste, dégradés, formes des modules, logo et correction d’erreur : ce que l’on peut modifier sans risque sur un QR code, et comment le tester.',
    lead: 'Un QR code à vos couleurs inspire davantage confiance qu’un carré noir anonyme. À condition de savoir ce que le téléphone cherche dans l’image — et de ne pas le lui cacher.',
    excerpt: 'Comment un téléphone lit un QR code, et ce que cela implique pour les couleurs, les formes et le logo.',
    readingMinutes: 8,
    publishedAt: '2026-09-11',
    updatedAt: '2026-09-11',
  },
  {
    slug: 'securite-qr-code-quishing',
    title: 'QR codes et sécurité : se protéger du quishing',
    description:
      'Faux autocollants, courriers piégés, QR codes Wi-Fi : les arnaques par QR code expliquées, et les bonnes pratiques pour ceux qui scannent comme pour ceux qui impriment.',
    lead: 'Un QR code n’affiche pas sa destination avant d’être scanné. Cette opacité en fait un outil apprécié des escrocs, et impose quelques réflexes simples des deux côtés du code.',
    excerpt: 'Les arnaques les plus courantes et les précautions à prendre, que vous scanniez ou que vous imprimiez.',
    readingMinutes: 7,
    publishedAt: '2026-09-11',
    updatedAt: '2026-09-11',
  },
]

export const guidePath = (slug: string): string => `/guide/${slug}`

/** Date longue en français, calculée en UTC pour un rendu identique serveur et navigateur. */
export function formatGuideDate(isoDate: string): string {
  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeZone: 'UTC' }).format(
    new Date(`${isoDate}T00:00:00Z`),
  )
}
