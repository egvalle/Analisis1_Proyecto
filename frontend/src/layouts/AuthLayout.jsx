import { Sprout } from "lucide-react"

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl grid lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center p-14 bg-gradient-to-br from-leaf to-leafDark text-white">
          <div className="max-w-md">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-8">
              <Sprout size={42} />
            </div>
            <h1 className="text-5xl font-bold leading-tight">COSECHA RED</h1>
            <p className="mt-6 text-lg text-white/90 leading-relaxed">
              Plataforma agrícola para conectar productores y compradores de forma directa, rápida y confiable.
            </p>
          </div>
        </div>
        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout