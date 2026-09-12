import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { products } from "@/data/products"

const stats = [
  { value: `${products.length}+`, label: "Itens no Catálogo" },
  { value: "Shopee", label: "Compra Garantida" },
  { value: "SBC", label: "Envio Rápido" },
]

export function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden border-b-2 border-ink">
      {/* grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, var(--color-ink) 0 1px, transparent 1px 80px), repeating-linear-gradient(0deg, var(--color-ink) 0 1px, transparent 1px 80px)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-14 md:pb-24 md:pt-20">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-5 inline-block border-2 border-ink bg-orange px-3 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-concrete"
        >
          Materiais de Construção
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-display max-w-4xl text-[13vw] font-black uppercase leading-[0.92] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Obra sem
          <br />
          enrolação<span className="text-orange">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mt-6 max-w-lg font-mono text-sm leading-relaxed text-steel md:text-base"
        >
          Vedação, hidráulica, corte, drenagem e ferragem — direto do estoque
          para sua obra. Escolha o item aqui, feche a compra com segurança na
          Shopee.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="mt-8"
        >
          <a
            href="#catalogo"
            className="inline-flex items-center gap-2 border-2 border-ink bg-ink px-7 py-4 font-mono text-sm font-semibold uppercase tracking-widest text-concrete transition-colors hover:border-orange hover:bg-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-concrete"
          >
            Ver Catálogo
            <ArrowRight size={16} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 grid grid-cols-1 divide-y-2 divide-ink border-2 border-ink sm:grid-cols-3 sm:divide-x-2 sm:divide-y-0"
        >
          {stats.map((s) => (
            <div key={s.label} className="px-3 py-4 text-center sm:px-6 sm:py-6">
              <div className="font-display text-2xl font-black sm:text-3xl">{s.value}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-steel sm:text-xs">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
