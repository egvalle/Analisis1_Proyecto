import { API_URL } from "../config/api"

/* GET ALL PRODUCTS */
export const getAllProducts = async () => {
  const response = await fetch(
    `${API_URL}/products`
  )
  if (!response.ok) {
    throw new Error(
      "Error al obtener productos"
    )
  }
  return await response.json()
}
/* GET PRODUCTS BY PRODUCER */
export const getProductsByProducer = async ( producerId ) => {
  const response = await fetch(
    `${API_URL}/products/producer/${producerId}`
  )
  if (!response.ok) {
    throw new Error(
      "Error al obtener productos"
    )
  }
  return await response.json()
}
/* CREATE PRODUCT */
export const createProduct = async ( productData, user ) => {
  const payload = {
    producer_id:
      user.id,
    title:
      productData.title,
    category:
      productData.category,
    quantity:
      Number(productData.quantity),
    unit:
      productData.unit,
    price:
      Number(productData.price),
    location:
      productData.location,
    description:
      productData.description,
    image_url:
      productData.image_url,
  }
  const response = await fetch(
    `${API_URL}/products`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify(
        payload
      )
    }
  )
  if (!response.ok) {
    const errorData =
      await response.json()
    throw new Error(
      errorData.detail
      ||
      "Error al crear producto"
    )
  }
  return await response.json()
}
/* UPDATE PRODUCT */
export const updateProduct = async ( productId, updatedData ) => {
  const payload = {
    title:
      updatedData.title,
    category:
      updatedData.category,
    quantity:
      Number(updatedData.quantity),
    unit:
      updatedData.unit,
    price:
      Number(updatedData.price),
    location:
      updatedData.location,
    description:
      updatedData.description,
    image_url:
      updatedData.image_url
  }
  const response = await fetch(
    `${API_URL}/products/${productId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify(
        payload
      )
    }
  )
  if (!response.ok) {
    const errorData =
      await response.json()
    throw new Error(
      errorData.detail
      ||
      "Error al actualizar producto"
    )
  }
  return await response.json()
}
/* IMAGE PRODUCT */
export const uploadImage = async (file) => {
  const formData = new FormData()
  formData.append(
    "file",
    file
  )
  const response = await fetch(
    `${API_URL}/products/upload-image`,
    {
      method: "POST",
      body: formData
    }
  )
  if (!response.ok) {
    throw new Error(
      "Error al subir imagen"
    )
  }
  return await response.json()
}
/* DELETE PRODUCT */
export const deleteProduct = async ( productId ) => {
  const response = await fetch(
    `${API_URL}/products/${productId}`,
    {
      method: "DELETE"
    }
  )
  if (!response.ok) {
    const errorData =
      await response.json()
    throw new Error(
      errorData.detail
      ||
      "Error al eliminar producto"
    )
  }
  return true
}