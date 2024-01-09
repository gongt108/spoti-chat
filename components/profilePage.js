// Importing necessary modules and components
import React from 'react';
import styles from '../styles/Profile.module.css';

// Profile functional component
const ProfilePage = () => {
	return (
		<div className={styles.profileContainer}>
			<img
				src="/images/SlackProfile.png"
				alt="Profile Picture"
				className={styles.profilePicture}
			/>
			<h1 className={styles.profileName}>Keya Moradi</h1>
			<p className={styles.profileBio}>Web Developer</p>
		</div>
	);
};

// Exporting the Profile component as the default export
export default ProfilePage;
