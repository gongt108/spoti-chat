import React, { useState } from 'react';
import styles from '../../styles/Signin.module.css';
import axios from 'axios';

const Signup = () => {
	// const [email, setEmail] = useState('');
	// const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
		email: '',
		username: '',
		password: '',
		confirmPassword: '',
	});

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
		// console.log(firstName);

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

	// const handleEmailChange = (e) => {
	// 	setEmail(e.target.value);
	// };

	// const handlePasswordChange = (e) => {
	// 	setPassword(e.target.value);
	// };

	const handleSignup = async (e) => {
		e.preventDefault();

		axios
			.post('http://localhost:8000/users/signup', user)
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.error('Error creating new user', error);
			});

		// try {
		// 	const response = await fetch('http://localhost:8000/users/signup', {
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 		},
		// 		body: JSON.stringify({ email, password }),
		// 	});

		// 	if (!response.ok) {
		// 		throw new Error('Invalid credentials');
		// 	}

		// 	const data = await response.json();
		// 	const token = data.token;

		// 	// Store the token in localStorage or Redux state
		// 	console.log('Login successful, token:', token);
		// } catch (error) {
		// 	setError('Invalid credentials. Please try again.');
		// 	console.error('Error logging in:', error.message);
		// }
	};

	return (
		<div className={styles.mainContainer}>
			<div className={styles.container}>
				<h1 className={styles.title}>SPOTI-CHAT</h1>
				<h2 className={styles.header}>Signup</h2>
				<form className={styles.form} onSubmit={handleChange}>
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
