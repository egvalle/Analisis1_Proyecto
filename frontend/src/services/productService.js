const PRODUCTS_KEY = "products"
/* GET PRODUCTS */
const getProductsStorage = () => {
  const products = localStorage.getItem(PRODUCTS_KEY)
  return products
    ? JSON.parse(products)
    : []
}
/* SAVE PRODUCTS */
const saveProductsStorage = (products) => {
  localStorage.setItem(
    PRODUCTS_KEY,
    JSON.stringify(products)
  )
}
/* GET ALL PRODUCTS */
export const getAllProducts = async () => {
  return getProductsStorage()
}
/* GET PRODUCTS BY PRODUCER */
export const getProductsByProducer = async (producerId) => {
  const products = getProductsStorage()
  return products.filter(
    product =>
      product.producer_id === producerId
  )
}
/* CREATE PRODUCT */
export const createProduct = async ( productData, producer ) => {
  const products =
    getProductsStorage()
  /* NEW PRODUCT */
  const newProduct = {
    id: Date.now(),
    name: productData.name,
    category: productData.category,
    description: productData.description,
    price: Number(productData.price),
    stock: Number(productData.stock),
    unit: productData.unit,
    location: productData.location,
    image: productData.image || "🌽",
    created_at: new Date(),
    /* PRODUCER */
    producer_id: producer.id,
    producer_name:
      producer.full_name
  }
  /* SAVE */
  products.push(newProduct)
  saveProductsStorage(products)
  return newProduct
}
/* UPDATE PRODUCT */
export const updateProduct = async ( productId, updatedData ) => {
  const products = JSON.parse(
    localStorage.getItem("products")
  ) || []
  const updatedProducts =
    products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          ...updatedData,
          updated_at:
            new Date().toISOString()
        }
      }
      return product
    })
  localStorage.setItem(
    "products",
    JSON.stringify(updatedProducts)
  )
  return true
}
/* DELETE PRODUCT */
export const deleteProduct = async ( productId ) => {
  const products = getProductsStorage()
  const filteredProducts =
    products.filter(
      product =>
        product.id !== productId
    )
  saveProductsStorage(filteredProducts)
  return true
}