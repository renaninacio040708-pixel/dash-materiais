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
          <span className="absolute left-0 top-0 border-b-2 border-r-2 border-ink bg-orange px-1.5 py-0.5 font-mono text-[10px] font-bold text-concrete sm:px-2 sm:py-1 sm:text-xs">
            -{status.discountPct}%
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-3 sm:p-5">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-steel group-hover:text-orange sm:text-[10px]">
            {product.category}
          </span>
          <h3 className="font-display mt-1.5 line-clamp-2 text-sm font-bold leading-snug group-hover:text-concrete sm:mt-2 sm:text-base">
            {product.name}
          </h3>
          <p className="mt-2 hidden text-sm leading-snug text-steel group-hover:text-concrete/70 sm:block">
            {product.description}
          </p>
          {status.price !== null && (
            <div className="mt-2 flex flex-wrap items-baseline gap-1.5 sm:mt-3 sm:gap-2">
              <span className="font-display text-base font-black group-hover:text-concrete sm:text-lg">
                {currency(status.price)}
              </span>
              {status.originalPrice && status.originalPrice > status.price && (
                <span className="font-mono text-[11px] text-steel line-through group-hover:text-concrete/50 sm:text-xs">
                  {currency(status.originalPrice)}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between border-t-2 border-ink/10 pt-3 group-hover:border-concrete/20 sm:mt-5 sm:pt-4">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-ink group-hover:text-concrete sm:text-xs">
            Ver produto
          </span>
          <ArrowUpRight
            size={18}
            className="shrink-0 text-ink transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-orange"
          />
        </div>
      </div>
    </MotionLink>
  )
}
