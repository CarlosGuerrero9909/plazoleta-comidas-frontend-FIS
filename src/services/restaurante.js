import axios from 'axios'

const baseURL = '/api/restaurantes'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const createRestaurante = async (newObject) => {

  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(`${baseURL}/registrarRestaurante`, newObject, config)
  return response.data
}

const consultarRestaurantes = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  createRestaurante,
  consultarRestaurantes,
  setToken
}