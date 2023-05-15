import axios from 'axios'

let baseURL = '/api/usuarios'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const createCliente = async (newObject) => {
  baseURL = '/api/usuarios'
  const response = await axios.post(baseURL, newObject)
  return response.data
}

const createAdminRestaurante = async (newObject) => {
  baseURL = '/api/usuarios/registrarAdminRestaurante'

  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseURL, newObject, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  createCliente,
  createAdminRestaurante,
  setToken
}