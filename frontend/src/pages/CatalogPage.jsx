import { useState } from "react"
import AppLayout from "../layouts/AppLayout"
import ProductCard from "../components/products/ProductCard"
import ProductFilters from "../components/products/ProductFilters"

function CatalogPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [location, setLocation] = useState("")
  /* Productos */
  const products = [
    {
      id: 1,
      name: "Maíz",
      producer: "Pedro Ixchop",
      location: "Chimaltenango",
      quantity: "45 quintales",
      price: "180",
      category: "Granos",
      phone: "5555-1234",
      description: "Producto fresco cosechado localmente..."
    },
    {
      id: 2,
      name: "Tomate",
      producer: "Rosa Cú",
      location: "Sacatepéquez",
      quantity: "30 cajas",
      price: "95",
      category: "Verduras",
      phone: "5555-1234",
      description: "Producto fresco cosechado localmente..."
    },
    {
      id: 3,
      name: "Frijol Negro",
      producer: "Juan López",
      location: "Sololá",
      quantity: "20 quintales",
      price: "350",
      category: "Granos",
      phone: "5555-1234",
      description: "Producto fresco cosechado localmente..."
    }
  ]
  /* Filtro para productos basado en búsqueda, categoría y ubicación */
  const filteredProducts = products.filter(product => {
    return (
      product.name
        .toLowerCase()
        .includes(search.toLowerCase())
      &&
      (category === ""
        || product.category === category)
      &&
      product.location
        .toLowerCase()
        .includes(location.toLowerCase())
    )
  })
  /* Dibuja la página de catálogo con filtros y productos */
  return (
    <AppLayout>
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-earth">Catálogo</h1>
        <p className="mt-2 text-textSoft text-lg">Explora productos publicados por productores locales.</p>
      </div>
      {/* FILTERS */}
      <ProductFilters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        location={location}
        setLocation={setLocation}
      />
      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {
          filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
        }
      </div>
    </AppLayout>
  )
}

export default CatalogPage