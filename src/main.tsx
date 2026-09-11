import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SeoCollectorContext } from './lib/seo'

const container = document.getElementById('root')!

// Même arbre que le rendu serveur (entry-server.tsx), pour que l'hydratation corresponde.
const app = (
  <StrictMode>
    <SeoCollectorContext.Provider value={null}>
      <App />
    </SeoCollectorContext.Provider>
  </StrictMode>
)

// En production, chaque page est pré-générée : React réutilise le HTML existant
// (hydratation) au lieu de le reconstruire. En développement, le conteneur est vide.
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
