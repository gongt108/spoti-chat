/// use the GET route for user
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useAuth from './useAuth';
import axios from 'axios';
import styles from '../styles/Profile.module.css';
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
export default function Profile() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const code = cookie.get('code');
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
