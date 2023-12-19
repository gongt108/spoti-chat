import React from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';
import SpotifyWebApi from 'spotify-web-api-node';
import { useSearchParams } from 'next/navigation';
import SearchResults from '../components/searchResults';

const spotifyApi = new SpotifyWebApi({
	clientId: process.env.SPOTIFY_CLIENT_ID,
});

function Search() {
	const searchParams = useSearchParams();
	const code = searchParams.get('code');
	// const accessToken = useAuth(code);

	// axios
	// 	.get(`https://api.spotify.com/v1/search?q=`, {
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

	return <SearchResults />;
}

export default Search;
