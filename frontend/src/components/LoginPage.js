import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";



const baseServerUrl = "http://localhost:8080"

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Logging in with:', email, password);

    try {
        const res = await axios.post(`${baseServerUrl}/user/login`, {
            email,password
        })
        alert(res.data.msg)
        localStorage.setItem("token", res.data.token)
        navigate('/');
        window.location.reload();
    } catch (error) {
        console.log(error.message)
        alert("Something wrong! / User already exists")
    }


    // Reset the form fields after submission
    setEmail('');
    setPassword('');
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
