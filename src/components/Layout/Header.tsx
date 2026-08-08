import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, Moon, QrCode, Sun, X } from 'lucide-react'

const NAV_LINKS = [
  { to: '/', label: 'Générateur' },
  { to: '/comment-ca-marche', label: 'Comment ça marche' },
  { to: '/cas-usage', label: 'Cas d’usage' },
  { to: '/faq', label: 'FAQ' },
]

/** Thème persistant, initialisé sur la préférence système. */
function useTheme() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return [dark, setDark] as const
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useTheme()

  // Bloque le défilement de la page tant que le menu mobile est ouvert.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 hover:bg-subtle ${
      isActive ? 'text-accent-600 dark:text-accent-300' : 'text-muted hover:text-ink'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold text-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-600 text-white">
            <QrCode aria-hidden="true" className="h-5 w-5" />
          </span>
          QR Studio
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={desktopLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDark(!dark)}
            aria-label={dark ? 'Activer le mode clair' : 'Activer le mode sombre'}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-muted transition-colors duration-150 hover:bg-subtle hover:text-ink"
          >
            {dark ? (
              <Sun aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Moon aria-hidden="true" className="h-5 w-5" />
            )}
          </button>

          <Link
            to="/"
            className="hidden min-h-11 items-center rounded-lg bg-accent-600 px-4 text-sm font-semibold text-white transition-colors duration-150 hover:bg-accent-700 md:inline-flex"
          >
            Créer mon QR code
          </Link>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-ink transition-colors duration-150 hover:bg-subtle md:hidden"
          >
            <Menu aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Drawer mobile */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Fermer le menu"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            className="absolute top-0 right-0 flex h-full w-72 max-w-[85%] flex-col gap-2 border-l border-border bg-bg p-4 shadow-xl"
            style={{ animation: 'slide-in 200ms ease-out' }}
          >
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
                autoFocus
                className="flex h-11 w-11 items-center justify-center rounded-lg text-ink hover:bg-subtle"
              >
                <X aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center rounded-lg px-3 text-base font-medium text-ink transition-colors duration-150 hover:bg-subtle"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="mt-2 flex min-h-12 items-center justify-center rounded-lg bg-accent-600 px-4 font-semibold text-white"
            >
              Créer mon QR code
            </Link>
          </div>
        </div>
      )}

      <style>{`@keyframes slide-in { from { transform: translateX(100%) } to { transform: translateX(0) } }`}</style>
    </header>
  )
}
