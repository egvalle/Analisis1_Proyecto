import { useEffect, useState } from "react"

import { User, Mail, Phone, Star, Calendar, Shield } from "lucide-react"

import { useAuth } from "../../context/AuthContext"

import { getProfile } from "../../services/profileService"

function Profile() {
  const { user } = useAuth()
  const [profile, setProfile] =
    useState(null)
  const [loading, setLoading] =
    useState(true)
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data =
          await getProfile(
            user.id
          )
        setProfile(data)
      }
      catch (error) {
        console.error(error)
      }
      finally {
        setLoading(false)
      }
    }
    if (user?.id) {
      loadProfile()
    }
  }, [user])
  if (loading) {
    return (
      <div>Cargando perfil...</div>
    )
  }
  if (!profile) {
    return (
      <div>No fue posible cargar el perfil.</div>
    )
  }
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-earth">Mi perfil</h1>
        <p className="mt-2 text-textSoft">Información de la cuenta.</p>
      </div>
      {/* PROFILE CARD */}
      <div className="bg-white border border-border rounded-3xl p-8 shadow-soft">
        {/* AVATAR */}
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-leaf text-white flex items-center justify-center text-4xl font-bold mb-4">
            {
              profile.full_name
                ?.charAt(0)
                ?.toUpperCase()
            }
          </div>
          <h2 className="text-2xl font-bold text-earth">
            {profile.full_name}
          </h2>
        </div>
        {/* INFO */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileItem
            icon={<Star size={20} />}
            label="Valoración"
            value={`${profile.average_rating}/5`}
          />
          <ProfileItem
            icon={<Mail size={20} />}
            label="Correo electrónico"
            value={profile.email}
          />
          <ProfileItem
            icon={<Phone size={20} />}
            label="Teléfono"
            value={profile.phone}
          />
          <ProfileItem
            icon={<User size={20} />}
            label="Rol(es)"
            value={
              profile.roles.join(", ")
            }
          />
          <ProfileItem
            icon={<Calendar size={20} />}
            label="Fecha de registro"
            value={
              new Date(
                profile.created_at
              ).toLocaleDateString()
            }
          />
          <ProfileItem
            icon={<Shield size={20} />}
            label="Estado"
            value={
              profile.is_active
                ? "Activo"
                : "Inactivo"
            }
          />
        </div>
      </div>
    </div>
  )
}

function ProfileItem({ icon, label, value }) {
  return (
    <div className="bg-background border border-border rounded-2xl p-4">
      <div className="flex items-center gap-2 text-leaf mb-2">
        {icon}
        <span className="font-semibold">
          {label}
        </span>
      </div>
      <p className="text-earth">
        {value}
      </p>
    </div>
  )
}

export default Profile