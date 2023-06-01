import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import NavBar from './components/navbar/NavBar';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import AdminRotonda from './pages/adminRotonda/AdminRotonda';
import RegistrarAdminRestaurante from './pages/adminRotonda/RegistrarAdminRestaurante'
import RegistrarRestaurante from './pages/adminRotonda/RegistrarRestaurante'
import RegistrarSede from "./pages/adminRotonda/RegistrarSede";
import AdminRestaurante from './pages/adminRestaurante/AdminRestaurante'
import RegistrarMenu from "./pages/adminRestaurante/RegistrarMenu";
import RegistrarProducto from "./pages/adminRestaurante/RegistrarProducto";
import ActualizarProducto from "./pages/adminRestaurante/ActualizarProducto";
import EliminarProducto from "./pages/adminRestaurante/EliminarProducto";
import Cliente from './pages/cliente/Cliente'
import Restaurantes from './pages/cliente/Restaurantes'
import MenusRestaurante from './pages/cliente/MenusRestaurante'
import RegistrarProductoCompuesto from "./pages/adminRestaurante/RegistrarProductoCompuesto";

function App() {
  const [logged, setLogged] = useState(false)

  const sesion = (user) => {
    sessionStorage.setItem("usuario", JSON.stringify(user))
  }

  return (
    <div >
      <Router>
        <NavBar logged={logged} setLogged={setLogged}/>
        <div className='App'>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Login" element={<Login sesion={sesion} setLogged={setLogged}/>} />
          <Route path="/Register" element={<Register />} />
          <Route path='/AdminRotonda/*' element={<AdminRotonda />} />
            <Route path="RegistrarAdminRestaurante" element={<RegistrarAdminRestaurante />} />
            <Route path="RegistrarRestaurante" element={<RegistrarRestaurante />} />
            <Route path="RegistrarSede" element={<RegistrarSede />} />
          <Route path='/AdminRestaurante/*' element={<AdminRestaurante />} />
            <Route path="RegistrarMenu" element={<RegistrarMenu />} />
            <Route path="RegistrarProducto" element={<RegistrarProducto />} />
            <Route path="ActualizarProducto" element={<ActualizarProducto />} />
            <Route path="EliminarProducto" element={<EliminarProducto />} />
            <Route path="RegistrarProductoCompuesto" element={<RegistrarProductoCompuesto />} />
          <Route path='/Cliente/*' element={<Cliente/>} />
            <Route path="Restaurantes" element={<Restaurantes />}/>
            <Route path="MenusRestaurante" element={<MenusRestaurante />}/>
        </Routes>
        </div>
      </Router> 
    </div>
  );
}

export default App;
