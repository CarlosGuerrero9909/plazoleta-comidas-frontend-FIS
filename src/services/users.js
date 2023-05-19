import axios from 'axios'

const baseURL = '/api/usuarios'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const createCliente = async (newObject) => {
  const response = await axios.post(baseURL, newObject)
  return response.data
}

const createAdminRestaurante = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(`${baseURL}/registrarAdminRestaurante`, newObject, config)
  return response.data
}

const consultarUsuarios = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  createCliente,
  createAdminRestaurante,
  consultarUsuarios,
  setToken
}