import React from "react";
import "./Signup.css";

function Signup() {
  return (
    <div className="container-register">
      <form className="form-register">
        <h2 className="h2-register">Registrarse</h2>
        <input className="input-register" type="text" placeholder="Nombre" />
        <input className="input-register" type="text" placeholder="Apellido" />
        <select className="select-rol">
          <option value="">Rol</option>
          <option value="cliente">Cliente</option>
          <option value="restaurante">Restaurante</option>
        </select>
        <input className="input-register" type="text" placeholder="Nombre de usuario" />
        <input className="input-register" type="password" placeholder="Contraseña" />
        <input className="input-register" type="date" />
        <input className="input-register" type="submit" value="Registrarse" />
      </form>
    </div>
  );
}

export default Signup;
