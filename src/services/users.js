import axios from 'axios'

const baseURL = '/api/usuarios'

const create = async (newObject) => {
  const response = await axios.post(baseURL, newObject)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  create,
}