import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory
import styles from '../../styles/Login.module.css';
import axios from 'axios';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // const history = useHistory(); // Initialize useHistory

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email)
   await axios.get(`http://localhost:8000/users/${email}`)
      .then(response => {
           console.log(response.data)
      }) 

      
    
    // try {
    //   const response = await fetch('http://localhost:3000/api/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email, password }),
    //   });

      // if (!response.ok) {
      //   throw new Error('Invalid credentials');
      // }

      // const data = await response.json();
    //   const token = data.token;

    //   // Store the token in localStorage or Redux state
    //   localStorage.setItem('token', token);

    //   // Redirect to a different route upon successful login
    //   history.push('/dashboard'); // Change '/dashboard' to your desired route
    // } catch (error) {
    //   setError('Invalid credentials. Please try again.');
    //   console.error('Error logging in:', error.message);
    // }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <h1 className={styles.title}>SPOTI-CHAT</h1>
        <h2 className={styles.header}>Login</h2>
        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input className={styles.input} type="text" value={email} onChange={handleEmailChange} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <input className={styles.input} type="password" value={password} onChange={handlePasswordChange} required />
          </div>
          <button type="submit">Login</button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
