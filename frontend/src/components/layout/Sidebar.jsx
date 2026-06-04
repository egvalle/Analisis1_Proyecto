import { LayoutDashboard, ShoppingBasket, History, Star, Package, ShieldCheck, User } from "lucide-react"

import SidebarItem from "./SidebarItem"
import { useAuth } from "../../context/AuthContext"
import { ROLES } from "../../constants/roles"

function Sidebar({ isOpen, onClose }) {
  const { user } = useAuth()
  /*
    ROLES
  */
  const isBuyer =
    user?.roles?.includes(
      ROLES.BUYER
    )
  const isProducer =
    user?.roles?.includes(
      ROLES.PRODUCER
    )
  const isAdmin =
    user?.roles?.includes(
      ROLES.ADMIN
    )
  return (
    <>
      {/* OVERLAY */}
      {
        isOpen && (
          <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40 lg:hidden"/>
        )
      }
      {/* SIDEBAR */}
      <aside className={`fixed top-0 left-0 z-50 w-72 h-screen bg-white border-r border-border p-5 flex flex-col transform transition-transform duration-300 lg:translate-x-0 lg:static
          ${isOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }
      `}>
        {/* LOGO */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold">
            <span className="text-leaf">COSECHA</span><span className="text-danger ml-2">RED</span>
          </h1>
        </div>
        {/* NAVIGATION */}
        <nav className="flex flex-col gap-2">
          {/* DASHBOARD */}
          <SidebarItem
            to="/dashboard"
            icon={<LayoutDashboard size={20} />}
            label="Inicio"
          />
          {/* BUYER */}
          {
            isBuyer && (
              <>
                <SidebarItem
                  to="/catalogo"
                  icon={<ShoppingBasket size={20} />}
                  label="Catálogo"
                />
                <SidebarItem
                  to="/historial"
                  icon={<History size={20} />}
                  label="Historial"
                />
                <SidebarItem
                  to="/valoraciones"
                  icon={<Star size={20} />}
                  label="Valoraciones"
                />
              </>
            )
          }
          {/* PRODUCER */}
          {
            isProducer && (
              <>
                <SidebarItem
                  to="/mis-publicaciones"
                  icon={<Package size={20} />}
                  label="Mis publicaciones"
                />
                <SidebarItem
                  to="/ventas"
                  icon={<History size={20} />}
                  label="Historial ventas"
                />
              </>
            )
          }
          {/* ADMIN */}
          {
            isAdmin && (
              <SidebarItem
                to="/admin"
                icon={<ShieldCheck size={20} />}
                label="Administración"
              />
            )
          }
          {/* PROFILE */}
          <SidebarItem
            to="/perfil"
            icon={<User size={20} />}
            label="Perfil"
          />
        </nav>
      </aside>
    </>
  )
}

export default Sidebar