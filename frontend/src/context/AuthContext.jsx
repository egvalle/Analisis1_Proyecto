import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  /*
    USER STATE
  */
  const [user, setUser] = useState(null)
  /*
    TOKEN STATE
  */
  const [token, setToken] = useState(null)
  /*
    LOADING
  */
  const [loading, setLoading] = useState(true)
  /*
    LOAD SESSION
  */
  useEffect(() => {
    const storedToken =
      localStorage.getItem("token")
    const storedUser =
      localStorage.getItem("user")
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])
  /*
    LOGIN
  */
  const login = (userData, accessToken) => {
    localStorage.setItem(
      "token",
      accessToken
    )
    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    )
    setUser(userData)
    setToken(accessToken)
  }
  /*
    LOGOUT
  */
  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    setToken(null)
  }
  /*
    HELPERS
  */
  const isAuthenticated = !!token
  /*
    CONTEXT VALUE
  */
  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    logout
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
/*
  CUSTOM HOOK
*/
export function useAuth() {
  return useContext(AuthContext)
}