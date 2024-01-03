import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import useAuth from './useAuth';
import styles from '../styles/Recommendation.module.css';

import SpotifyWebApi from 'spotify-web-api-node';
import RecommendationNav from '../components/recommendationNav';
import RecommendationResults from '../components/recommendationResults';
import cookie from 'js-cookie';
import { useSearchParams } from 'next/navigation';

const spotifyApi = new SpotifyWebApi({
	clientId: process.env.SPOTIFY_CLIENT_ID,
});

function Recommendation() {
	// let data = {};
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	// const code = recommendationParams.get('code');
	// get user inputted recommendation term
	const searchParams = useSearchParams();
	const recommendationId = searchParams.get('recommendationId') || '';
	const recommendationType = searchParams.get('recommendationType') || '';

	// retrieve access code from cookies
	const accessToken = cookie.get('accessToken');

	// get data from Spotify API
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const { data: res } = await axios.get(
					`https://api.spotify.com/v1/recommendations?seed_${recommendationType}s=${recommendationId}`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);
				console.log(res);
				switch (recommendationType) {
					case 'genre':
						setData(res.albums.items);
						break;
					case 'track':
						setData(res.artists.items);
						break;
					case 'artist':
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
	}, [recommendationId, recommendationType]);

	// albums
	// albumName: res.data.artists.items[idx].name
	// albumId: res.data.artists.items[idx].id
	// albumArt: res.data.artists.items[idx].images[0].url
	// artistName: res.data.tracks.items[idx].artists[0].name
	// type: 'album'
	// data = res.data.albums.items;

	// artists
	// artistName: res.data.artists.items[idx].name
	// artistId: res.data.artists.items[idx].id
	// artistArt: res.data.artists.items[idx].images[0].url
	// type: 'artist'
	// data = res.data.artists.items;

	// 		// tracks
	// trackName: res.data.tracks.items[idx].name
	// trackId: res.data.tracks.items[idx].id
	// albumArt: res.data.tracks.items[idx].album.images[0].url
	// artistName: res.data.tracks.items[idx].artists[0].name
	// type: 'track'
	// data = res.data.tracks.items;

	return (
		<div className={styles.recommendationContainer}>
			<RecommendationNav />
			{data.length <= 0 && (
				<h3 className={styles.placeholderRecommendationResults}>
					Type in recommendation term to find results
				</h3>
			)}
			{!loading && data.length > 0 && (
				<div className={styles.recommendationContainerResultContainer}>
					<RecommendationResults data={data} recommendationType={recommendationType} />
				</div>
			)}
			{/* <RecommendationResults data={data} /> */}
		</div>
	);
}

export default Recommendation;