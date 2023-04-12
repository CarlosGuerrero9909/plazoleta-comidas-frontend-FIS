import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link className="navbar-logo" to="/">Plazoleta de Comidas</Link>
        <div className="navbar-links">
          <Link className="navbar-link" to="/">Inicio</Link>
          <Link className="navbar-link" to="/login">Iniciar sesión</Link>
          <Link className="navbar-link" to="/register">Registrarse</Link>
        </div>
      </nav>
      
      <div className='App'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
