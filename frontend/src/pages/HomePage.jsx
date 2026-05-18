import AppLayout from "../layouts/AppLayout"
import StatsCard from "../components/ui/StatsCard"
import DashboardSectionCard from "../components/ui/DashboardSectionCard"
import DashboardRowItem from "../components/ui/DashboardRowItem"

import { Users, Store, Truck, ClipboardList } from "lucide-react"

function HomePage() {
  return (
    <AppLayout>

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-earth">Panel Principal</h1>
      </div>
      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Personas"
          value="5"
          growth="+2%"
          color="leaf"
          icon={<Users size={28} />}
        />

        <StatsCard
          title="Productos"
          value="5"
          growth="+5%"
          color="sun"
          icon={<Store size={28} />}
        />

        <StatsCard
          title="Pedidos Activos"
          value="3"
          growth="+12%"
          color="sky"
          icon={<ClipboardList size={28} />}
        />

        <StatsCard
          title="Entregas"
          value="1"
          growth="+4%"
          color="danger"
          icon={<Truck size={28} />}
        />
      </div>

      {/* DASHBOARD GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* PEDIDOS */}
        <DashboardSectionCard title="Pedidos recientes">

          <DashboardRowItem
            label="#3 Frijol negro"
            badge="Pendiente"
            badgeColor="yellow"
          />

          <DashboardRowItem
            label="#2 Maíz"
            badge="En proceso"
            badgeColor="brown"
          />

          <DashboardRowItem
            label="#1 Tomate"
            badge="Confirmado"
            badgeColor="blue"
          />

        </DashboardSectionCard>

        {/* STOCK */}
        <DashboardSectionCard title="Productos con bajo stock">

          <DashboardRowItem
            label="Chile pimiento"
            value="20 unidades restantes"
            badge="Bajo"
            badgeColor="red"
          />

        </DashboardSectionCard>

        {/* ENTREGAS */}
        <DashboardSectionCard title="Entregas pendientes">

          <DashboardRowItem
            label="Maíz (5)"
            value="14/06/2026"
            badge="Pendiente"
            badgeColor="yellow"
          />

        </DashboardSectionCard>

      </div>

    </AppLayout>
  )
}

export default HomePage