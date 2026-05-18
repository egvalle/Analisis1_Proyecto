import { Mail, Lock, LogIn } from "lucide-react"
import { Link } from "react-router-dom"

function LoginForm() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-earth">Iniciar sesión</h2>
        <p className="mt-2 text-textSoft">Accede a tu cuenta para continuar.</p>
      </div>
      {/* FORM */}
      <form className="space-y-5">
        {/* EMAIL */}
        <div>
          <label className="block text-sm font-medium mb-2">Correo electrónico</label>
          <div className="flex items-center gap-3 border border-border rounded-xl px-4 py-3 bg-background">
            <Mail
              size={18}
              className="text-textSoft"
            />
            <input type="email" placeholder="correo@ejemplo.com" className="w-full bg-transparent outline-none"/>
          </div>
        </div>
        {/* PASSWORD */}
        <div>
          <label className="block text-sm font-medium mb-2">Contraseña</label>
          <div className="flex items-center gap-3 border border-border rounded-xl px-4 py-3 bg-background">
            <Lock
              size={18}
              className="text-textSoft"
            />
            <input type="password" placeholder="••••••••" className="w-full bg-transparent outline-none" />
          </div>
        </div>
        {/* BUTTON */}
        <button className="w-full bg-leaf hover:bg-leafDark text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition">
          <LogIn size={20} />
          Ingresar
        </button>
      </form>
      {/* FOOTER */}
      <div className="mt-8 text-center text-sm text-textSoft">
        ¿No tienes cuenta?
        <Link to="/register" className="ml-2 text-leaf font-semibold hover:underline">
          Crear cuenta
        </Link>
      </div>
    </div>
  )
}

export default LoginForm