import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import cookie from 'js-cookie';

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=92b0246161e84e68b0e078e1161ccef2&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

function SpotifyLogin() {
	useEffect(() => {
		const userId = cookie.get('userId');
		userId ? null : router.push('/users/login');
		console.log(userId);
	}, []);
	return (
		<div className={styles.spotifyLoginBtn}>
			<Link href={AUTH_URL}>Login With Spotify</Link>
		</div>
	);
}

export default SpotifyLogin;
