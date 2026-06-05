import { Calendar, User, Package, Star } from "lucide-react"
import { useState } from "react"
import { rateInteraction } from "../../services/interactionService"

function HistoryCard({ interaction, isProducer }) {
  const formattedDate =
    new Date(
      interaction.created_at
    ).toLocaleString()
  const initialRating =
    isProducer
      ? interaction.buyer_rating
      : interaction.producer_rating
  const [rating, setRating] =
    useState(initialRating)
  const [saving, setSaving] =
    useState(false)
  const handleRate = async (
    value
  ) => {
    if (rating) {
      return
    }
    try {
      setSaving(true)
      const payload =
        isProducer
          ? {
              buyer_rating:
                value
            }
          : {
              producer_rating:
                value
            }
      await rateInteraction(
        interaction.id,
        payload
      )
      setRating(value)
    }
    catch (error) {
      console.error(error)
      alert(
        "No fue posible guardar la valoración"
      )
    }
    finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-white border border-border rounded-3xl p-6 shadow-soft">
      {/* PRODUCT */}
      <div className="flex items-center gap-3 mb-4">
        <Package
          size={20}
          className="text-leaf"
        />
        <div>
          <h3 className="font-bold text-earth">{interaction.product_title}</h3>
          <p className="text-sm text-textSoft">Producto consultado</p>
        </div>
      </div>
      {/* PERSON */}
      <div className="flex items-center gap-3 mb-4">
        <User
          size={20}
          className="text-leaf"
        />
        <div>
          {
            isProducer
              ? (
                <>
                  <p className="font-medium text-earth">{interaction.buyer_name}</p>
                  <p className="text-sm text-textSoft">Comprador interesado</p>
                </>
              )
              : (
                <>
                  <p className="font-medium text-earth">{interaction.producer_name}</p>
                  <p className="text-sm text-textSoft">Productor contactado</p>
                </>
              )
          }
        </div>
      </div>
      {/* DATE */}
      <div className="flex items-center gap-3 mb-6">
        <Calendar
          size={20}
          className="text-leaf"
        />
        <div>
          <p className="font-medium text-earth">
            {formattedDate}
          </p>
          <p className="text-sm text-textSoft">Fecha de interacción</p>
        </div>
      </div>
      {/* RATING */}
      <div className="border-t border-border pt-5">
        <p className="text-sm font-medium text-earth mb-3">
          {
            isProducer
              ? "Valorar comprador"
              : "Valorar productor"
          }
        </p>
        {
          !rating ? (
            <div className="flex items-center gap-1">
              {
                [1, 2, 3, 4, 5].map(
                  star => (
                    <button
                      key={star}
                      disabled={saving}
                      onClick={() =>
                        handleRate(star)
                      }
                    >
                      <Star size={24} className="text-gray-300 hover:text-yellow-400"/>
                    </button>
                  )
                )
              }
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              <p className="text-green-700 font-medium">Valoración registrada</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default HistoryCard