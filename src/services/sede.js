import axios from 'axios'

const baseURL = '/api/sedes'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const createSede = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(`${baseURL}/registrarSede`, newObject, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  createSede,
  setToken
}