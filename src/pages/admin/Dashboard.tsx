import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { supabase } from "@/lib/supabase"
import { useSession } from "@/hooks/useSession"
import { products } from "@/data/products"

interface RestockRow {
  id: string
  product_id: string
  product_name: string
  name: string
  email: string
  fulfilled: boolean
  created_at: string
}

const nameById = new Map(products.map((p) => [p.id, p.name]))

export function AdminDashboard() {
  const { session, loaded } = useSession()
  const [siteViews, setSiteViews] = useState(0)
  const [productViews, setProductViews] = useState<Record<string, number>>({})
  const [shopeeClicks, setShopeeClicks] = useState<Record<string, number>>({})
  const [restocks, setRestocks] = useState<RestockRow[]>([])
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    if (!supabase || !session) return

    async function load() {
      const [{ data: events }, { data: restockRows }] = await Promise.all([
        supabase!.from("analytics_events").select("type, product_id"),
        supabase!.from("restock_requests").select("*").order("created_at", { ascending: false }),
      ])

      let views = 0
      const pv: Record<string, number> = {}
      const sc: Record<string, number> = {}
      for (const e of events ?? []) {
        if (e.type === "site_view") views++
        if (e.type === "product_view" && e.product_id) pv[e.product_id] = (pv[e.product_id] ?? 0) + 1
        if (e.type === "shopee_click" && e.product_id) sc[e.product_id] = (sc[e.product_id] ?? 0) + 1
      }
      setSiteViews(views)
      setProductViews(pv)
      setShopeeClicks(sc)
      setRestocks((restockRows as RestockRow[]) ?? [])
      setDataLoaded(true)
    }

    load()
  }, [session])

  async function toggleFulfilled(row: RestockRow) {
    if (!supabase) return
    await supabase.from("restock_requests").update({ fulfilled: !row.fulfilled }).eq("id", row.id)
    setRestocks((prev) => prev.map((r) => (r.id === row.id ? { ...r, fulfilled: !r.fulfilled } : r)))
  }

  async function handleLogout() {
    await supabase?.auth.signOut()
  }

  if (loaded && !session) return <Navigate to="/admin/login" replace />

  const topProducts = Object.entries(productViews)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 md:py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-orange">/// Painel</span>
          <h1 className="font-display mt-2 text-4xl font-black uppercase">Analytics</h1>
        </div>
        <button
          onClick={handleLogout}
          className="border-2 border-ink px-4 py-2 font-mono text-xs uppercase tracking-widest hover:border-orange hover:text-orange"
        >
          Sair
        </button>
      </div>

      {!dataLoaded ? (
        <p className="mt-10 font-mono text-sm text-steel">Carregando...</p>
      ) : (
        <>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="border-2 border-ink p-5">
              <div className="font-display text-3xl font-black">{siteViews}</div>
              <div className="font-mono text-xs uppercase tracking-widest text-steel">Visitas ao site</div>
            </div>
            <div className="border-2 border-ink p-5">
              <div className="font-display text-3xl font-black">
                {Object.values(productViews).reduce((a, b) => a + b, 0)}
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-steel">Views de produto</div>
            </div>
            <div className="border-2 border-ink p-5">
              <div className="font-display text-3xl font-black">
                {Object.values(shopeeClicks).reduce((a, b) => a + b, 0)}
              </div>
              <div className="font-mono text-xs uppercase tracking-widest text-steel">Cliques p/ Shopee</div>
            </div>
          </div>

          <h2 className="font-display mt-12 text-2xl font-black uppercase">Produtos mais vistos</h2>
          <div className="mt-4 overflow-x-auto border-2 border-ink">
            <table className="w-full min-w-[500px] text-left font-mono text-sm">
              <thead>
                <tr className="border-b-2 border-ink">
                  <th className="p-3">Produto</th>
                  <th className="p-3">Views</th>
                  <th className="p-3">Cliques Shopee</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map(([id, count]) => (
                  <tr key={id} className="border-b border-ink/15">
                    <td className="p-3">{nameById.get(id) ?? id}</td>
                    <td className="p-3">{count}</td>
                    <td className="p-3">{shopeeClicks[id] ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="font-display mt-12 text-2xl font-black uppercase">Pedidos de reposição</h2>
          <div className="mt-4 overflow-x-auto border-2 border-ink">
            <table className="w-full min-w-[700px] text-left font-mono text-sm">
              <thead>
                <tr className="border-b-2 border-ink">
                  <th className="p-3">Produto</th>
                  <th className="p-3">Nome</th>
                  <th className="p-3">E-mail</th>
                  <th className="p-3">Data</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {restocks.map((r) => (
                  <tr key={r.id} className="border-b border-ink/15">
                    <td className="p-3">{r.product_name}</td>
                    <td className="p-3">{r.name}</td>
                    <td className="p-3">{r.email}</td>
                    <td className="p-3">{new Date(r.created_at).toLocaleDateString("pt-BR")}</td>
                    <td className="p-3">
                      <button
                        onClick={() => toggleFulfilled(r)}
                        className={`border-2 border-ink px-2 py-1 text-xs uppercase ${
                          r.fulfilled ? "bg-ink text-concrete" : ""
                        }`}
                      >
                        {r.fulfilled ? "Resolvido" : "Pendente"}
                      </button>
                    </td>
                  </tr>
                ))}
                {restocks.length === 0 && (
                  <tr>
                    <td className="p-3 text-steel" colSpan={5}>
                      Nenhum pedido ainda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
