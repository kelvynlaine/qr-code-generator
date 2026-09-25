import { Link } from 'react-router-dom'
import { Mail, QrCode } from 'lucide-react'
import { openCookiePreferences } from '../../lib/cookiePreferences'
import { GUIDES, guidePath } from '../../data/guides'

const PRODUCT_LINKS = [
  { to: '/', label: 'Générateur' },
  { to: '/comment-ca-marche', label: 'Comment ça marche' },
  { to: '/cas-usage', label: 'Cas d’usage' },
  { to: '/faq', label: 'FAQ' },
]

const LEGAL_LINKS = [
  { to: '/contact', label: 'À propos et contact' },
  { to: '/mentions-legales', label: 'Mentions légales' },
  { to: '/politique-de-confidentialite', label: 'Politique de confidentialité' },
  { to: '/conditions-utilisation', label: 'Conditions d’utilisation' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-subtle">

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="flex items-center gap-2 font-semibold text-ink">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-600 text-white">
              <QrCode aria-hidden="true" className="h-5 w-5" />
            </span>
            QR Studio
          </p>
          <p className="mt-3 max-w-sm text-sm text-muted">
            Le générateur de QR codes personnalisés, gratuit et sans inscription. Tout est généré
            dans votre navigateur : aucune donnée n’est envoyée sur nos serveurs.
          </p>
        </div>

        <nav aria-label="Liens du produit">
          <h2 className="text-sm font-semibold text-ink">Le produit</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {PRODUCT_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition-colors duration-150 hover:text-accent-600">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Guides">
          <h2 className="text-sm font-semibold text-ink">
            <Link to="/guides" className="transition-colors duration-150 hover:text-accent-600">
              Guides
            </Link>
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {GUIDES.map((guide) => (
              <li key={guide.slug}>
                <Link to={guidePath(guide.slug)} className="transition-colors duration-150 hover:text-accent-600">
                  {guide.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Informations légales">
          <h2 className="text-sm font-semibold text-ink">Informations</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {LEGAL_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition-colors duration-150 hover:text-accent-600">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={openCookiePreferences}
                className="text-left transition-colors duration-150 hover:text-accent-600"
              >
                Préférences cookies
              </button>
            </li>
            <li>
              <a
                href="mailto:kelvyn.off@gmail.com"
                className="inline-flex items-center gap-1.5 transition-colors duration-150 hover:text-accent-600"
              >
                <Mail aria-hidden="true" className="h-4 w-4" />
                kelvyn.off@gmail.com
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} QR Studio — édité par Kelvyn Laine.
          </p>
        </div>
      </div>
    </footer>
  )
}
