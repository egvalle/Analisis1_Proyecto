import { useState } from "react"

import { MapPin, User, Package, DollarSign, Eye } from "lucide-react"
import ProductDetailsModal from "./ProductDetailsModal"
function ProductCard({ product }) {
  /* MODAL */
  const [isModalOpen, setIsModalOpen] =
    useState(false)
  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-soft hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        {/* IMAGE */}
        <div className="h-48 bg-gradient-to-br from-leaf/10 to-leaf/5 flex items-center justify-center border-b border-border">
          <span className="text-5xl md:text-7xl">
            🌽
          </span>
        </div>
        {/* CONTENT */}
        <div className="p-5">
          {/* TOP */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-bold text-earth">
                {product.title}
              </h3>
              <p className="text-sm text-leaf font-medium mt-1">
                {product.category}
              </p>
            </div>
            {/* STATUS */}
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 whitespace-nowrap">
              Disponible
            </span>
          </div>
          {/* PRODUCER */}
          <div className="mt-4 flex items-center gap-2 text-textSoft text-sm">
            <User size={16} />
            <span>
              {product.producer_name}
            </span>
          </div>
          {/* LOCATION */}
          <div className="mt-2 flex items-center gap-2 text-textSoft text-sm">
            <MapPin size={16} />
            <span>
              {product.location}
            </span>
          </div>
          {/* QUANTITY */}
          <div className="mt-2 flex items-center gap-2 text-textSoft text-sm">
            <Package size={16} />
            <span>
              {product.quantity} {product.unit}
            </span>
          </div>
          {/* PRICE */}
          <div className="mt-2 flex items-center gap-2 text-earth font-semibold">
            <DollarSign size={18} />
            <span>
              Q{product.price}
            </span>
          </div>
          {/* BUTTON */}
          <div className="mt-6">
            <button onClick={openModal} className="w-full bg-leaf hover:bg-leafDark text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition">
              <Eye size={18} />
              Ver detalles
            </button>
          </div>
        </div>
      </div>
      <ProductDetailsModal
        product={product}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  )
}

export default ProductCard