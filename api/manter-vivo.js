// Chamado 1x/dia por um cron do Vercel (ver vercel.json) só para manter o projeto Supabase
// "ativo" — no plano grátis, o Supabase pausa o banco depois de 7 dias sem nenhum acesso.
const URL_PADRAO = 'https://boxvbspiqpiwifqsrbao.supabase.co'
const CHAVE_PADRAO =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJveHZic3BpcXBpd2lmcXNyYmFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkyMjkwMzIsImV4cCI6MjEwNDgwNTAzMn0.97TU2JNxJvkwjdrZEihfNQMfuyPus1sxVep3w7jgXNA'

export default async function handler(req, res) {
  const url = process.env.VITE_SUPABASE_URL || URL_PADRAO
  const key = process.env.VITE_SUPABASE_ANON_KEY || CHAVE_PADRAO
  try {
    await fetch(`${url}/rest/v1/`, { headers: { apikey: key } })
    res.status(200).json({ ok: true, em: new Date().toISOString() })
  } catch (e) {
    res.status(200).json({ ok: false, erro: String(e) })
  }
}
