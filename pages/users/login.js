import React, { useState, useEffect } from 'react';

import styles from '../../styles/Login.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const userId = cookie.get('userId');

	const router = useRouter();
	const oneHour = 1 / 24;

	// useEffect(() => {
	// 	userId ? router.push('/') : null;
	// });

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		console.log(email);
		await axios.get(`http://localhost:8000/users/${email}`).then((response) => {
			console.log(response.data);
			console.log(password);
			if (password === response.data.password) {
				cookie.set('userId', response.data._id, { expires: oneHour });
				// console.log(response.data._id);
				router.push('/');
			} else {
				setError('PASSWORD IS INCORRECT');
			}
		});
	};

	return (
		<div className={styles.mainContainer}>
			<div className={styles.container}>
				<h1 className={styles.title}>SPOTI-CHAT</h1>
				<h2 className={styles.header}>Login</h2>
				<form className={styles.form} onSubmit={handleLogin}>
					<div className={styles.formGroup}>
						<label className={styles.label}>Email</label>
						<input
							className={styles.input}
							type="text"
							value={email}
							onChange={handleEmailChange}
							required
						/>
					</div>
					<div className={styles.formGroup}>
						<label className={styles.label}>Password</label>
						<input
							className={styles.input}
							type="password"
							value={password}
							onChange={handlePasswordChange}
							required
						/>
					</div>
					<button type="submit">Login</button>
				</form>
				{error && <p className={styles.error}>{error}</p>}
			</div>
		</div>
	);
};

export default Login;
