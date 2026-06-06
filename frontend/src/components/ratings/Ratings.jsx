import { useEffect, useState } from "react"

import { useAuth } from "../../context/AuthContext"

import {
  getTopProducers,
  getTopBuyers
} from "../../services/interactionService"

import RatingCard from "./RatingCard"

function Ratings() {
  const { user } = useAuth()
  const [rankings, setRankings] =
    useState([])
  const [loading, setLoading] =
    useState(true)
  const loadRankings = async () => {
    try {
      const isProducer =
        user?.roles?.includes(
          "PRODUCTOR"
        )
      let data = []
      if (isProducer) {
        data =
          await getTopBuyers()
      }
      else {
        data =
          await getTopProducers()
      }
      setRankings(data)
    }
    catch (error) {
      console.error(error)
    }
    finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (user) {
      loadRankings()
    }
  }, [user])
  const isProducer =
    user?.roles?.includes(
      "PRODUCTOR"
    )
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-earth">
          {
            isProducer
              ? "Mejores compradores"
              : "Mejores productores"
          }
        </h1>
        <p className="mt-2 text-textSoft">
          {
            isProducer
              ? "Ranking de compradores mejor valorados por los productores."
              : "Ranking de productores mejor valorados por los compradores."
          }
        </p>
      </div>
      {/* LOADING */}
      {
        loading && (
          <div className="text-textSoft">Cargando ranking...</div>
        )
      }
      {/* EMPTY */}
      {
        !loading
        &&
        rankings.length === 0
        &&
        (
          <div className="bg-white border border-border rounded-3xl p-12 text-center">
            <h2 className="text-2xl font-bold text-earth">Sin valoraciones</h2>
            <p className="mt-3 text-textSoft">Todavía no existen suficientes valoraciones para generar el ranking.</p>
          </div>
        )
      }
      {/* RANKING */}
      {
        !loading
        &&
        rankings.length > 0
        &&
        (
          <div className="grid gap-5">
            {
              rankings.map(
                (item, index) => (
                  <RatingCard
                    key={item.user_id}
                    ranking={item}
                    position={
                      index + 1
                    }
                  />
                )
              )
            }
          </div>
        )
      }
    </div>
  )
}

export default Ratings