import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import useAuth from './useAuth';
import styles from '../styles/Search.module.css';

import SpotifyWebApi from 'spotify-web-api-node';
import { useSearchParams } from 'next/navigation';
import SearchNav from '../components/searchNav';
import SearchResults from '../components/searchResults';
import cookie from 'js-cookie';

const spotifyApi = new SpotifyWebApi({
	clientId: process.env.SPOTIFY_CLIENT_ID,
});

function Search() {
	// let data = {};
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	const searchParams = useSearchParams();
	// const code = searchParams.get('code');
	// get user inputted search term
	const searchTerm = searchParams.get('searchTerm') || '';
	const searchType = searchParams.get('type') || '';

	// retrieve access code from cookies
	const accessToken = cookie.get('accessToken');

	// get data from Spotify API
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const { data: res } = await axios.get(
					`https://api.spotify.com/v1/search?q=${searchTerm}&type=${searchType}`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);
				switch (searchType) {
					case 'album':
						setData(res.albums.items);
						break;
					case 'artist':
						setData(res.artists.items);
						break;
					case 'track':
						setData(res.tracks.items);
						break;
					default:
						setData([]);
				}
			} catch (error) {
				console.error(error);
			}
			setLoading(false);
		};
		fetchData();
	}, [searchTerm, searchType]);

	return (
		<div className={styles.searchContainer}>
			<SearchNav />
			{data.length <= 0 && (
				<h3 className={styles.placeholderSearchResults}>
					Type in search term to find results
				</h3>
			)}
			{!loading && data.length > 0 && (
				<div className={styles.searchResultContainer}>
					<SearchResults data={data} searchType={searchType} />
				</div>
			)}
			{/* <SearchResults data={data} /> */}
		</div>
	);
}

export default Search;
