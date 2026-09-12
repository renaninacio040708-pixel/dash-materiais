import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { categories, products, type Category } from "@/data/products"
import { ProductCard } from "@/components/ProductCard"
import { useProductStatuses } from "@/hooks/useProductStatuses"

export function Catalog() {
  const [active, setActive] = useState<Category | "Todos">("Todos")
  const { getStatus, loaded } = useProductStatuses()

  const available = useMemo(
    () => (loaded ? products.filter((p) => getStatus(p.id).inStock) : products),
    [loaded, getStatus],
  )
  const outOfStockCount = loaded ? products.length - available.length : 0

  const filtered = useMemo(
    () => (active === "Todos" ? available : available.filter((p) => p.category === active)),
    [active, available],
  )

  return (
    <section id="catalogo" className="mx-auto max-w-7xl px-5 py-16 md:py-24">
      <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-orange">
            /// Catálogo
          </span>
          <h2 className="font-display mt-2 text-4xl font-black uppercase leading-none md:text-5xl">
            Escolha o item
          </h2>
        </div>
        <p className="max-w-xs font-mono text-xs leading-relaxed text-steel">
          Veja os detalhes de cada item aqui no site — a compra em si é
          fechada na Shopee, com a segurança da plataforma.
        </p>
      </div>

      <div id="categorias" className="mb-10 flex flex-wrap items-center gap-2 scroll-mt-24">
        {(["Todos", ...categories] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`border-2 border-ink px-4 py-2 font-mono text-xs font-semibold uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-concrete ${
              active === cat
                ? "bg-orange text-concrete"
                : "bg-transparent text-ink hover:bg-ink hover:text-concrete"
            }`}
          >
            {cat}
          </button>
        ))}
        {outOfStockCount > 0 && (
          <Link
            to="/produtos-esgotados"
            className="ml-auto border-2 border-ink/30 px-4 py-2 font-mono text-xs uppercase tracking-widest text-steel transition-colors hover:border-orange hover:text-orange"
          >
            {outOfStockCount} esgotado{outOfStockCount > 1 ? "s" : ""}
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  )
}
