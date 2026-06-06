import { useEffect, useState } from "react"

import { ShoppingBasket, Package, Star, TrendingUp } from "lucide-react"

import StatsCard from "./StatsCard"
import DashboardSectionCard from "./DashboardSectionCard"

import { useAuth } from "../../context/AuthContext"

import { ROLES } from "../../constants/roles"

import { getDashboard } from "../../services/dashboardService"

function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] =
    useState(null)
  const [loading, setLoading] =
    useState(true)
  /* ROLES */
  const isBuyer =
    user?.roles?.includes(
      ROLES.BUYER
    )
  const isProducer =
    user?.roles?.includes(
      ROLES.PRODUCER
    )
  /* LOAD DASHBOARD */
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data =
          await getDashboard(
            user.id
          )
        setStats(data)
      }
      catch (error) {
        console.error(error)
      }
      finally {
        setLoading(false)
      }
    }
    if (user?.id) {
      loadDashboard()
    }
  }, [user])
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
                title="Interacciones realizadas"
                value={
                  loading
                    ? "..."
                    : stats?.purchases_count || 0
                }
                icon={<ShoppingBasket />}
              />
              <StatsCard
                title="Valoraciones recibidas"
                value={
                  loading
                    ? "..."
                    : stats?.ratings_count || 0
                }
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
                value={
                  loading
                    ? "..."
                    : stats?.products_count || 0
                }
                icon={<Package />}
                color="bg-sun"
              />
              <StatsCard
                title="Interesados"
                value={
                  loading
                    ? "..."
                    : stats?.interactions_count || 0
                }
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
            {
              isBuyer && (
                <div className="border border-border rounded-xl p-4">
                  Has realizado {
                    stats?.purchases_count || 0
                  } interacción(es).
                </div>
              )
            }
            {
              isProducer && (
                <div className="border border-border rounded-xl p-4">
                  Tus productos han generado {
                    stats?.interactions_count || 0
                  } interacción(es).
                </div>
              )
            }
          </div>
        </DashboardSectionCard>
        <DashboardSectionCard title="Resumen" >
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-textSoft">Estado cuenta</span>
              <span className="font-semibold text-green-600">Activa</span>
            </div>
            <div className="flex justify-between">
              <span className="text-textSoft">Roles</span>
              <span className="font-semibold text-earth">
                {
                  user?.roles?.join(", ")
                }
              </span>
            </div>
          </div>
        </DashboardSectionCard>
      </div>
    </div>
  )
}

export default Dashboard