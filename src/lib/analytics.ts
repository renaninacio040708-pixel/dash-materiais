import { supabase } from "@/lib/supabase"

type EventType = "site_view" | "product_view" | "shopee_click"

export function track(type: EventType, productId?: string) {
  if (!supabase) return
  supabase
    .from("analytics_events")
    .insert({ type, product_id: productId ?? null, path: window.location.pathname })
    .then(() => {})
}
