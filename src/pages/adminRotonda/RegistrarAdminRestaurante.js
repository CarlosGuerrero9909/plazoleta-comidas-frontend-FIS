import React, { useState, useEffect } from "react"
import userService from '../../services/users'

function RegistrarAdminRestaurante() {
  const [user, setUser] = useState({})
  const [adminRestaurante, setAdminRestaurante] = useState({
    fullName: '',
    rol: 'AdminRestaurante',
    email: '',
    password: '',
  })

  useEffect(() => {
    const loggedUserJSON = JSON.parse(sessionStorage.getItem('usuario'))
    if (loggedUserJSON) {
      const user = loggedUserJSON
      setUser(user)
      userService.setToken(user.token)
    }
  }, [])

  const handleChange = (e) => {
    setAdminRestaurante({
      ...adminRestaurante,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    sendRegister()
    setAdminRestaurante({
      fullName: '',
      rol: 'AdminRestaurante',
      email: '',
      password: '',
    })
  }

  const sendRegister = async () => {
    const userAdminRestaurante = {
      fullName: adminRestaurante.fullName,
      rol: adminRestaurante.rol,
      email: adminRestaurante.email,
      password: adminRestaurante.password
    }
    const data = await userService.createAdminRestaurante(userAdminRestaurante)
    userService.setToken(user.token)
    //console.log(data)
    return data
  }

  return (
    <div className="auth-form-container">
      <h2>Registrar Admin Restaurante</h2>
      <form className="general-form" onSubmit={handleRegister}>
        <label htmlFor="fullName">Nombre completo</label>
        <input value={adminRestaurante.fullName} name="fullName" onChange={handleChange} id="fullName" placeholder="Your Full Name" required />
        <label htmlFor="email">Email</label>
        <input value={adminRestaurante.email} onChange={handleChange} type="email" placeholder="youremail@gmail.com" id="email" name="email" autoComplete="off" required />
        <label htmlFor="password">Password</label>
        <input value={adminRestaurante.password} onChange={handleChange} type="password" placeholder="********" id="password" name="password" autoComplete="off" required />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default RegistrarAdminRestaurante;