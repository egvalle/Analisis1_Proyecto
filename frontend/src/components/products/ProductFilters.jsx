import { Search, Filter } from "lucide-react"

function ProductFilters({ filters, setFilters, products }) {
  /* UNIQUE CATEGORIES */
  const categories = [
    ...new Set(
      products.map(
        product => product.category
      )
    )
  ]
  /* SEARCH */
  const handleSearchChange = (e) => {
    setFilters({
      ...filters,
      search: e.target.value
    })
  }
  /* CATEGORY */
  const handleCategoryChange = (e) => {
    setFilters({
      ...filters,
      category: e.target.value
    })
  }
  return (
    <div className="bg-white border border-border rounded-3xl p-5">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* SEARCH */}
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-textSoft"/>
          <input type="text" placeholder="Buscar productos..." value={filters.search} onChange={handleSearchChange} className="w-full border border-border rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-leaf"/>
        </div>
        {/* CATEGORY */}
        <div className="relative min-w-[220px]">
          <Filter
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-textSoft pointer-events-none"
          />
          <select value={filters.category} onChange={handleCategoryChange} className="w-full border border-border rounded-2xl py-3 pl-11 pr-4 outline-none bg-white appearance-none focus:border-leaf">
            <option value="">Todas las categorías</option>
            {
              categories.map(category => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))
            }
          </select>
        </div>
      </div>
    </div>
  )
}

export default ProductFilters