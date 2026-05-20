import { useEffect, useState } from "react"

import ProductCard from "./ProductCard"
import ProductFilters from "./ProductFilters"

import { getAllProducts } from "../../services/productService"
function ProductCatalog() {
  /* PRODUCTS */
  const [products, setProducts] =
    useState([])
  /* FILTERED */
  const [
    filteredProducts,
    setFilteredProducts
  ] = useState([])
  /* FILTERS */
  const [filters, setFilters] =
    useState({
      search: "",
      category: ""
    })
  /* LOADING */
  const [loading, setLoading] =
    useState(true)
  /* LOAD PRODUCTS */
  const loadProducts = async () => {
    try {
      setLoading(true)
      const data =
        await getAllProducts()
      setProducts(data)
      setFilteredProducts(data)
    }
    catch (error) {
      console.log(
        "ERROR LOADING PRODUCTS:",
        error
      )
    }
    finally {
      setLoading(false)
    }
  }
  /* INIT */
  useEffect(() => {
    loadProducts()
  }, [])
  /* FILTERS */
  useEffect(() => {
    let result = [...products]
    /* SEARCH */
    if (filters.search) {
      result = result.filter(product =>
        product.title
          ?.toLowerCase()
          .includes(
            filters.search.toLowerCase()
          )
      )
    }
    /* CATEGORY */
    if (filters.category) {
      result = result.filter(product =>
        product.category ===
        filters.category
      )
    }
    setFilteredProducts(result)
  }, [filters, products])
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-earth">Catálogo agrícola</h1>
        <p className="mt-2 text-textSoft">
          Explora productos publicados
          por productores locales.
        </p>
      </div>
      {/* FILTERS */}
      <ProductFilters
        filters={filters}
        setFilters={setFilters}
        products={products}
      />
      {/* LOADING */}
      {
        loading && (
          <div className="text-textSoft">Cargando productos...</div>
        )
      }
      {/* EMPTY */}
      {
        !loading
        &&
        filteredProducts.length === 0
        &&
        (
          <div className="bg-white border border-border rounded-3xl p-12 text-center">
            <h2 className="text-2xl font-bold text-earth">No hay productos</h2>
            <p className="mt-3 text-textSoft">
              Todavía no existen productos
              publicados.
            </p>
          </div>
        )
      }
      {/* PRODUCTS */}
      {
        filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {
              filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default ProductCatalog