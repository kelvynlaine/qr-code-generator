import { useId, useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

interface SectionProps {
  title: string
  icon: ReactNode
  defaultOpen?: boolean
  children: ReactNode
}

/** Panneau repliable du configurateur (accordéon accessible au clavier). */
export function Section({ title, icon, defaultOpen = false, children }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = useId()
  const buttonId = useId()

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex min-h-14 w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-150 hover:bg-subtle"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-600 dark:bg-accent-500/15 dark:text-accent-300">
            {icon}
          </span>
          <span className="flex-1 text-sm font-semibold text-ink">{title}</span>
          <ChevronDown
            aria-hidden="true"
            className={`h-4 w-4 text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </h3>
      {open && (
        <div id={panelId} role="region" aria-labelledby={buttonId} className="space-y-4 border-t border-border px-4 py-4">
          {children}
        </div>
      )}
    </div>
  )
}
