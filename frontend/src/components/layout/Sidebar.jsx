import { NavLink } from "react-router-dom"
import { LayoutDashboard, Store, History, Star, User, Leaf, X } from "lucide-react"

function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {/* OVERLAY MOBILE */}
      {
        isOpen && (
          <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/40 z-40 lg:hidden"/>
        )
      }
      {/* SIDEBAR */}
      <aside className={`fixed lg:static top-0 left-0 z-50 w-72 min-h-screen bg-white border-r border-border shadow-soft p-6 transition-transform duration-300
          ${isOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"}
      `}>
        {/* TOP */}
        <div className="flex items-center justify-between mb-10">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center">
              <Leaf size={24} className="text-leaf"/>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold tracking-wide text-leaf">COSECHA</span><span className="text-2xl font-bold tracking-wide text-danger">RED</span>
              </div>
              <p className="text-sm text-textSoft">Comunidad La Esperanza</p>
            </div>
          </div>
          {/* CLOSE MOBILE */}
          <button onClick={() => setIsOpen(false)} className="lg:hidden p-2">
            <X size={22} />
          </button>
        </div>
        {/* NAV */}
        <nav className="flex flex-col gap-2">
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            label="Inicio"
            to="/"
          />
          <SidebarItem
            icon={<Store size={20} />}
            label="Catálogo"
            to="/catalog"
          />
          <SidebarItem
            icon={<History size={20} />}
            label="Historial"
            to="/history"
          />
          <SidebarItem
            icon={<Star size={20} />}
            label="Valoraciones"
            to="/reviews"
          />
          <SidebarItem
            icon={<User size={20} />}
            label="Perfil"
            to="/profile"
          />
        </nav>
      </aside>
    </>
  )
}

export default Sidebar

function SidebarItem({ icon, label, to }) {
  return (
    <NavLink to={to} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium
        ${isActive
          ? "bg-leaf text-white shadow-md"
          : "text-text hover:bg-sand"}
    `}>
      {icon}
      <span>
        {label}
      </span>
    </NavLink>
  )
}