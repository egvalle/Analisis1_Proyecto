import { API_URL } from "../config/api"

/* CREATE INTERACTION */
export const createInteraction = async (
  interactionData
) => {

  const response = await fetch(
    `${API_URL}/interactions`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify({
        buyer_id:
          interactionData.buyer_id,

        producer_id:
          interactionData.producer_id,

        product_id:
          interactionData.product_id
      })
    }
  )

  if (!response.ok) {

    const errorData =
      await response.json()

    throw new Error(
      errorData.detail
      ||
      "Error al registrar interacción"
    )

  }

  return await response.json()

}

/* BUYER HISTORY */
export const getBuyerInteractions = async (
  buyerId
) => {

  const response = await fetch(
    `${API_URL}/interactions/buyer/${buyerId}`
  )

  if (!response.ok) {

    const errorData =
      await response.json()

    throw new Error(
      errorData.detail
      ||
      "Error al obtener historial"
    )

  }

  return await response.json()

}

/* PRODUCER HISTORY */
export const getProducerInteractions = async (
  producerId
) => {

  const response = await fetch(
    `${API_URL}/interactions/producer/${producerId}`
  )

  if (!response.ok) {

    const errorData =
      await response.json()

    throw new Error(
      errorData.detail
      ||
      "Error al obtener historial"
    )

  }

  return await response.json()

}