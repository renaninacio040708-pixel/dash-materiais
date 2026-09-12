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
      className="group relative flex flex-col justify-between border-2 border-ink bg-concrete p-5 transition-colors hover:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-concrete"
    >
      <div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-steel group-hover:text-orange">
          {product.category}
        </span>
        <h3 className="font-display mt-3 text-base font-bold leading-snug group-hover:text-concrete sm:text-lg">
          {product.name}
        </h3>
      </div>

      <div className="mt-6 flex items-center justify-between border-t-2 border-ink/10 pt-4 group-hover:border-concrete/20">
        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-ink group-hover:text-concrete">
          Comprar na Shopee
        </span>
        <ArrowUpRight
          size={20}
          className="shrink-0 text-ink transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-orange"
        />
      </div>
    </motion.a>
  )
}
