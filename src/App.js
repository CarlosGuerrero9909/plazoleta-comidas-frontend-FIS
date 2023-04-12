import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Home from './vistas/home/Home';
import Login from './vistas/login/Login';
import Signup from './vistas/signup/Signup';

function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link className="navbar-logo" to="/">Plazoleta de Comidas</Link>
        <div className="navbar-links">
          <Link className="navbar-link" to="/">Inicio</Link>
          <Link className="navbar-link" to="/login">Iniciar sesión</Link>
          <Link className="navbar-link" to="/signup">Registrarse</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
