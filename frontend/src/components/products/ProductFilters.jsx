import { Search, MapPin, SlidersHorizontal } from "lucide-react"

function ProductFilters({ search, setSearch, category, setCategory, location, setLocation }) {
  return (
    <div className="bg-white border border-border rounded-2xl p-5 shadow-soft mb-8">
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-5">
        <SlidersHorizontal
          size={20}
          className="text-leaf"
        />
        <h3 className="text-lg font-semibold text-earth">Filtros</h3>
      </div>
      {/* FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* SEARCH */}
        <div className="flex items-center gap-3 border border-border rounded-xl px-4 py-3 bg-background">
          <Search
            size={18}
            className="text-textSoft"
          />
          <input type="text" placeholder="Buscar producto..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-transparent outline-none w-full text-sm"/>
        </div>
        {/* CATEGORY */}
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border border-border rounded-xl px-4 py-3 bg-background text-sm outline-none">
          <option value="">Todas las categorías</option>
          <option value="Granos">Granos</option>
          <option value="Verduras">Verduras</option>
          <option value="Frutas">Frutas</option>
        </select>
        {/* LOCATION */}
        <div className="flex items-center gap-3 border border-border rounded-xl px-4 py-3 bg-background">
          <MapPin
            size={18}
            className="text-textSoft"
          />
          <input type="text" placeholder="Ubicación..." value={location} onChange={(e) => setLocation(e.target.value)} className="bg-transparent outline-none w-full text-sm"/>
        </div>
      </div>
    </div>
  )
}

export default ProductFilters