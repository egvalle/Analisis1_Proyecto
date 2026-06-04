import { ShoppingBasket, Package, Star, TrendingUp } from "lucide-react"
import StatsCard from "./StatsCard"
import DashboardSectionCard from "./DashboardSectionCard"
import { useAuth } from "../../context/AuthContext"

import { ROLES } from "../../constants/roles"

function Dashboard() {
  const { user } = useAuth()
  /* ROLES */
  const isBuyer =
    user?.roles?.includes(
      ROLES.BUYER
    )
  const isProducer =
    user?.roles?.includes(
      ROLES.PRODUCER
    )
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-earth">
          Hola, {
            user?.name
            ||
            user?.full_name
          }
        </h1>
        <p className="mt-2 text-textSoft">Bienvenido a tu panel principal.</p>
      </div>
      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {
          isBuyer && (
            <>
              <StatsCard
                title="Compras realizadas"
                value="12"
                icon={<ShoppingBasket />}
              />
              <StatsCard
                title="Valoraciones"
                value="5"
                icon={<Star />}
                color="bg-sky"
              />
            </>
          )
        }
        {
          isProducer && (
            <>
              <StatsCard
                title="Productos publicados"
                value="18"
                icon={<Package />}
                color="bg-sun"
              />
              <StatsCard
                title="Ventas"
                value="32"
                icon={<TrendingUp />}
                color="bg-leaf"
              />
            </>
          )
        }
      </div>
      {/* SECTIONS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <DashboardSectionCard
          title="Actividad reciente"
        >
          <div className="space-y-4">
            <div className="border border-border rounded-xl p-4">Nueva compra registrada.</div>
            <div className="border border-border rounded-xl p-4">Producto actualizado.</div>
          </div>
        </DashboardSectionCard>
        <DashboardSectionCard
          title="Resumen"
        >
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-textSoft">Estado cuenta</span>
              <span className="font-semibold text-green-600">Activa</span>
            </div>
            <div className="flex justify-between">
              <span className="text-textSoft">Roles</span>
              <span className="font-semibold text-earth">
                {user?.roles?.join(", ")}
              </span>
            </div>
          </div>
        </DashboardSectionCard>
      </div>
    </div>
  )
}

export default Dashboard