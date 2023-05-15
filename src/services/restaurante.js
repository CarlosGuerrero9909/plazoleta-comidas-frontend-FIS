import axios from 'axios'

let baseURL = '/api/restaurantes'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const createRestaurante = async (newObject) => {
  baseURL = '/api/restaurantes/registrarRestaurante'

  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseURL, newObject, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  createRestaurante,
  setToken
}