import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {

  const navigate = useNavigate()
  const auth = JSON.parse(sessionStorage.getItem('usuario'))

  const logout = () => {
    sessionStorage.clear()
    navigate('/')
  }

  return (
    <div>
      {
        auth && auth.user.rol === 'AdminRotonda' ?
          <nav className="navbar">
            <Link className="navbar-logo" to="/">Plazoleta de Comidas</Link>
            <div className="navbar-links">
              <Link onClick={logout} className="navbar-link" to="/Login">Cerrar sesión</Link>
              <Link className="navbar-link" to="/Login">Registrar AdminRestaurante</Link>
              <Link className="navbar-link" to="/Login">Registrar Restaurante</Link>
            </div>
          </nav>
          :
        auth && auth.user.rol === 'AdminRestaurante' ?
          <nav className="navbar">
            <Link className="navbar-logo" to="/">Plazoleta de Comidas</Link>
            <div className="navbar-links">
              <Link onClick={logout} className="navbar-link" to="/Login">Cerrar sesión</Link>
              <Link className="navbar-link" to="/Login">Registrar menu</Link>
              <Link className="navbar-link" to="/Login">Registrar producto</Link>
            </div>
          </nav>
          :
        auth && auth.user.rol === 'Cliente' ?
          <nav className="navbar">
            <Link className="navbar-logo" to="/">Plazoleta de Comidas</Link>
            <div className="navbar-links">
              <Link onClick={logout} className="navbar-link" to="/Login">Cerrar sesión</Link>
              <Link onClick={logout} className="navbar-link" to="/Login">Carrito</Link>
            </div>
          </nav>
          :
          <nav className="navbar">
            <Link className="navbar-logo" to="/">Plazoleta de Comidas</Link>
            <div className="navbar-links">
              <Link className="navbar-link" to="/">Inicio</Link>
              <Link className="navbar-link" to="/Login">Iniciar sesión</Link>
              <Link className="navbar-link" to="/Register">Registrarse</Link>
            </div>
          </nav>
      }
    </div>
  );
}

export default Navbar;