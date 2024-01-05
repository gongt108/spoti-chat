import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Signin.module.css';
import axios from 'axios';

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
				router.push('/spotifyLogin');
			})
			.catch((error) => {
				console.error('Error creating new user', error);
			});
	};

	return (
		<div>
			<div className={styles.mainContainer}>
				<img className={styles.image}
					src='../images/signUp-Image.png'
					alt="Description of the image"></img>
				<div className={styles.container}>
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

