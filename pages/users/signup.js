import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../../styles/Signin.module.css';
import axios from 'axios';
import cookie from 'js-cookie';

const Signup = () => {
	const [error, setError] = useState('');
	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
		email: '',
		username: '',
		password: '',
		confirmPassword: '',
	});
	const router = useRouter();

	const userId = cookie.get('userId');

	// useEffect(() => {
	// 	userId ? router.push('/') : null;
	// });

	const handleChange = (e) => {
		// e.preventDefault();
		setUser((prevValue) => {
			return {
				...prevValue,
				[e.target.name]: e.target.value,
			};
		});
	};

	const onSubmit = (e) => {
		const { firstName, lastName, email, username, password, confirmPassword } =
			user;
		e.preventDefault();

		// if any are empty, return error
		if (
			firstName === '' ||
			lastName === '' ||
			email === '' ||
			username === '' ||
			password === '' ||
			confirmPassword === ''
		) {
			setError('Missing a value');
			console.log(user);
		} else if (password !== confirmPassword) {
			setError("Passwords don't match");
		} else {
			setError(''); // clear the error message
			handleSignup(e);
		}
	};

	const handleSignup = async (e) => {
		// e.preventDefault();

		axios
			.post('http://localhost:8000/users/signup', user)
			.then((response) => {
				console.log(response.data);
				cookie.set('userId', response.data._id);
				router.push('/spotifyLogin');
			})
			.catch((error) => {
				console.error('Error creating new user', error);
			});
	};

	return (
		<div>
			<div className={styles.mainContainer}>
				<div className={styles.container}>
					<Image
						className={styles.image}
						width={1025}
						height={940}
						src={'/images/signUp-Image.png'}
						alt="Description of the image"
					/>
				</div>

				{/* <h1 className={styles.title}>SPOTI-CHAT</h1> */}
				{/* <h2 className={styles.header}>Signup</h2> */}
				<form className={styles.form} onSubmit={handleChange}>
					<div className={styles.formGroup}>
						<label className={styles.label}>First Name</label>
						<input
							className={styles.input}
							type="text"
							// value={user.firstName}
							name="firstName"
							onChange={handleChange}
							required
						/>
					</div>
					<div className={styles.formGroup}>
						<label className={styles.label}>Last Name</label>
						<input
							className={styles.input}
							type="text"
							// value={user.lastName}
							name="lastName"
							onChange={handleChange}
							required
						/>
					</div>
					<div className={styles.formGroup}>
						<label className={styles.label}>Email</label>
						<input
							className={styles.input}
							type="text"
							// value={user.email}
							name="email"
							onChange={handleChange}
							required
						/>
					</div>
					<div className={styles.formGroup}>
						<label className={styles.label}>Password</label>
						<input
							className={styles.input}
							type="password"
							// value={user.password}
							name="password"
							onChange={handleChange}
							required
						/>
					</div>
					<div className={styles.formGroup}>
						<label className={styles.label}>Confirm Password</label>
						<input
							className={styles.input}
							type="password"
							// value={user.passwordConfirm}
							name="confirmPassword"
							onChange={handleChange}
							required
						/>
					</div>

					<div className={styles.formGroup}>
						<label className={styles.label}>Username</label>
						<input
							className={styles.input}
							type="text"
							// value={user.username}
							name="username"
							onChange={handleChange}
							required
						/>
					</div>
					<button className={styles.button} type="submit" onClick={onSubmit}>
						Signup
					</button>
				</form>
				{error && <p className={styles.error}>{error}</p>}
			</div>
		</div>
	);
};

export default Signup;
