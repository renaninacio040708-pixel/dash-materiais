import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export interface LiveStatus {
  price: number | null
  originalPrice: number | null
  discountPct: number | null
  inStock: boolean
  updatedAt: string | null
}

const DEFAULT_STATUS: LiveStatus = {
  price: null,
  originalPrice: null,
  discountPct: null,
  inStock: true,
  updatedAt: null,
}

export function useProductStatuses() {
  const [statuses, setStatuses] = useState<Record<string, LiveStatus>>({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (!supabase) {
        setLoaded(true)
        return
      }
      const { data } = await supabase.from("product_status").select("*")
      if (cancelled) return
      const map: Record<string, LiveStatus> = {}
      for (const row of data ?? []) {
        map[row.id] = {
          price: row.price,
          originalPrice: row.original_price,
          discountPct: row.discount_pct,
          inStock: row.in_stock,
          updatedAt: row.updated_at,
        }
      }
      setStatuses(map)
      setLoaded(true)
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const getStatus = (id: string): LiveStatus => statuses[id] ?? DEFAULT_STATUS

  return { getStatus, loaded }
}
