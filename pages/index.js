import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import useAuth from './useAuth';
import axios from 'axios';
import styles from '../styles/Home.module.css';
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

export default function Home() {
	const searchParams = useSearchParams();
	const code = searchParams.get('code');
	const accessToken = useAuth(code);
	// const [accessToken, setAccessToken] = useState();
	// console.log(accessToken);
	// const [search, setSearch] = useState('');

	// useEffect(() => {
	// 	const token = useAuth(code);
	// 	setAccessToken(token);
	// }, [accessToken]);
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

	// axios
	// 	.get('https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl', {
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

			<Newsfeed accessToken={accessToken} />

			{/* <footer>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{' '}
					<img src="/vercel.svg" alt="Vercel" className={styles.logo} />
				</a>
			</footer> */}

			{/* <style jsx>{`
				main {
					padding: 5rem 0;
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}
				footer {
					width: 100%;
					height: 100px;
					border-top: 1px solid #eaeaea;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				footer img {
					margin-left: 0.5rem;
				}
				footer a {
					display: flex;
					justify-content: center;
					align-items: center;
					text-decoration: none;
					color: inherit;
				}
				code {
					background: #fafafa;
					border-radius: 5px;
					padding: 0.75rem;
					font-size: 1.1rem;
					font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
						DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
				}
			`}</style>

			<style jsx global>{`
				html,
				body {
					padding: 0;
					margin: 0;
					font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
						Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
						sans-serif;
				}
				* {
					box-sizing: border-box;
				}
			`}</style> */}
		</div>
	);
}

export const getServerSideProprs = async () => {
	// get list of shared posts from database, limit to latest 20
	// create array of shared posts objects sorted by time created
	// get data from api
	// return array to be used by newsfeed
};
