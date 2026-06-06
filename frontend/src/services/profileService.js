import { API_URL } from "../config/api"

export const getProfile = async (userId) => {
  const response = await fetch(
    `${API_URL}/auth/profile/${userId}`
  )

  if (!response.ok) {
    throw new Error(
      "Error al obtener perfil"
    )
  }

  return await response.json()
}