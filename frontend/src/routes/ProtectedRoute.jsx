import { Navigate } from "react-router-dom"

import { useAuth } from "../context/AuthContext"

function ProtectedRoute({ children, allowedRoles = [] }) {

  /*
    AUTH CONTEXT
  */

  const {

    user,

    isAuthenticated,

    loading

  } = useAuth()

  /*
    LOADING SESSION
  */

  if (loading) {

    return (

      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          text-textSoft
        "
      >

        Cargando sesión...

      </div>

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

  /*
    ACCESS GRANTED
  */

  return children

}

export default ProtectedRoute