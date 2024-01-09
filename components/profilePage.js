// Importing necessary modules and components
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import styles from '../styles/Profile.module.css';

// Profile functional component
const ProfilePage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState({});
	const userId = cookie.get('userId');

	useEffect(() => {
		getUserData();
	}, []);

	const getUserData = async () => {
		await axios
			.get(
				`${process.env.NEXT_PUBLIC_HEROKU_SERVER_URL}/id/${cookie.get(
					'userId'
				)}`
			)
			.then((response) => {
				setUser(response.data);
				setIsLoading(false);
			})
			.catch((error) => console.log('error fectching user data'));
	};

	return (
		<div className={styles.profileContainer}>
			{!isLoading && (
				<div>
					<img
						src="/images/SlackProfile.png"
						alt="Profile Picture"
						className={styles.profilePicture}
					/>
					<h1 className={styles.profileName}>Keya Moradi</h1>
					<p className={styles.profileBio}>Web Developer</p>
				</div>
			)}
		</div>
	);
};

// Exporting the Profile component as the default export
export default ProfilePage;
