import React, { useState } from 'react';
import styles from '../../styles/SpotiLog.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';

const SpotiLog = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const router = useRouter();
	// const history = useHistory(); // Initialize useHistory

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		await axios
			.get(`${process.env.NEXT_PUBLIC_HEROKU_SERVER_URL}/users/${email}`)
			.then((response) => {
				if (password === response.data.password) {
					router.push('/');
				} else {
					setError('PASSWORD IS INCORRECT');
				}
			});

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
			<img
				className={styles.image}
				src="../images/SpotifyLogin-Image.png"
				alt="Description of the image"
			></img>
			<div className={styles.container}>
				<form className={styles.form} onSubmit={handleLogin}>
					<button id={styles.spot} className={styles.button} type="submit">
						Spotify Login Required
					</button>
					<div className={styles.formGroup}>
						<label className={styles.label}></label>
						<input
							className={styles.input}
							type="text"
							placeholder="Email"
							name="email"
							// value={email}
							onChange={handleEmailChange}
							required
						/>
					</div>
					<div className={styles.formGroup}>
						<label className={styles.label}></label>
						<input
							className={styles.input}
							type="password"
							placeholder="Password"
							name="password"
							// value={password}
							onChange={handlePasswordChange}
							required
						/>
					</div>
					<button className={styles.button} type="submit">
						Log in to Spotify
					</button>
					<button className={styles.button} type="submit">
						Back to Spoti-Chat login
					</button>
				</form>
				{error && <p className={styles.error}>{error}</p>}
			</div>
		</div>
	);
};

export default SpotiLog;
