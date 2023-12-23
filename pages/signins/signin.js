import React, { useState } from 'react';
import styles from '../../styles/Signin.module.css';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      const token = data.token;

      // Store the token in localStorage or Redux state
      console.log('Login successful, token:', token);
    } catch (error) {
      setError('Invalid credentials. Please try again.');
      console.error('Error logging in:', error.message);
    }
  };


  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
      <h1 className={styles.title}>SPOTI-CHAT</h1>
        <h2 className={styles.header}>Signup</h2>
        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input className={styles.input} type="text" value={email} onChange={handleEmailChange} required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <input className={styles.input} type="password" value={password} onChange={handlePasswordChange} required />
          </div>
          <button className={styles.button} type="submit">Signup</button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};



export default Signin;

