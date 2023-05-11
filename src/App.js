import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import AdminRotonda from './pages/adminRotonda/AdminRotonda'
import AdminRestaurante from './pages/adminRestaurante/AdminRestaurante'
import Cliente from './pages/cliente/Cliente'

function App() {

  const sesion = (user) => {
    sessionStorage.setItem("usuario", JSON.stringify(user))
  }

  return (
    <div >
      <Router>
        <Navbar/>
        <div className='App'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login sesion={sesion}/>} />
          <Route path="/Register" element={<Register />} />
          <Route path='/AdminRotonda/*' element={<AdminRotonda />} />
          <Route path='/AdminRestaurante/*' element={<AdminRestaurante />} />
          <Route path='/Cliente/*' element={<Cliente />} />
        </Routes>
        </div>
      </Router> 
    </div>
  );
}

export default App;
