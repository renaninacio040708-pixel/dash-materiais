import { ArrowRight } from "lucide-react"

export function Footer() {
  return (
    <footer id="contato" className="border-t-2 border-ink">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <span className="font-display text-2xl font-black">
              DASH<span className="text-orange">.</span>
            </span>
            <p className="mt-3 font-mono text-xs leading-relaxed text-steel">
              Catálogo de materiais de construção. Todas as vendas são
              processadas com segurança direto na Shopee.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-orange">
              Loja Oficial
            </span>
            <a
              href="https://shopee.com.br/shop/600231337"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-ink bg-ink px-5 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-concrete transition-colors hover:border-orange hover:bg-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-concrete"
            >
              Ver Loja na Shopee
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        <div className="mt-12 border-t-2 border-ink pt-6 font-mono text-[11px] uppercase tracking-widest text-steel">
          DASH Materiais — catálogo independente, vendas via Shopee
        </div>
      </div>
    </footer>
  )
}
