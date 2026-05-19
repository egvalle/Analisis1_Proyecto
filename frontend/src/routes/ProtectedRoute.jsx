import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, isAuthenticated, loading } = useAuth()
  /*
    LOADING
  */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">Cargando...</div>
    )
  }
  /*
    NO AUTH
  */
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  /*
    ROLE VALIDATION
  */
  if (allowedRoles.length > 0) {
    const hasAccess = allowedRoles.some(
      role => user?.roles?.includes(role)
    )
    if (!hasAccess) {
      return <Navigate to="/" replace />
    }
  }
  return children
}

export default ProtectedRoute