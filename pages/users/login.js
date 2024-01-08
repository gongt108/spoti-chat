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
		await axios.get(`http://localhost:8000/users/${email}`).then((response) => {
			if (password === response.data.password) {
				cookie.set('userId', response.data._id, { expires: oneHour });
				cookie.set(
					'name',
					response.data.firstName + ' ' + response.data.lastName,
					{ expires: oneHour }
				);
				router.push('/');
			} else {
				setError('PASSWORD IS INCORRECT');
			}
		});
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
				<div className={styles.formImageContainer}>
					<Image
						className={styles.formImage}
						width={300}
						height={250}
						src={'/images/logo.png'}
						alt="Description of the image"
					/>
				</div>
				<form className={styles.form} onSubmit={handleLogin}>
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
					<button
						onClick={() => router.push('/users/signup')}
						className={styles.button}
						type="button"
					>
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
