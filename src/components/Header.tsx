import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/ThemeToggle"

const NAV = [
  { label: "Catálogo", href: "/#catalogo" },
  { label: "Categorias", href: "/#categorias" },
  { label: "Esgotados", href: "/produtos-esgotados" },
  { label: "Contato", href: "/#contato" },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-concrete/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="font-display text-2xl font-black tracking-tight">
          DASH<span className="text-orange">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-xs uppercase tracking-widest text-ink/80 transition-colors hover:text-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
            >
              {item.label}
            </a>
          ))}
          <a
            href="/#catalogo"
            className="border-2 border-ink bg-ink px-4 py-2 font-mono text-xs font-semibold uppercase tracking-widest text-concrete transition-colors hover:border-orange hover:bg-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2"
          >
            Ver Ofertas
          </a>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            className="p-2"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t-2 border-ink px-5 py-4 md:hidden">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-3 font-mono text-sm uppercase tracking-widest text-ink border-b border-ink/15"
            >
              {item.label}
            </a>
          ))}
          <a
            href="/#catalogo"
            onClick={() => setOpen(false)}
            className="mt-3 border-2 border-ink bg-ink px-4 py-3 text-center font-mono text-xs font-semibold uppercase tracking-widest text-concrete"
          >
            Ver Ofertas
          </a>
        </nav>
      )}
    </header>
  )
}
