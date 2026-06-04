import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../services/authService"
import { useAuth } from "../../context/AuthContext"

function LoginForm() {
  const navigate = useNavigate()
  const { login } = useAuth()
  /* FORM */
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  /* LOADING */
  const [loading, setLoading] = useState(false)
  /* ERROR */
  const [error, setError] = useState("")
  /* INPUT CHANGE */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError("")
      const response =
        await loginUser(formData)
      /* SAVE SESSION */
      login(
        response.user,
        response.access_token
      )
      /* REDIRECT */
      navigate("/dashboard")
    }
    catch (err) {
      setError(
        err.detail ||
        "Error al iniciar sesión"
      )
    }
    finally {
      setLoading(false)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="bg-white border border-border rounded-3xl p-8 shadow-soft w-full max-w-md">
      {/* TITLE */}
      <h1 className="text-3xl font-bold text-earth mb-2">Iniciar sesión</h1>
      <p className="text-textSoft mb-8">Accede a tu cuenta.</p>
      {/* ERROR */}
      {
        error && (
          <div className="mb-5 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
            {error}
          </div>
        )
      }
      {/* EMAIL */}
      <div className="mb-5">
        <label className="block mb-2 font-medium text-earth">Correo electrónico</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border border-border rounded-xl px-4 py-3 outline-none focus:border-leaf"/>
      </div>
      {/* PASSWORD */}
      <div className="mb-8">
        <label className="block mb-2 font-medium text-earth">Contraseña</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full border border-border rounded-xl px-4 py-3 outline-none focus:border-leaf"/>
      </div>
      {/* BUTTON */}
      <button type="submit" disabled={loading} className="w-full bg-leaf hover:bg-leafDark text-white py-3 rounded-xl font-semibold transition">
        {
          loading
            ? "Ingresando..."
            : "Iniciar sesión"
        }
      </button>
      {/* REGISTER */}
      <p className="mt-6 text-center text-sm text-textSoft">
        ¿No tienes cuenta?
        <Link to="/register" className="ml-2 text-leaf font-semibold">Crear cuenta</Link>
      </p>
    </form>
  )
}

export default LoginForm