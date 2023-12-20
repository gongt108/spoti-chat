import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from './useAuth';
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
	const searchTerm = searchParams.get('searchTerm') || '';
	// console.log(searchTerm);

	// const [accessToken, setAccessToken] = useState();
	const accessToken = useAuth(code);
	// console.log(accessToken);

	// useEffect(() => {
	// 	const token = useAuth(code);
	// 	setAccessToken(token);
	// }, [accessToken]);
	// const searchTerm = 'Taylor Swift';

	axios
		.get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
		.then((res) => {
			console.log(res.data);
		})
		.catch((error) => {
			console.error(error);
		});

	return <SearchResults />;
}

export default Search;
