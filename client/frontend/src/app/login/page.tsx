'use client'
import React from 'react';
import { auth } from '../firebase';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css'

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  height: '100vh', // Full viewport height
  textAlign: 'center',
};

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(email, password);
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (user) return (
    <div style={containerStyle}>
      <ToastContainer />
      <h1>Logged in successfully!</h1>
      <button onClick={() => window.location.href = '/'}>
        Go to Home Page
      </button>
    </div>
  );

  return (
    <div className="login-container"> {/* Step 4: Apply the CSS class */}
      <h1>Login</h1> {/* Optional: Added an H1 element for the title */}
      <form onSubmit={handleSubmit} className="input-container"> {/* Step 4: Apply the CSS class */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
