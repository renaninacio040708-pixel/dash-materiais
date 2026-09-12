import { useEffect } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { Header } from "@/components/Header"
import { Home } from "@/pages/Home"
import { ProductPage } from "@/pages/ProductPage"
import { OutOfStock } from "@/pages/OutOfStock"
import { AdminLogin } from "@/pages/admin/Login"
import { AdminDashboard } from "@/pages/admin/Dashboard"
import { track } from "@/lib/analytics"

function PageViewTracker() {
  const location = useLocation()
  useEffect(() => {
    if (!location.pathname.startsWith("/admin")) track("site_view")
  }, [location.pathname])
  return null
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-concrete text-ink">
        <PageViewTracker />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produto/:id" element={<ProductPage />} />
          <Route path="/produtos-esgotados" element={<OutOfStock />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
