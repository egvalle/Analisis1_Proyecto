import { useEffect, useState } from "react"

import { useAuth } from "../../context/AuthContext"

import {
  getBuyerInteractions,
  getProducerInteractions
} from "../../services/interactionService"

import HistoryCard from "./HistoryCard"

function History() {
  const { user } = useAuth()
  const [history, setHistory] =
    useState([])
  const [loading, setLoading] =
    useState(true)
  const loadHistory = async () => {
    try {
      let data = []
      const isProducer =
        user?.roles?.includes(
          "PRODUCTOR"
        )
      if (isProducer) {
        data =
          await getProducerInteractions(
            user.id
          )
      }
      else {
        data =
          await getBuyerInteractions(
            user.id
          )
      }
      setHistory(data)
    }
    catch (error) {
      console.error(error)
    }
    finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (user?.id) {
      loadHistory()
    }
  }, [user])
  if (loading) {
    return (
      <div>Cargando historial...</div>
    )
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-earth">Historial</h1>
        <p className="mt-2 text-textSoft">
          Registro de interacciones
          realizadas dentro de la plataforma.
        </p>
      </div>
      {/* EMPTY */}
      {
        history.length === 0 && (
          <div className="bg-white border border-border rounded-3xl p-12 text-center">
            <h2 className="text-2xl font-bold text-earth">Sin registros</h2>
            <p className="mt-3 text-textSoft">
              Todavía no existen
              interacciones registradas.
            </p>
          </div>
        )
      }
      {/* LIST */}
      {
        history.length > 0 && (
          <div className="grid gap-5">
            {
              history.map(item => (
                <HistoryCard
                  key={item.id}
                  interaction={item}
                  isProducer={
                    user?.roles?.includes(
                      "PRODUCTOR"
                    )
                  }
                />
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default History