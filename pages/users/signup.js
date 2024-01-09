import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
		} else if (password !== confirmPassword) {
			setError("Passwords don't match");
		} else {
			setError(''); // clear the error message
			handleSignup(e);
			console.log(user);
		}
	};

	const handleSignup = async (e) => {
		// e.preventDefault();

		axios
			.post(`${process.env.NEXT_PUBLIC_HEROKU_SERVER_URL}/users/signup`, user)
			.then((response) => {
				console.log('running');
				cookie.set('userId', response.data._id);
				router.push('/spotifyLogin');
			})
			.catch((error) => {
				console.error('Error creating new user', error);
			});
	};

	return (
		<div className={styles.mainContainer}>
			<div className={styles.imgContainer}>
				<Image
					className={styles.image}
					fill={true}
					src={'/images/signUp-Image.png'}
					alt="Description of the image"
				/>
			</div>
			<div className={styles.container}>
				<form className={styles.form} onSubmit={handleChange}>
					<Image
						className={styles.formImage}
						width={300}
						height={250}
						src={'/images/logo.png'}
						alt="Description of the image"
					/>
					<div className={styles.formGroup}>
						<label className={styles.label}></label>
						<input
							className={styles.input}
							type="text"
							placeholder="First Name"
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
							placeholder="Last Name"
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
							placeholder="Email"
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
							placeholder="Password"
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
							placeholder="Confirm Password"
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
							placeholder="Username"
							name="username"
							onChange={handleChange}
							required
						/>
					</div>
					<button className={styles.button} type="submit" onClick={onSubmit}>
						Signup
					</button>
					<p>
						<Link href="/users/login" className={styles.signupBtnText}>
							Have an account? Log in!
						</Link>
					</p>

					{error && <p className={styles.error}>{error}</p>}
				</form>
			</div>
		</div>
	);
};

export default Signup;
