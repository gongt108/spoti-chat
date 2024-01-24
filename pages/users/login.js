import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/Login.module.css';
import axios from 'axios';
import cookie from 'js-cookie';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const userId = cookie.get('userId');

	const router = useRouter();
	const oneHour = 1 / 24;

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		console.log(email, password);
		await axios
			.get(`${process.env.NEXT_PUBLIC_HEROKU_SERVER_URL}/users/${email}`, {
				headers: { 'Access-Control-Allow-Origin': '*' },
			})
			.then((response) => {
				console.log(response.data);
				// if (password === response.data.password) {
				// 	cookie.set('userId', response.data._id, { expires: oneHour });
				// 	cookie.set(
				// 		'name',
				// 		response.data.firstName + ' ' + response.data.lastName,
				// 		{ expires: oneHour }
				// 	);
				// 	router.push('/');
				// } else {
				// 	setError('Please check login credentials.');
				// }
			})
			.catch((error) => console.error(error));
	};

	return (
		<div className={styles.mainContainer}>
			<div className={styles.imgContainer}>
				<Image
					className={styles.mainImage}
					fill={true}
					src={'/images/login-Image.jpeg'}
					alt="Description of the image"
				/>
			</div>
			<div className={styles.container}>
				<form className={styles.form} onSubmit={handleLogin}>
					<div className={styles.formImageContainer}>
						<Image
							className={styles.formImage}
							width={300}
							height={250}
							src={'/images/logo.png'}
							alt="Description of the image"
						/>
					</div>
					<div className={styles.formGroup}>
						<label className={styles.label}></label>
						<input
							className={styles.input}
							type="text"
							placeholder="Email"
							name="email"
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
							onChange={handlePasswordChange}
							required
						/>
					</div>
					<button className={styles.button} type="submit">
						Login
					</button>
					<p className={styles.signupBtnText}>
						Don't have an account? Sign up!
					</p>
					<button
						onClick={() => router.push('/users/signup')}
						className={styles.signupBtn}
						type="button"
					>
						Signup
					</button>
					{error && <p className={styles.error}>{error}</p>}
				</form>
			</div>
		</div>
	);
};

export default Login;
