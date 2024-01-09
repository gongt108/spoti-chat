/// use the GET route for user
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../styles/Profile.module.css';
import Newsfeed from '../components/newsfeed';
import { useSearchParams } from 'next/navigation';
import cookie from 'js-cookie';
import Link from 'next/link';
import Image from 'next/image';
import ProfilePage from '../components/profilePage';
import EditProfilePage from '../components/editProfilePage';

function Profile() {
	const [isLoading, setIsLoading] = useState(true);
	const [isEditing, setIsEditing] = useState(true);
	const [user, setUser] = useState({});
	const userId = cookie.get('userId');
	console.log(userId);
	useEffect(() => {
		userId ? null : router.push('/users/login');
		setIsLoading(true);
		getUserData(cookie.get('userId'));
	}, []);

	const getUserData = async (userId) => {
		console.log(userId);
		await axios
			.get(`${process.env.NEXT_PUBLIC_HEROKU_SERVER_URL}/users/${userId}/id`)
			.then((response) => {
				setUser(response.data);
				setIsLoading(false);
			})
			.catch((error) =>
				console.error("error fetching user's user data", error)
			);
	};

	return (
		<div className={styles.profileContainer}>
			{!isEditing && <ProfilePage user={user} />}
			{isEditing && <EditProfilePage user={user} />}
		</div>
	);
}

export default Profile;
