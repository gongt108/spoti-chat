import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Signin.module.css';
import axios from 'axios';
import Image from 'next/image';

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

	// useEffect(() => {
	// 	clearForm();
	//   }, [user]);

	const handleChange = (e) => {
		// e.preventDefault();
		setUser((prevValue) => {
			return {
				...prevValue,
				[e.target.name]: e.target.value,
			};
		});
	};

	// const clearForm = () => {
	// 	setUser({
	// 	  firstName: '',
	// 	  lastName: '',
	// 	  email: '',
	// 	  username: '',
	// 	  password: '',
	// 	  confirmPassword: '',
	// 	});
	//   };

	const onSubmit = async (e) => {
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
				router.push('/spotiLogs/spotiLog');
			})
			.catch((error) => {
				console.error('Error creating new user', error);
			});
	};
	const clearForm = () => {
		setUser({
			firstName: '',
			lastName: '',
			email: '',
			username: '',
			password: '',
			confirmPassword: '',
		});
	};

	return (
		<div>
			<div className={styles.mainContainer}>
				<Image
					className={styles.image}
					width={1425}
					height={940}
					src={'/images/signUp-Image.png'}
					alt="Description of the image"
				/>
				<div className={styles.container}>
					<Image
						className={styles.formImage}
						width={300}
						height={250}
						src={'/images/logo.png'}
						alt="Description of the image"
					/>
					<form className={styles.form} onSubmit={handleChange}>
						<div className={styles.formGroup}>
							<label className={styles.label}></label>
							<input
								className={styles.input}
								type="text"
								placeholder='First Name'
								name="firstName"
								onChange={handleChange}
								required
							/>
						</div>
						<div className={styles.formGroup}>
							<label className={styles.label}></label>
							<input
								className={styles.input}
								type="text"
								placeholder='Last Name'
								name="lastName"
								onChange={handleChange}
								required
							/>
						</div>
						<div className={styles.formGroup}>
							<label className={styles.label}></label>
							<input
								className={styles.input}
								type="text"
								placeholder='Email'
								name="email"
								onChange={handleChange}
								required
							/>
						</div>
						<div className={styles.formGroup}>
							<label className={styles.label}></label>
							<input
								className={styles.input}
								type="password"
								placeholder='Password'
								name="password"
								onChange={handleChange}
								required
							/>
						</div>
						<div className={styles.formGroup}>
							<label className={styles.label}></label>
							<input
								className={styles.input}
								type="password"
								placeholder='Confirm Password'
								name="confirmPassword"
								onChange={handleChange}
								required
							/>
						</div>

						<div className={styles.formGroup}>
							<label className={styles.label}></label>
							<input
								className={styles.input}
								type="text"
								placeholder='Username'
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
		</div>
	);
};

export default Signup;

