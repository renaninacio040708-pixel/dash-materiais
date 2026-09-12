import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

function getInitialIsDark() {
  if (typeof document === "undefined") return false
  return document.documentElement.classList.contains("dark")
}

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(getInitialIsDark)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light")
    } catch {
      // ignore (e.g. private browsing storage restrictions)
    }
  }, [isDark])

  return (
    <button
      type="button"
      onClick={() => setIsDark((v) => !v)}
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      aria-pressed={isDark}
      className="relative flex h-9 w-9 shrink-0 items-center justify-center border-2 border-ink text-ink transition-colors hover:border-orange hover:text-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
