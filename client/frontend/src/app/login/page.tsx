'use client'
import React, { useState } from 'react';
import './login.css';
import axios from 'axios';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Create a JSON object with username and password
    const loginData = {
      username: username,
      password: password,
    };

    // Send a POST request to your server for authentication
    axios
      .post("http://127.0.0.1:5000/login", loginData)
      .then((response) => {
        // Assuming the server responds with authentication status and redirection URL
        if (response.data.authenticated) {
          // Redirect to the URL provided by the server
          window.location.href = response.data.redirectURL;
        } else {
          alert('Login failed. Please check your credentials.');
        }
      })
      .catch((error) => {
        console.error('An error occurred:', error);
        alert('Login failed. An error occurred.');
      });
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
