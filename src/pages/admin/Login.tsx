import { useState, type FormEvent } from "react"
import { Navigate } from "react-router-dom"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { useSession } from "@/hooks/useSession"

export function AdminLogin() {
  const { session, loaded } = useSession()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [sending, setSending] = useState(false)

  if (loaded && session) return <Navigate to="/admin" replace />

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!supabase) return
    setSending(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setSending(false)
    if (error) setError("E-mail ou senha inválidos.")
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-16">
      <span className="font-mono text-xs uppercase tracking-widest text-orange">/// Painel</span>
      <h1 className="font-display mt-2 text-3xl font-black uppercase">Entrar</h1>

      {!isSupabaseConfigured ? (
        <p className="mt-6 border-2 border-ink p-4 text-sm text-steel">
          Painel ainda não configurado (faltam as chaves do Supabase).
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3">
          <input
            required
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-ink bg-concrete px-3 py-3 text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-orange"
          />
          <input
            required
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-ink bg-concrete px-3 py-3 text-sm text-ink outline-none focus-visible:ring-2 focus-visible:ring-orange"
          />
          <button
            type="submit"
            disabled={sending}
            className="border-2 border-ink bg-ink px-4 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-concrete transition-colors hover:border-orange hover:bg-orange disabled:opacity-60"
          >
            {sending ? "Entrando..." : "Entrar"}
          </button>
          {error && <p className="font-mono text-xs text-orange">{error}</p>}
        </form>
      )}
    </div>
  )
}
