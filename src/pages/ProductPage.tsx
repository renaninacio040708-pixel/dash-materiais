import { useEffect } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { products } from "@/data/products"
import { useProductStatuses } from "@/hooks/useProductStatuses"
import { track } from "@/lib/analytics"
import { RestockForm } from "@/components/RestockForm"

const currency = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

export function ProductPage() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id)
  const { getStatus, loaded } = useProductStatuses()

  useEffect(() => {
    if (product) track("product_view", product.id)
  }, [product])

  if (!product) return <Navigate to="/" replace />

  const status = getStatus(product.id)
  const hasPrice = loaded && status.price !== null
  const hasDiscount = hasPrice && status.originalPrice && status.originalPrice > (status.price ?? 0)

  function handleBuyClick() {
    track("shopee_click", product!.id)
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 md:py-16">
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-steel transition-colors hover:text-orange"
      >
        <ArrowLeft size={14} />
        Voltar ao catálogo
      </Link>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="aspect-square border-2 border-ink bg-concrete-dim">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-col">
          <span className="font-mono text-xs uppercase tracking-widest text-orange">
            {product.category}
          </span>
          <h1 className="font-display mt-2 text-3xl font-black leading-tight md:text-4xl">
            {product.name}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-steel">{product.description}</p>

          <div className="mt-6 border-t-2 border-ink pt-6">
            {hasPrice ? (
              <div className="flex flex-wrap items-end gap-3">
                <span className="font-display text-4xl font-black">{currency(status.price!)}</span>
                {hasDiscount && (
                  <>
                    <span className="font-mono text-sm text-steel line-through">
                      {currency(status.originalPrice!)}
                    </span>
                    <span className="border-2 border-orange bg-orange px-2 py-0.5 font-mono text-xs font-bold uppercase text-concrete">
                      {status.discountPct}% OFF
                    </span>
                  </>
                )}
              </div>
            ) : (
              <p className="font-mono text-sm uppercase tracking-widest text-steel">
                Ver preço atual na Shopee
              </p>
            )}
            {status.updatedAt && (
              <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-steel/70">
                Preço atualizado em {new Date(status.updatedAt).toLocaleDateString("pt-BR")}
              </p>
            )}
          </div>

          <div className="mt-6">
            {status.inStock ? (
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleBuyClick}
                className="inline-flex w-full items-center justify-center gap-2 border-2 border-ink bg-ink px-6 py-4 font-mono text-sm font-semibold uppercase tracking-widest text-concrete transition-colors hover:border-orange hover:bg-orange md:w-auto"
              >
                Comprar na Shopee
                <ArrowUpRight size={18} />
              </a>
            ) : (
              <RestockForm productId={product.id} productName={product.name} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
