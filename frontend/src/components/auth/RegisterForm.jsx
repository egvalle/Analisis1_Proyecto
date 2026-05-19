import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../../services/authService"

import { ROLES } from "../../constants/roles"

function RegisterForm() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    roles: []
  })
  /* INPUT CHANGE */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  /* ROLE CHANGE */
  const handleRoleChange = (role) => {
    const alreadySelected =
      formData.roles.includes(role)
    if (alreadySelected) {
      setFormData({
        ...formData,
        roles: formData.roles.filter(
          r => r !== role
        )
      })
    } else {
      setFormData({
        ...formData,
        roles: [
          ...formData.roles,
          role
        ]
      })
    }
  }
  /* SUBMIT */
  const navigate = useNavigate()
    const handleSubmit = async (e) => {
      e.preventDefault()
      /* VALIDATE ROLES */
      if (formData.roles.length === 0) {
        alert("Selecciona al menos un rol")
        return
      }
      try {
        await registerUser(formData)
        navigate("/login")
      } catch (err) {
        console.log(err)
        alert(
          err.detail ||
          "Error al registrar usuario"
        )
      }
    }
  return (
    <form onSubmit={handleSubmit} className="bg-white border border-border rounded-3xl p-8 shadow-soft w-full max-w-md">
      {/* TITLE */}
      <h1 className="text-3xl font-bold text-earth mb-2">Crear cuenta</h1>
      <p className="text-textSoft mb-8">
        Regístrate para comenzar a utilizar
        Cosecha Red.
      </p>
      {/* NAME */}
      <div className="mb-5">
        <label className="block mb-2 font-medium text-earth">Nombre completo</label>
        <input type="text" name="full_name" required value={formData.full_name} onChange={handleChange} className="w-full border border-border rounded-xl px-4 py-3 outline-none focus:border-leaf"/>
      </div>
      {/* EMAIL */}
      <div className="mb-5">
        <label className="block mb-2 font-medium text-earth">Correo electrónico</label>
        <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full border border-border rounded-xl px-4 py-3 outline-none focus:border-leaf"/>
      </div>
      {/* PHONE */}
      <div className="mb-5">
        <label className="block mb-2 font-medium text-earth">Teléfono</label>
        <input type="text" name="phone" required value={formData.phone} onChange={handleChange} className="w-full border border-border rounded-xl px-4 py-3 outline-none focus:border-leaf"/>
      </div>
      {/* PASSWORD */}
      <div className="mb-5">
        <label className="block mb-2 font-medium text-earth">Contraseña</label>
        <input type="password" name="password" required value={formData.password} onChange={handleChange} className="w-full border border-border rounded-xl px-4 py-3 outline-none focus:border-leaf"/>
      </div>
      {/* ROLES */}
      <div className="mb-8">
        <label className="block mb-3 font-medium text-earth">Tipo de cuenta</label>
        <div className="space-y-3">
          {/* BUYER */}
          <label className="flex items-center gap-3 border border-border rounded-xl p-4 cursor-pointer hover:border-leaf">
            <input type="checkbox"
              checked={
                formData.roles.includes(
                  ROLES.BUYER
                )
              }
              onChange={() =>
                handleRoleChange(
                  ROLES.BUYER
                )
              }
            />
            <div>
              <p className="font-semibold text-earth">Comprador</p>
              <p className="text-sm text-textSoft">Explorar y comprar productos.</p>
            </div>
          </label>
          {/* PRODUCER */}
          <label className="flex items-center gap-3 border border-border rounded-xl p-4 cursor-pointer hover:border-leaf">
            <input type="checkbox"
              checked={
                formData.roles.includes(
                  ROLES.PRODUCER
                )
              }
              onChange={() =>
                handleRoleChange(
                  ROLES.PRODUCER
                )
              }
            />
            <div>
              <p className="font-semibold text-earth">Productor</p>
              <p className="text-sm text-textSoft">Publicar y administrar productos.</p>
            </div>
          </label>
        </div>
      </div>
      {/* BUTTON */}
      <button type="submit" className="w-full bg-leaf hover:bg-leafDark text-white py-3 rounded-xl font-semibold transition">Crear cuenta</button>
      {/* LOGIN */}
      <p className="mt-6 text-center text-sm text-textSoft">¿Ya tienes cuenta?
        <Link to="/login" className="ml-2 text-leaf font-semibold">Iniciar sesión</Link>
      </p>
    </form>
  )
}

export default RegisterForm