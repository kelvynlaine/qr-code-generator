import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Injecte le code AdSense dans le <head> de toutes les pages (donc aussi du HTML
 * pré-rendu) : balise de validation du compte + script adsbygoogle. Ce script
 * charge aussi le message de consentement RGPD publié dans AdSense. Sans Publisher
 * ID valide (développement, clone du dépôt), rien n'est injecté.
 */
function adsense(clientId: string): Plugin {
  return {
    name: 'adsense-head',
    transformIndexHtml() {
      if (!clientId.startsWith('ca-pub-')) return []
      return [
        { tag: 'meta', attrs: { name: 'google-adsense-account', content: clientId }, injectTo: 'head' },
        {
          tag: 'script',
          attrs: {
            async: true,
            src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`,
            crossorigin: 'anonymous',
          },
          injectTo: 'head',
        },
      ]
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    plugins: [react(), tailwindcss(), adsense(env.VITE_ADSENSE_CLIENT_ID ?? '')],
  }
})
