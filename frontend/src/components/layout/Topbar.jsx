import { LogOut, Menu } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

function Topbar({ onMenuClick }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  /* Para regresar a la landing page al hacer logout */
  const handleLogout = () => {
    logout()
    navigate("/", {
      replace: true
    })
  }
  return (
    <header className="h-20 bg-white border-b border-border px-4 sm:px-6 flex items-center justify-between">
      {/* LEFT */}
      <div className="flex items-center">
        {/* MOBILE MENU */}
        <button onClick={onMenuClick} className="lg:hidden border border-border p-2 rounded-xl mr-4">
          <Menu size={22} />
        </button>
      </div>
      {/* RIGHT */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* USER */}
        <div className="hidden sm:block text-right">
          <p className="font-semibold text-earth">
            {user?.name || user?.full_name}
          </p>
          <p className="text-sm text-textSoft">
            {user?.email}
          </p>
        </div>
        {/* AVATAR */}
        <div className="w-11 h-11 rounded-full bg-leaf text-white flex items-center justify-center font-bold text-lg">
          {
            user?.name?.charAt(0)
            ||
            user?.full_name?.charAt(0)
          }
        </div>
        {/* LOGOUT */}
        <button onClick={handleLogout} className="border border-border hover:bg-red-50 hover:border-red-200 p-3 rounded-xl transition">
          <LogOut
            size={20}
            className="text-red-500"
          />
        </button>
      </div>
    </header>
  )
}

export default Topbar