import React, { useState } from "react"
import userService from '../../services/users'

const Register = (props) => {
  const [usuario, setUsuario] = useState({
      fullName: '',
      email: '',
      password: '',
      direccion: '',
      celular: '',
      rol: 'cliente'
  })

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usuarioCliente = {
      fullName: usuario.fullName,
      email: usuario.email,
      password: usuario.password,
      rol: usuario.rol,
      cliente: {
        direccion: usuario.direccion,
        celular: usuario.celular,
      }
    }
    const data = await userService.create(usuarioCliente)
    console.log(data)
    return data
  }

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="fullName">Nombre completo</label>
        <input value={usuario.fullName} name="fullName" onChange={handleChange} id="fullName" placeholder="Your Full Name" required/>
        <label htmlFor="email">Email</label>
        <input value={usuario.email} onChange={handleChange} type="email" placeholder="youremail@gmail.com" id="email" name="email" required/>
        <label htmlFor="password">Password</label>
        <input value={usuario.password} onChange={handleChange} type="password" placeholder="********" id="password" name="password" required/>
        <label htmlFor="direccion">Direccion</label>
        <input value={usuario.direccion} onChange={handleChange} type="text" placeholder="ej: cra 99 N° 14-78" id="direccion" name="direccion" required/>
        <label htmlFor="celular">Celular</label>
        <input value={usuario.celular} onChange={handleChange} type="text" placeholder="3214573245" id="celular" name="celular" required/>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default Register;
