import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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
			// console.log(response.data);
			console.log(password);
			if (password === response.data.password) {
				cookie.set('userId', response.data._id, { expires: oneHour });
				cookie.set(
					'name',
					response.data.firstName + ' ' + response.data.lastName,
					{ expires: oneHour }
				);
				// console.log(response.data._id);
				router.push('/');
			} else {
				setError('PASSWORD IS INCORRECT');
			}
		});
	};

	return (
		<div className={styles.mainContainer}>
			<Image
				className={styles.image}
				width={1025}
				height={940}
				src={'/images/login-Image.jpeg'}
				alt="Description of the image"
			/>
			<div className={styles.container}>
				<form className={styles.form} onSubmit={handleLogin}>
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
						Login
					</button>
					<button className={styles.button} type="submit">
						Signup
					</button>
					<p>Don't have an accout? Sign up!</p>
				</form>
				{error && <p className={styles.error}>{error}</p>}
			</div>
		</div>
	);
};

export default Login;
