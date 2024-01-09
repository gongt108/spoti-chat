// Importing necessary modules and components
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import styles from '../styles/Profile.module.css';

// Profile functional component
const EditProfilePage = ({ user }) => {
	const [isLoading, setIsLoading] = useState(true);
	const userId = cookie.get('userId');

	return (
		<div className={styles.profileContainer}>
			<form action="/">
				<div className={styles.profileTop}>
					<img
						src="/images/SlackProfile.png"
						alt="Profile Picture"
						className={styles.profilePicture}
					/>
					<h1 className={styles.profileName}>
						{user?.firstName} {user?.lastName}
					</h1>
					<input
						className={styles.input}
						type="text"
						placeholder="Email"
						name="bio"
						// onChange={handleEmailChange}
					/>
				</div>
				<div className={styles.profileDetail}>
					<div className={styles.profileInfoTitle}>
						<p className={styles.profileData}>Email address: </p>
						<p className={styles.profileData}>Username: </p>
						<p className={styles.profileData}>Password: </p>
						<p className={styles.profileData}>Date of Birth: </p>
					</div>
					<div className={styles.profileInfoDetail}>
						<input
							className={styles.input}
							type="text"
							placeholder="Email"
							name="email"
							// onChange={handleEmailChange}
							required
						/>
						<p className={styles.profileData}>{user?.username}</p>
						<p className={styles.profileData}>*********</p>
						<p className={styles.profileData}>Not set yet.</p>
					</div>
				</div>
				<div>
					<div class={styles.saveEditBtn} onClick={props.setIsEditing(true)}>
						Save Profile
					</div>
					<div class={styles.cancelEditBtn} onClick={props.setIsEditing(false)}>
						Cancel
					</div>
				</div>
			</form>
		</div>
	);
};

// Exporting the Profile component as the default export
export default EditProfilePage;
