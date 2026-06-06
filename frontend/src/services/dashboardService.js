import { API_URL } from "../config/api"

export const getDashboard = async (
  userId
) => {

  const response = await fetch(
    `${API_URL}/auth/dashboard/${userId}`
  )

  if (!response.ok) {

    throw new Error(
      "Error al obtener dashboard"
    )

  }

  return await response.json()

}