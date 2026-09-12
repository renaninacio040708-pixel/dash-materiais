import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import type { Product } from "@/data/products"

export function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: (index % 6) * 0.04 }}
      className="group flex flex-col border-2 border-ink bg-concrete transition-colors hover:bg-ink"
    >
      <div className="aspect-square w-full overflow-hidden border-b-2 border-ink bg-concrete-dim">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.style.display = "none"
          }}
        />
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
        </div>

        <div className="mt-5 flex items-center justify-between border-t-2 border-ink/10 pt-4 group-hover:border-concrete/20">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-ink group-hover:text-concrete">
            Comprar na Shopee
          </span>
          <ArrowUpRight
            size={20}
            className="shrink-0 text-ink transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-orange"
          />
        </div>
      </div>
    </motion.a>
  )
}
