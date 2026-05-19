import { NavLink } from "react-router-dom"

function SidebarItem({ to, icon, label }) {
  return (
    <NavLink to={to} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium
        ${isActive
          ? "bg-leaf text-white"
          : "text-earth hover:bg-leaf/10"
        }
    `}>
      {icon}
      <span>
        {label}
      </span>
    </NavLink>
  )
}

export default SidebarItem