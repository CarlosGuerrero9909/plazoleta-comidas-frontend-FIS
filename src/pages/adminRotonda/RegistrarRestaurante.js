import React, { useState, useEffect } from "react"
import restaurantService from '../../services/restaurante'


function RegistrarRestaurante() {
  const [user, setUser] = useState({})
  const [restaurante, setRestaurante] = useState({
    nombre: '',
    especialidad: '',
    idAdminRestaurante: '',
  })

  useEffect(() => {
    const loggedUserJSON = JSON.parse(sessionStorage.getItem('usuario'))
    if (loggedUserJSON) {
      const user = loggedUserJSON
      setUser(user)
      restaurantService.setToken(user.token)
    }
  }, [])

  const handleChange = (e) => {
    setRestaurante({
      ...restaurante,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    sendRegister()
    setRestaurante({
      nombre: '',
      especialidad: '',
      idAdminRestaurante: '',
    })
  }

  const sendRegister = async () => {
    const restauranteSend = {
      nombre: restaurante.nombre,
      especialidad: restaurante.especialidad,
      idAdminRestaurante: restaurante.idAdminRestaurante,
    }
    const data = await restaurantService.createRestaurante(restauranteSend)
    restaurantService.setToken(user.token)
    //console.log(data)
    return data
  }

  return (
    <div className="auth-form-container">
      <h2>Registrar Restaurante</h2>
      <form className="general-form" onSubmit={handleRegister}>
        <label htmlFor="nombre-restaurante">Nombre restaurante</label>
        <input value={restaurante.nombre} name="nombre" onChange={handleChange} id="nombre-restaurante" placeholder="El corral" required />
        <label htmlFor="especialidad">Especialidad</label>
        <input value={restaurante.especialidad} name="especialidad" onChange={handleChange} id="especialidad" placeholder="Comida rapida" required />
        <label htmlFor="id-admin-restaurante">Id administrador</label>
        <input value={restaurante.idAdminRestaurante} name="idAdminRestaurante" onChange={handleChange} id="id-admin-restaurante" placeholder="6455ebf2b7bbe69ea881fc7e" required />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default RegistrarRestaurante;