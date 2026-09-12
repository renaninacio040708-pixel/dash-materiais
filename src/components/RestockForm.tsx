import { useState, type FormEvent } from "react"
import { supabase } from "@/lib/supabase"

export function RestockForm({ productId, productName }: { productId: string; productName: string }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle")

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!supabase) {
      setStatus("error")
      return
    }
    setStatus("sending")
    const { error } = await supabase.from("restock_requests").insert({
      product_id: productId,
      product_name: productName,
      name,
      email,
    })
    setStatus(error ? "error" : "done")
  }

  if (status === "done") {
    return (
      <p className="border-2 border-ink bg-concrete-dim p-4 font-mono text-xs uppercase tracking-widest text-ink">
        Pedido registrado. Avisamos {email} assim que repor.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 border-2 border-ink p-4">
      <span className="font-mono text-xs font-semibold uppercase tracking-widest text-orange">
        Produto esgotado
      </span>
      <p className="text-sm text-steel">Deixe seu contato e avisamos quando repor este item.</p>

      <input
        required
        type="text"
        placeholder="Seu nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border-2 border-ink bg-concrete px-3 py-2 text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-orange"
      />
      <input
        required
        type="email"
        placeholder="Seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border-2 border-ink bg-concrete px-3 py-2 text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-orange"
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="border-2 border-ink bg-ink px-4 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-concrete transition-colors hover:border-orange hover:bg-orange disabled:opacity-60"
      >
        {status === "sending" ? "Enviando..." : "Pedir reposição"}
      </button>

      {status === "error" && (
        <p className="font-mono text-xs text-orange">Não deu pra enviar agora, tenta de novo.</p>
      )}
    </form>
  )
}
