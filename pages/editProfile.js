// use the PUT route for user

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head';
import useAuth from './useAuth';
import axios from 'axios';
import styles from '../styles/EditProfile.module.css';
import SpotifyWebApi from 'spotify-web-api-node';
import { useSearchParams } from 'next/navigation';
import cookie from 'js-cookie';

const spotifyApi = new SpotifyWebApi({
	clientId: process.env.SPOTIFY_CLIENT_ID,
});

import App from './_app';
import Link from 'next/link';
import Image from 'next/image';
import Newsfeed from '../components/newsfeed';

export default function editProfile() {
	const searchParams = useSearchParams();
	// const code = searchParams.get('code');
	// const accessToken = useAuth(code);
	const router = useRouter();
	const code = cookie.get('code');

	// useEffect(() => {
	// 	code ? console.log('here') : router.push('/spotifyLogin');
	// }, [code]);

	// const [currentTrack, setCurrentTrack] = useState('');
	// const [isPlaying, setIsPlaying] = useState(false);

	// const getCurrentTrack = (currentTrackURI) => {
	// 	setCurrentTrack(currentTrackURI);
	// 	setIsPlaying(true);
	// };

	// save access token in cookies after getting it fron the Spotify API
	// cookie will expire in an hour because access token from Spotify API expires in an hour
	// const oneHour = 1 / 24;
	// cookie.set('accessToken', accessToken, { expires: oneHour });

	// const searchTerm = 'dandelion';
	// axios
	// 	.get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
	// 		method: 'GET',
	// 		headers: {
	// 			Authorization: `Bearer ${accessToken}`,
	// 		},
	// 	})
	// 	.then((res) => {
	// 		console.log(res.data);
	// 	})
	// 	.catch((error) => {
	// 		console.error(error);
	// 	});

	// exporting the function Home
	return (
		<div className={styles.container}>
			<Head>
				<title>Spoti-Chat</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Newsfeed code={code} />
		</div>
	);
}
