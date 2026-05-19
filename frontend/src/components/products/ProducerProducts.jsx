import { useEffect, useState } from "react"
import { Plus, Package } from "lucide-react"

import ProductCard from "./ProductCard"
import ProductFormModal from "./ProductFormModal"
import { getProductsByProducer, deleteProduct, createProduct } from "../../services/productService"
import { useAuth } from "../../context/AuthContext"

function ProducerProducts() {
  const { user } = useAuth()
  /* PRODUCTS */
  const [products, setProducts] = useState([])
  /* LOADING */
  const [loading, setLoading] =
    useState(true)
  /* MODAL */
  const [isModalOpen, setIsModalOpen] =
    useState(false)
  /* LOAD PRODUCTS */
  const loadProducts = async () => {
    setLoading(true)
    try {
      const data = await getProductsByProducer(
        user.id
      )
      setProducts(data)
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }
  /* INIT */
  useEffect(() => {
    if (user?.id) {
      loadProducts()
    }
  }, [user])
  /* DELETE PRODUCT */
  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "¿Eliminar producto?"
      )
    if (!confirmDelete) return
    try {
      await deleteProduct(id)
      await loadProducts()
    }
    catch (error) {
      console.log(error)
    }
  }
  /* CREATE PRODUCT */
  const handleCreateProduct = async (
    productData
  ) => {
    try {
      await createProduct( productData, user )
      await loadProducts()
      return true
    }
    catch (error) {
      console.log(error)
      return false
    }
  }
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-earth">Mis publicaciones</h1>
          <p className="mt-2 text-textSoft">Gestiona tus productos publicados.</p>
        </div>
        {/* CREATE BUTTON */}
        <button onClick={() => setIsModalOpen(true) } className="bg-leaf hover:bg-leafDark text-white px-5 py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transition">
          <Plus size={20} />
          Nuevo producto
        </button>
      </div>
      {/* LOADING */}
      {
        loading && (
          <div className="text-textSoft">Cargando productos...</div>
        )
      }
      {/* EMPTY STATE */}
      {
        !loading
        &&
        products.length === 0
        &&
        (
          <div className="bg-white border border-border rounded-3xl p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-leaf/10 flex items-center justify-center">
              <Package
                size={40}
                className="text-leaf"
              />
            </div>
            <h2 className="text-2xl font-bold text-earth">No tienes productos</h2>
            <p className="mt-3 text-textSoft">
              Publica tu primer producto
              para comenzar.
            </p>
          </div>
        )
      }
      {/* PRODUCTS */}
      {
        products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {
              products.map(product => (
                <div
                  key={product.id}
                  className="relative"
                >
                  {/* DELETE */}
                  <button onClick={() => handleDelete(product.id) } className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-red-50 border border-border px-3 py-2 rounded-xl text-sm font-medium transition">
                    Eliminar
                  </button>
                  {/* CARD */}
                  <ProductCard
                    product={product}
                  />
                </div>
              ))
            }
          </div>
        )
      }
      {/* MODAL */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        onSubmit={handleCreateProduct}
      />
    </div>
  )
}

export default ProducerProducts