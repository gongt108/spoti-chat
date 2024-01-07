import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom'; // Import useHistory
import styles from '../../styles/Login.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter()
  // const history = useHistory(); // Initialize useHistory

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // try {
    //   const response = await axios.get(`http://localhost:8000/users/${email}`);
    //   const userData = response.data;

    console.log(email)
    await axios.get(`http://localhost:8000/users/${email}`)
      .then(response => {
        console.log(response.data)
        console.log(password)
        if (password === response.data.password) {
          router.push('/')
        } else {
          setError('PASSWORD IS INCORRECT')
        }
        // } catch (error) {
        //   setError('Invalid credentials. Please try again.');
        //   console.error('Error logging in:', error.message);
        // };

      }
      )
  };



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


  return (
    <div className={styles.mainContainer}>
      <div>
        <Image
          className={styles.mainImage}
          width={1425}
          height={940}
          src={'/images/login-Image.jpeg'}
          alt="Description of the image"
        />
      </div>
      <div className={styles.container}>
        <Image
          className={styles.formImage}
          width={300}
          height={250}
          src={'/images/logo.png'}
          alt="Description of the image"
        />
        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label className={styles.label}></label>
            <input
              className={styles.input}
              type="text"
              placeholder='Email'
              name='email'
              // value={email} 
              onChange={handleEmailChange}
              required />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}></label>
            <input
              className={styles.input}
              type="password"
              placeholder='Password'
              name='password'
              // value={password}
              onChange={handlePasswordChange}
              required />
          </div>
          <button className={styles.button} type="submit">Login</button>
          <button className={styles.button} type="submit">Signup</button>
          <p>Don't have an accout? Sign up!</p>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

export default Login

