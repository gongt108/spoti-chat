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

	// console.log(searchType);

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
						// console.log(res);
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
	}, [searchTerm]);
	// axios
	// 	.get(
	// 		`https://api.spotify.com/v1/search?q=${searchTerm}&type=${searchType}`,
	// 		{
	// 			method: 'GET',
	// 			headers: {
	// 				Authorization: `Bearer ${accessToken}`,
	// 			},
	// 		}
	// 	)
	// 	.then((res) => {
	// 		// albums
	// 		// console.log(res.data.albums.items[0].artists[0].name);
	// 		// albumName: res.data.artists.items[idx].name
	// 		// albumId: res.data.artists.items[idx].id
	// 		// albumArt: res.data.artists.items[idx].images[0].url
	// 		// artistName: res.data.tracks.items[idx].artists[0].name
	// 		// type: 'album'
	// 		// data = res.data.albums.items;

	// 		// artists
	// 		// console.log(res.data.artists.items[0].images[0].url);
	// 		// artistName: res.data.artists.items[idx].name
	// 		// artistId: res.data.artists.items[idx].id
	// 		// artistArt: res.data.artists.items[idx].images[0].url
	// 		// type: 'artist'
	// 		// data = res.data.artists.items;

	// 		// tracks
	// 		console.log(res.data.tracks.items);
	// trackName: res.data.tracks.items[idx].name
	// trackId: res.data.tracks.items[idx].id
	// albumArt: res.data.tracks.items[idx].album.images[0].url
	// artistName: res.data.tracks.items[idx].artists[0].name
	// type: 'track'
	// data = res.data.tracks.items;

	// switch (searchType) {
	// 	case 'album':
	// 		setData(res.data.albums.items);
	// 		break;
	// 	case 'artist':
	// 		setData(res.data.artists.items);
	// 		break;
	// 	case 'track':
	// 		setData(res.data.tracks.items);
	// 		break;
	// 	default:
	// 		setData([]);
	// }
	// 	})
	// 	.catch((error) => {
	// 		console.error(error);
	// 	});
	// console.log(data);

	return (
		<div className={styles.searchContainer}>
			<SearchNav />
			{!loading && data.length && (
				<div className={styles.searchResultContainer}>
					<SearchResults data={data} searchType={searchType} />
				</div>
			)}
			{/* <SearchResults data={data} /> */}
		</div>
	);
}

export default Search;
