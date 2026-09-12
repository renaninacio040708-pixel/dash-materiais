import { motion } from "motion/react"
import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import type { Product } from "@/data/products"
import { useProductStatuses } from "@/hooks/useProductStatuses"

const MotionLink = motion.create(Link)

const currency = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const { getStatus } = useProductStatuses()
  const status = getStatus(product.id)

  return (
    <MotionLink
      to={`/produto/${product.id}`}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: (index % 6) * 0.04 }}
      className="group flex flex-col border-2 border-ink bg-concrete transition-colors hover:bg-ink"
    >
      <div className="relative aspect-square w-full overflow-hidden border-b-2 border-ink bg-concrete-dim">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.style.display = "none"
          }}
        />
        {status.discountPct && (
          <span className="absolute left-0 top-0 border-b-2 border-r-2 border-ink bg-orange px-2 py-1 font-mono text-xs font-bold text-concrete">
            -{status.discountPct}%
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-steel group-hover:text-orange">
            {product.category}
          </span>
          <h3 className="font-display mt-2 text-base font-bold leading-snug group-hover:text-concrete">
            {product.name}
          </h3>
          <p className="mt-2 text-sm leading-snug text-steel group-hover:text-concrete/70">
            {product.description}
          </p>
          {status.price !== null && (
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-lg font-black group-hover:text-concrete">
                {currency(status.price)}
              </span>
              {status.originalPrice && status.originalPrice > status.price && (
                <span className="font-mono text-xs text-steel line-through group-hover:text-concrete/50">
                  {currency(status.originalPrice)}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between border-t-2 border-ink/10 pt-4 group-hover:border-concrete/20">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-ink group-hover:text-concrete">
            Ver produto
          </span>
          <ArrowUpRight
            size={20}
            className="shrink-0 text-ink transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-orange"
          />
        </div>
      </div>
    </MotionLink>
  )
}
