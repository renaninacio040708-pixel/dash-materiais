import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { Catalog } from "@/components/Catalog"
import { Footer } from "@/components/Footer"

function App() {
  return (
    <div className="min-h-screen bg-concrete text-ink">
      <Header />
      <Hero />
      <Catalog />
      <Footer />
    </div>
  )
}

export default App
