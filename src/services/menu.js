import axios from 'axios'

const baseURL = '/api/menus'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const createMenu = async (newObject) => {

  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(`${baseURL}/registrarMenu`, newObject, config)
  return response.data
}

const consultarMenus = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  createMenu,
  consultarMenus,
  setToken
}