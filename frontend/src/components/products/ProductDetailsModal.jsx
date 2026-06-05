import { X, MapPin, User, Package, Phone, DollarSign, FileText } from "lucide-react"

import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import { createInteraction } from "../../services/interactionService"

function ProductDetailsModal({ product, isOpen, onClose }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [showContact, setShowContact] = useState(false)
  useEffect(() => {
    setShowContact(false)
  }, [product, isOpen])
  const handleContactProducer = async () => {
    /* USER NOT LOGGED */
    if (!user) {
      navigate("/login")
      return
    }
    try {
      /* SAVE INTERACTION */
      await createInteraction({
        buyer_id: user.id,
        producer_id: product.producer_id,
        product_id: product.id
      })
      /* SHOW CONTACT INFO */
      setShowContact(true)
    }
    catch (error) {
      console.error(error)
      alert(
        "No fue posible registrar la interacción"
      )
    }
  }
  if (!isOpen || !product) {
    return null
  }
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      {/* OVERLAY */}
      <div onClick={onClose} className="absolute inset-0"/>
      {/* MODAL */}
      <div className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* HEADER */}
        <div className="h-56 bg-gradient-to-br from-leaf/15 to-leaf/5 flex items-center justify-center border-b border-border relative">
          <span className="text-8xl">
            🌽
          </span>
          {/* CLOSE */}
          <button onClick={onClose} className="absolute top-5 right-5 w-11 h-11 rounded-xl bg-white border border-border flex items-center justify-center hover:bg-sand transition">
            <X size={20} />
          </button>
        </div>
        {/* CONTENT */}
        <div className="p-7">
          {/* TOP */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
            <div>
              <h2 className="text-3xl font-bold text-earth">
                {product.title}
              </h2>
              <div className="mt-3 flex items-center gap-2 text-textSoft">
                <User size={18} />
                <span>
                  {product.producer_name}
                </span>
              </div>
            </div>
            {/* STATUS */}
            <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-sm self-start">
              Disponible
            </span>
          </div>
          {/* INFO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            {/* LOCATION */}
            <InfoCard
              icon={<MapPin size={18} />}
              title="Ubicación"
              value={product.location}
            />
            {/* QUANTITY */}
            <InfoCard
              icon={<Package size={18} />}
              title="Cantidad"
              value={`${product.quantity} ${product.unit}`}
            />
            {/* PRICE */}
            <InfoCard
              icon={<DollarSign size={18} />}
              title="Precio"
              value={`Q${product.price}`}
            />
          </div>
          {/* CATEGORY */}
          <div className="mt-6">
            <span className="inline-block bg-leaf/10 text-leaf px-4 py-2 rounded-xl font-medium">
              {product.category}
            </span>
          </div>
          {/* DESCRIPTION */}
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-3">
              <FileText size={18} className="text-leaf"/>
              <h3 className="text-lg font-semibold text-earth">Descripción</h3>
            </div>
            <p className="text-textSoft leading-relaxed">
              {product.description}
            </p>
          </div>
          {/* CONTACT INFO */}
          {
            showContact && (
              <div className="mt-8 bg-background border border-border rounded-2xl p-5">
                <h3 className="text-lg font-semibold text-earth mb-4">
                  Información del productor
                </h3>
                <div className="space-y-2">
                  <p>
                    <strong>Nombre:</strong>
                    {" "}
                    {product.producer_name}
                  </p>
                  <p>
                    <strong>Teléfono:</strong>
                    {" "}
                    {product.producer_phone}
                  </p>
                  <p>
                    <strong>Correo:</strong>
                    {" "}
                    {product.producer_email}
                  </p>
                </div>
              </div>
            )
          }
          {/* ACTIONS */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-leaf hover:bg-leafDark text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition" onClick={handleContactProducer}>
              <Phone size={20} />Contactar productor
            </button>
            <button onClick={onClose} className="flex-1 border border-border py-4 rounded-2xl font-semibold hover:bg-sand transition">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsModal

function InfoCard({ icon, title, value }) {
  return (
    <div className="bg-background border border-border rounded-2xl p-4">
      <div className="flex items-center gap-2 text-leaf mb-2">
        {icon}
        <span className="text-sm font-semibold">
          {title}
        </span>
      </div>
      <p className="text-earth font-medium">
        {value}
      </p>
    </div>
  )
}