import { Link } from "react-router-dom"
import { products } from "@/data/products"
import { useProductStatuses } from "@/hooks/useProductStatuses"
import { RestockForm } from "@/components/RestockForm"

export function OutOfStock() {
  const { getStatus, loaded } = useProductStatuses()
  const outOfStock = products.filter((p) => loaded && !getStatus(p.id).inStock)

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 md:py-16">
      <span className="font-mono text-xs uppercase tracking-widest text-orange">/// Esgotados</span>
      <h1 className="font-display mt-2 text-4xl font-black uppercase leading-none md:text-5xl">
        Produtos Esgotados
      </h1>
      <p className="mt-4 max-w-xl text-steel">
        Esses itens estão temporariamente fora de estoque na Shopee. Deixe seu contato e avisamos
        assim que repormos.
      </p>

      {!loaded ? (
        <p className="mt-10 font-mono text-sm text-steel">Carregando...</p>
      ) : outOfStock.length === 0 ? (
        <p className="mt-10 border-2 border-ink p-6 font-mono text-sm text-steel">
          Nenhum produto esgotado no momento — tudo disponível no{" "}
          <Link to="/" className="text-orange underline">
            catálogo
          </Link>
          .
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {outOfStock.map((product) => (
            <div key={product.id} className="flex flex-col border-2 border-ink">
              <div className="flex gap-4 p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-24 w-24 shrink-0 border-2 border-ink object-cover grayscale"
                />
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-steel">
                    {product.category}
                  </span>
                  <Link to={`/produto/${product.id}`} className="block">
                    <h3 className="font-display mt-1 text-base font-bold leading-snug hover:text-orange">
                      {product.name}
                    </h3>
                  </Link>
                </div>
              </div>
              <div className="border-t-2 border-ink p-4">
                <RestockForm productId={product.id} productName={product.name} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
