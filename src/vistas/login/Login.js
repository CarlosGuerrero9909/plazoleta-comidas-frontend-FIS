import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <h2>Inicio de sesión</h2>
      <form className='form-login'>
        <div className="form-group-login">
          <label className='label-login' htmlFor="username">Username</label>
          <input className='input-login' type="text" id="username" name="username" />
        </div>
        <div className="form-group-login">
          <label htmlFor="password">Password</label>
          <input className='input-login' type="password" id="password" name="password" />
        </div>
        <button className='button-login' type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
