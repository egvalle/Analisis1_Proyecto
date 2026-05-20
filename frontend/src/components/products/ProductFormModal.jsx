import { useEffect, useState } from "react"
import { X, Save } from "lucide-react"

function ProductFormModal({ isOpen, onClose, onSubmit, initialData = null }) {
  /* FORM */
  const [formData, setFormData] =
    useState({
      title: "",
      category: "",
      description: "",
      price: "",
      quantity: "",
      unit: "",
      location: ""
    })
  /* EDIT MODE */
  useEffect(() => {
    if (initialData) {
      setFormData({
        title:
          initialData.title || "",
        category:
          initialData.category || "",
        description:
          initialData.description || "",
        price:
          initialData.price || "",
        quantity:
          initialData.quantity || "",
        unit:
          initialData.unit || "",
        location:
          initialData.location || ""
      })
    }
  }, [initialData])
  /* INPUT CHANGE */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    })
  }
  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault()
    await onSubmit(formData)
    /* RESET */
    setFormData({
      title: "",
      category: "",
      description: "",
      price: "",
      quantity: "",
      unit: "",
      location: ""
    })
    onClose()
  }
  /* HIDE */
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      {/* MODAL */}
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">
        {/* HEADER */}
        <div className="px-6 py-5 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-earth">
              {
                initialData
                  ? "Editar producto"
                  : "Nuevo producto"
              }
            </h2>
            <p className="text-textSoft mt-1">
              Completa la información
              del producto.
            </p>
          </div>
          {/* CLOSE */}
          <button onClick={onClose} className="border border-border p-2 rounded-xl hover:bg-red-50 transition">
            <X size={20} />
          </button>
        </div>
        {/* BODY */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* TITLE */}
          <div>
            <label className="block mb-2 font-medium text-earth">Nombre producto</label>
            <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full border border-border rounded-xl px-4 py-3 outline-none focus:border-leaf"/>
          </div>
          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* CATEGORY */}
            <div>
              <label className="block mb-2 font-medium text-earth">Categoría</label>
              <input type="text" name="category" required value={formData.category} onChange={handleChange} className="w-full border border-border rounded-xl px-4 py-3 outline-none focus:border-leaf"/>
            </div>
            {/* LOCATION */}
            <div>
              <label className="block mb-2 font-medium text-earth">Ubicación</label>
              <input type="text" name="location" required value={formData.location} onChange={handleChange} className="w-full border border-border rounded-xl px-4 py-3 outline-none focus:border-leaf"/>
            </div>
          </div>
          {/* DESCRIPTION */}
          <div>
            <label className="block mb-2 font-medium text-earth">Descripción</label>
            <textarea name="description" required rows="4" value={formData.description} onChange={handleChange} className="w-full border border-border rounded-xl px-4 py-3 outline-none focus:border-leaf"/>
          </div>
          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* PRICE */}
            <div>
              <label className="block mb-2 font-medium text-earth">Precio</label>
              <input type="number" required name="price" value={formData.price} onChange={handleChange} className="w-full border border-border rounded-xl px-4 py-3 outline-none focus:border-leaf"/>
            </div>
            {/* QUANTITY */}
            <div>
              <label className="block mb-2 font-medium text-earth">Cantidad</label>
              <input type="number" required name="quantity" value={formData.quantity} onChange={handleChange} className="w-full border border-border rounded-xl px-4 py-3 outline-none focus:border-leaf"/>
            </div>
            {/* UNIT */}
            <div>
              <label className="block mb-2 font-medium text-earth">Unidad</label>
              <input type="text" required name="unit" value={formData.unit} onChange={handleChange} placeholder="kg" className="w-full border border-border rounded-xl px-4 py-3 outline-none focus:border-leaf"/>
            </div>
          </div>
          {/* FOOTER */}
          <div className="pt-4 flex flex-col-reverse sm:flex-row gap-3 justify-end">
            <button type="button" onClick={onClose} className="border border-border px-5 py-3 rounded-xl font-medium hover:bg-gray-50 transition">Cancelar</button>
            <button type="submit" className="bg-leaf hover:bg-leafDark text-white px-5 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition">
              <Save size={18} />
              Guardar producto
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductFormModal