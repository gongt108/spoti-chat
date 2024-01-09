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

function Profile() {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const userId = cookie.get('userId');
	console.log(userId);
	useEffect(() => {
		userId ? null : router.push('/users/login');
	});

	return (
		<div className={styles.profileContainer}>
			<ProfilePage userId={userId} />
		</div>
	);
}

export default Profile;
