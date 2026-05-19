import { API_URL } from "../config/api"

/* REGISTER */
export const registerUser = async (
  formData
) => {
  /* ROLE IDS */
  const roleMap = {
    COMPRADOR: 1,
    PRODUCTOR: 2,
    ADMIN: 3
  }
  const role_ids =
    formData.roles.map(
      role => roleMap[role]
    )
  /* PAYLOAD */
  const payload = {
    full_name:
      formData.full_name,
    email:
      formData.email,
    phone:
      formData.phone,
    password:
      formData.password,
    role_ids
  }
  /* REQUEST */
  const response = await fetch(
    `${API_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify(payload)
    }
  )
  /* ERROR */
  if (!response.ok) {
    const errorData =
      await response.json()
    throw new Error(
      errorData.detail
      ||
      "Error al registrar usuario"
    )
  }
  /* SUCCESS */
  return await response.json()
}

/* LOGIN */
export const loginUser = async ( credentials ) => {
  const response = await fetch(
    `${API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify({
        email:
          credentials.email,
        password:
          credentials.password
      })
    }
  )
  /* ERROR */
  if (!response.ok) {
    const errorData =
      await response.json()
    throw new Error(
      errorData.detail
      ||
      "Credenciales inválidas"
    )
  }
  /* DATA */
  const data =
    await response.json()
  /* SAVE SESSION */
  localStorage.setItem(
    "token",
    data.access_token
  )
  localStorage.setItem(
    "user",
    JSON.stringify(data.user)
  )
  return data.user
}

/* LOGOUT */
export const logoutUser = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
}

/* GET CURRENT USER */
export const getCurrentUser = () => {
  const user = localStorage.getItem(
    "user"
  )
  return user
    ? JSON.parse(user)
    : null
}