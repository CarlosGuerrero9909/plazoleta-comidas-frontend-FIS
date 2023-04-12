import React, { useState } from "react";

const Register = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [rol, setRol] = useState('cliente');
  const [birtDate, setBirtDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    console.log(fullName);
    console.log(rol)
    console.log(birtDate)
  }

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="fullName">full name</label>
        <input value={fullName} name="fullName" onChange={(e) => setFullName(e.target.value)} id="fullName" placeholder="Your Full Name" required/>
        <label htmlFor="rol">rol</label>
        <select value={rol} name="rol" onChange={(e) => setRol(e.target.value)} id="rol" required>
          <option value="cliente">Cliente</option>
          <option value="restaurante">Restaurante</option>
        </select>
        <label htmlFor="email">email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" required/>
        <label htmlFor="password">password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" required/>
        <label htmlFor="birthDate">birth date</label>
        <input value={birtDate} onChange={(e) => setBirtDate(e.target.value)} type="date"  id="birtDate" name="birth date" required/>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default Register;
