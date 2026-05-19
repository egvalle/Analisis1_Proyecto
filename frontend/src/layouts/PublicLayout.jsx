import { Link } from "react-router-dom"
import { Sprout } from "lucide-react"
import { useAuth } from "../context/AuthContext"

function PublicLayout({ children }) {
  const { isAuthenticated } = useAuth()
  return (
    <div className="min-h-screen bg-background">
      {/* TOPBAR */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <Sprout size={30} className="text-leaf"/>
            <div>
              <span className="text-2xl font-bold text-leaf">COSECHA</span><span className="text-2xl font-bold text-danger ml-2">RED</span>
            </div>
          </Link>
          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            {
              isAuthenticated ? (
                <Link to="/dashboard" className="bg-leaf hover:bg-leafDark text-white px-5 py-2.5 rounded-xl font-semibold transition">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-earth font-medium">Iniciar sesión</Link>
                  <Link to="/register" className="bg-leaf hover:bg-leafDark text-white px-5 py-2.5 rounded-xl font-semibold transition">Crear cuenta</Link>
                </>
              )
            }
          </div>
        </div>
      </header>
      {/* CONTENT */}
      <main>
        {children}
      </main>
    </div>
  )
}

export default PublicLayout