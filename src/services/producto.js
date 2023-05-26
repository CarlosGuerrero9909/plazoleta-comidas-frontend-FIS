import axios from 'axios'

const baseURL = '/api/productos'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const createProducto = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(`${baseURL}/registrarProductoSimple`, newObject, config)
  return response.data
}

const createProductoCompuesto = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(`${baseURL}/registrarProductoCompuesto`, newObject, config)
  return response.data
}

const consultarProductos = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const eliminarProducto = async (productId) => {
  const config = {
    headers: { Authorization: token }
  }
  
  const response = await axios.delete(`${baseURL}/eliminar/${productId}`, config)
  return response.data
}

const actualizarProducto = async (productId, newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  
  const response = await axios.put(`${baseURL}/actualizar/${productId}`, newObject, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  createProducto,
  createProductoCompuesto,
  consultarProductos,
  eliminarProducto,
  actualizarProducto,
  setToken
}