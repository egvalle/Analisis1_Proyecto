import axios from "axios"


/*
  API BASE URL
*/

const API_URL = "http://localhost:8000/api/v1/auth"


/*
  REGISTER
*/

export const registerUser = async (userData) => {

  try {

    const response = await axios.post(

      `${API_URL}/register`,

      userData

    )

    return response.data

  }

  catch (error) {

    throw (

      error.response?.data ||

      {
        detail: "Error al registrar usuario"
      }

    )

  }

}


/*
  LOGIN
*/

export const loginUser = async (credentials) => {

  try {

    const response = await axios.post(

      `${API_URL}/login`,

      credentials

    )

    return response.data

  }

  catch (error) {

    throw (

      error.response?.data ||

      {
        detail: "Error al iniciar sesión"
      }

    )

  }

}