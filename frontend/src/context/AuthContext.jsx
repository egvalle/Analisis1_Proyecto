import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  /* USER */
  const [user, setUser] =
    useState(null)
  /* TOKEN */
  const [token, setToken] =
    useState(null)
  /* LOADING */
  const [loading, setLoading] =
    useState(true)
  /* LOAD SESSION */
  useEffect(() => {
    const storedUser =
      localStorage.getItem("user")
    const storedToken =
      localStorage.getItem("token")
    if ( storedUser && storedUser !== "undefined" ) {
      setUser(
        JSON.parse(storedUser)
      )
    }
    if ( storedToken ) {
      setToken(storedToken)
    }
    /* IMPORTANT */
    setLoading(false)
  }, [])
  /* LOGIN */
  const login = ( userData, accessToken ) => {
    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    )
    localStorage.setItem(
      "token",
      accessToken
    )
    setUser(userData)
    setToken(accessToken)
  }
  /* LOGOUT */
  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser(null)
    setToken(null)
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
/* CUSTOM HOOK */
export function useAuth() {
  return useContext(AuthContext)
}