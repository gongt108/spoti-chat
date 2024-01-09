// Importing necessary modules and components
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

import axios from 'axios';
import cookie from 'js-cookie';
import styles from '../styles/Profile.module.css';

// Profile functional component
const EditProfilePage = ({ user, setIsEditing }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');
	const userId = cookie.get('userId');
	const searchParams = useSearchParams();
	const code = searchParams.get('code');
	const router = useRouter();

	const [userInput, setUserInput] = useState({
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		username: user.username,
		password: user.password,
		confirmPassword: user.password,
		bio: user.bio || '',
		dateOfBirth: user.dateOfBirth || 'N/A',
	});

	const handleChange = (e) => {
		// e.preventDefault();
		setUserInput((prevValue) => {
			return {
				...prevValue,
				[e.target.name]: e.target.value,
			};
		});
	};

	const onSubmit = async (e) => {
		// console.log(userInput);
		const {
			firstName,
			lastName,
			email,
			username,
			password,
			confirmPassword,
			bio,
			dateOfBirth,
		} = userInput;
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
			console.log(password);
			console.log(confirmPassword);
			setError("Passwords don't match");
		} else {
			setError(''); // clear the error message
			handleEditUser(e);
		}
	};

	const handleEditUser = async (e) => {
		e.preventDefault();
		console.log(user._id);

		axios
			.put(
				`${process.env.NEXT_PUBLIC_HEROKU_SERVER_URL}/users/${user._id}`,
				userInput
			)
			.then((response) => {
				// console.log(response.data);
				router.push(`/?code=${code}`);
				setIsEditing(false);
			})
			.catch((error) => {
				console.error('Error editing new user', error);
			});
	};

	return (
		<div className={styles.container}>
			<div className={styles.profileTop}>
				<img
					src="/images/SlackProfile.png"
					alt="Profile Picture"
					className={styles.profilePicture}
				/>
			</div>
			{error}
			<form className={styles.profileInputForm}>
				<div className={styles.profileEditDetail}>
					<div className={styles.profileInputContainer}>
						<div className={styles.profileInputLabel}>First name: </div>
						<input
							className={styles.input}
							type="text"
							value={userInput.firstName}
							name="firstName"
							onChange={handleChange}
							required
						/>
					</div>

					<div className={styles.profileInputContainer}>
						<div className={styles.profileInputLabel}>Last name: </div>
						<input
							className={styles.input}
							type="text"
							value={userInput.lastName}
							name="lastName"
							onChange={handleChange}
							required
						/>
					</div>

					<div className={styles.profileInputContainer}>
						<div className={styles.profileInputLabel}>Email address: </div>
						<input
							className={styles.input}
							type="text"
							value={userInput.email}
							name="email"
							onChange={handleChange}
							required
						/>
					</div>

					<div className={styles.profileInputContainer}>
						<div className={styles.profileInputLabel}>Username: </div>
						<input
							className={styles.input}
							type="text"
							value={userInput.username}
							name="username"
							onChange={handleChange}
							required
						/>
					</div>

					<div className={styles.profileInputContainer}>
						<div className={styles.profileInputLabel}>Password: </div>
						<input
							className={styles.input}
							type="password"
							value={userInput.password}
							name="password"
							onChange={handleChange}
							required
						/>
					</div>

					<div className={styles.profileInputContainer}>
						<div className={styles.profileInputLabel}>Confirm password: </div>
						<input
							className={styles.input}
							type="password"
							value={userInput.confirmPassword}
							name="confirmPassword"
							onChange={handleChange}
							required
						/>
					</div>

					<div className={styles.profileInputContainer}>
						<div className={styles.profileInputLabel}>Date of Birth: </div>
						<input
							className={styles.input}
							type="text"
							value={userInput.dateOfBirth}
							name="dateOfBirth"
							onChange={handleChange}
						/>
					</div>

					<div className={styles.profileInputContainer}>
						<div className={styles.profileInputLabel}>Bio: </div>
						<textarea
							className={styles.textarea}
							type="textArea"
							value={userInput.bio}
							name="bio"
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className={styles.btnContainer}>
					<div class={styles.saveEditBtn} onClick={onSubmit}>
						Save Profile
					</div>
					<div class={styles.cancelEditBtn} onClick={() => setIsEditing(false)}>
						Cancel
					</div>
				</div>
			</form>
		</div>
	);
};

// Exporting the Profile component as the default export
export default EditProfilePage;
