/**
 * Pré-rendu statique des pages.
 *
 * Exécuté après le build client (dist/) et le build serveur (dist-ssr/). Chaque
 * route est rendue en HTML complet — texte, <title>, description, canonique,
 * données structurées — et écrite dans son propre fichier :
 *
 *   /                → dist/index.html
 *   /faq             → dist/faq.html
 *   /guide/<slug>    → dist/guide/<slug>.html
 *   route inconnue   → dist/404.html
 *
 * Les robots, dont celui d'AdSense, lisent ainsi le contenu réel de chaque page
 * sans exécuter de JavaScript. Dans le navigateur, React hydrate ce HTML.
 * Le sitemap est généré à partir de la même liste de routes.
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const { render, prerenderRoutes, SITE_URL } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
)

const template = await readFile(path.join(distDir, 'index.html'), 'utf8')
const ROOT_PLACEHOLDER = '<div id="root"></div>'
if (!template.includes(ROOT_PLACEHOLDER)) {
  throw new Error(`Gabarit inattendu : ${ROOT_PLACEHOLDER} introuvable dans dist/index.html.`)
}

const escapeHtml = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const outputFile = (routePath) => {
  if (routePath === '/') return 'index.html'
  if (routePath === '*') return '404.html'
  return `${routePath.slice(1)}.html`
}

function buildPage(routePath, html, seo) {
  if (!seo) throw new Error(`Aucune métadonnée pour ${routePath} : la page doit appeler useSeo().`)

  const url = `${SITE_URL}${routePath}`
  const head = [
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="robots" content="${seo.noIndex ? 'noindex, follow' : 'index, follow'}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
  ]
  if (!seo.noIndex) {
    head.push(`<meta property="og:url" content="${url}" />`, `<link rel="canonical" href="${url}" />`)
  }
  if (seo.jsonLd) {
    // `<` échappé : empêche une chaîne de fermer prématurément la balise <script>.
    const json = JSON.stringify(seo.jsonLd).replace(/</g, '\\u003c')
    head.push(`<script type="application/ld+json" data-seo="ssr">${json}</script>`)
  }

  // Remplacements par fonction : le HTML rendu peut contenir des « $ » que
  // String.replace interpréterait comme des motifs spéciaux.
  return template
    .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${escapeHtml(seo.title)}</title>`)
    .replace(/\s*<meta\s+name="description"[\s\S]*?\/>/, '')
    .replace(/\s*<meta\s+property="og:title"[\s\S]*?\/>/, '')
    .replace(/\s*<meta\s+property="og:description"[\s\S]*?\/>/, '')
    .replace('</head>', () => `  ${head.join('\n    ')}\n  </head>`)
    .replace(ROOT_PLACEHOLDER, () => `<div id="root">${html}</div>`)
}

for (const route of prerenderRoutes) {
  const { html, seo } = render(route.path === '*' ? '/404' : route.path)
  const file = path.join(distDir, outputFile(route.path))
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(file, buildPage(route.path, html, seo))
  const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
  console.log(`  ${route.path.padEnd(52)} → ${path.relative(distDir, file).padEnd(52)} ${words} mots`)
}

const lastmod = new Date().toISOString().slice(0, 10)
const urls = prerenderRoutes
  .filter((route) => route.sitemap)
  .map(
    ({ path: routePath, sitemap }) =>
      `  <url>\n    <loc>${SITE_URL}${routePath}</loc>\n    <lastmod>${lastmod}</lastmod>\n` +
      `    <changefreq>${sitemap.changefreq}</changefreq>\n    <priority>${sitemap.priority.toFixed(1)}</priority>\n  </url>`,
  )
await writeFile(
  path.join(distDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
)
console.log(`  sitemap.xml : ${urls.length} URL`)

await rm(ssrDir, { recursive: true, force: true })
