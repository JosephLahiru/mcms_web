import React, { useState } from "react";
import "../css/login.css";


export const Login = () => {
  const [userName, setuserName] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userName);
  }

  return (
    <div className = "main-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Welcome to MCMS</h1>
        <h3>Login</h3>
        <label for="username">Username: </label>
        <input value={userName} onChange={(e) => setuserName(e.target.value)} type="username" name="username" id="userName"></input>
        <label for="password">Password: </label>
        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" id="password" name="password"></input>
        <button>Log In</button>
      </form>
    </div>
  )
}
