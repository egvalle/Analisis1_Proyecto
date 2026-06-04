import PublicLayout from "../layouts/PublicLayout"
import ProductCatalog from "../components/products/ProductCatalog"

function HomePage() {
  return (
    <PublicLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* HERO */}
        <div className="bg-white rounded-3xl border border-border p-10 mb-10">
          <h1 className="text-5xl font-bold text-earth leading-tight">
            Compra y vende productos agrícolas
            de forma sencilla.
          </h1>
          <p className="mt-5 text-lg text-textSoft max-w-3xl">
            Cosecha Red conecta productores y compradores
            mediante un catálogo digital moderno,
            accesible y seguro.
          </p>
        </div>
        {/* CATALOG */}
        <ProductCatalog />
      </div>
    </PublicLayout>
  )
}

export default HomePage