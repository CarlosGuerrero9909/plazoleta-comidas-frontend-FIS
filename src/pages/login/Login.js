import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import loginService from '../../services/login'

const Login = (props) => {
  
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    checkLogin()
  }

  const checkLogin = async () => {
    try {
      const userLogueado = await loginService.login({
        email,
        password
      })
      //console.log(userLogueado)
      if (!userLogueado.token) {
        return window.alert("Datos incorrectos");
      }

      //Las credenciales son correctas
      props.sesion(userLogueado);
      sessionStorage.setItem("sesionIniciada", true)

      //Aqui va a dirigir a una pagina o otra dependiendo del rol
      if (userLogueado.user.rol === "AdminRotonda") {
        navigate("/AdminRotonda");
      };
      if (userLogueado.user.rol === "AdminRestaurante") {
        navigate("/AdminRestaurante");
      };

      if (userLogueado.user.rol === "Cliente") {
        navigate("/Cliente");
      };

    } catch (exception) {
      console.log(exception)
    }

  }

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="email">email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
        <label htmlFor="password">password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
