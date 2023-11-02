'use client'
import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../firebase'; // make sure to import your Firebase auth instance

const Logout = () => {
  useEffect(() => {
    const signOutUser = async () => {
      try {
        await auth.signOut();
        // Redirect user after successful logout
        toast.success('Logged out successfully!');
      } catch (error) {
        toast.error('Logout failed');
      }
    };
    signOutUser();
  }, []);

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh', // Full viewport height
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <ToastContainer />
      <h1>You have been logged out</h1>
      <button onClick={() => window.location.href = '/'}>
        Go to Home Page
      </button>
    </div>
  );
};

export default Logout;