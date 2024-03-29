// Importing necessary modules and components
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import styles from '../styles/Profile.module.css';

// Profile functional component
const ProfilePage = ({ user, setIsEditing }) => {
	const [isLoading, setIsLoading] = useState(true);
	const userId = cookie.get('userId');

	return (
		<div className={styles.container}>
			<div className={styles.profileTop}>
				<img
					src="/images/SlackProfile.png"
					alt="Profile Picture"
					className={styles.profilePicture}
				/>
				<h1 className={styles.profileName}>
					{user?.firstName} {user?.lastName}
				</h1>
				<p className={styles.profileBio}>{user.bio || 'No bio yet.'}</p>
			</div>
			<div className={styles.profileDetail}>
				<div className={styles.profileInfoTitle}>
					<p className={styles.profileData}>Email address: </p>
					<p className={styles.profileData}>Username: </p>
					<p className={styles.profileData}>Password: </p>
					<p className={styles.profileData}>Date of Birth: </p>
				</div>
				<div className={styles.profileInfoDetail}>
					<p className={styles.profileData}>{user?.email}</p>
					<p className={styles.profileData}>{user?.username}</p>
					<p className={styles.profileData}>*********</p>
					<p className={styles.profileData}>Not set yet.</p>
				</div>
			</div>
			<div class={styles.editBtn} onClick={() => setIsEditing(true)}>
				Edit Profile
			</div>
		</div>
	);
};

// Exporting the Profile component as the default export
export default ProfilePage;
