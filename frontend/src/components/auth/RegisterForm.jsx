import { User, Mail, Lock, UserPlus } from "lucide-react"

import { Link } from "react-router-dom"
import { ROLES } from "../../constants/roles"

function RegisterForm() {
  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-earth">Crear cuenta</h2>
        <p className="mt-2 text-textSoft">Regístrate para comenzar a usar Cosecha Red.</p>
      </div>
      {/* FORM */}
      <form className="space-y-5">
        {/* NAME */}
        <div>
          <label className="block text-sm font-medium mb-2">Nombre completo</label>
          <div className="flex items-center gap-3 border border-border rounded-xl px-4 py-3 bg-background">
            <User
              size={18}
              className="text-textSoft"
            />
            <input type="text" placeholder="Juan Pérez" className="w-full bg-transparent outline-none"/>
          </div>
        </div>
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
        {/* ROLE */}
        <div>
          <label className="block text-sm font-medium mb-2">Tipo de cuenta</label>
          <select className="w-full border border-border rounded-xl px-4 py-3 bg-background outline-none">
            <option value="">
              Selecciona una opción
            </option>
            <option value={ROLES.BUYER}>
              Comprador
            </option>
            <option value={ROLES.PRODUCER}>
              Productor
            </option>
          </select>
        </div>
        {/* PASSWORD */}
        <div>
          <label className="block text-sm font-medium mb-2">Contraseña</label>
          <div className="flex items-center gap-3 border border-border rounded-xl px-4 py-3 bg-background">
            <Lock
              size={18}
              className="text-textSoft"
            />
            <input type="password" placeholder="••••••••" className="w-full bg-transparent outline-none"/>
          </div>
        </div>
        {/* CONFIRM PASSWORD */}
        <div>
          <label className="block text-sm font-medium mb-2">Confirmar contraseña</label>
          <div className="flex items-center gap-3 border border-border rounded-xl px-4 py-3 bg-background">
            <Lock
              size={18}
              className="text-textSoft"
            />
            <input type="password" placeholder="••••••••" className="w-full bg-transparent outline-none"/>   
          </div>
        </div>
        {/* BUTTON */}
        <button className="w-full bg-leaf hover:bg-leafDark text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition">
          <UserPlus size={20} />
          Crear cuenta
        </button>
      </form>
      {/* FOOTER */}
      <div className="mt-8 text-center text-sm text-textSoft">
        ¿Ya tienes cuenta?
        <Link to="/login" className="ml-2 text-leaf font-semibold hover:underline">
          Iniciar sesión
        </Link>
      </div>
    </div>
  )
}

export default RegisterForm