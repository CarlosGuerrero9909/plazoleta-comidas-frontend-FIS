import axios from 'axios'

const baseURL = '/api/transaccion'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const consultarDisponibilidad = async (disponibilidadItems) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(`${baseURL}/disponibilidad`, disponibilidadItems, config)
  return response.data
}

const hacerPago = async () => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(`${baseURL}/pago`, {},config)
  return response.data
}


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  consultarDisponibilidad,
  hacerPago,
  setToken
}