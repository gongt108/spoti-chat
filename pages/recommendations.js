// Importing the necessary modules and components
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Recommendation.module.css';
import SpotifyWebApi from 'spotify-web-api-node';
import RecommendationNav from '../components/recommendationNav';
import RecommendationResults from '../components/recommendationResults';
import cookie from 'js-cookie';
import { useSearchParams } from 'next/navigation';

// Creating a Spotify Web API instance
const spotifyApi = new SpotifyWebApi({
	clientId: process.env.SPOTIFY_CLIENT_ID,
});

// Defining the Recommendation functional component
function Recommendation() {

	// Setting up state variables for search query, access token, user ID, and recommendation data
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	// Fetching recommendation parameters from URL search parameters
	const searchParams = useSearchParams();
	const recommendationId = searchParams.get('recommendationId') || '';
	const recommendationType = searchParams.get('recommendationType') || '';
	const accessToken = cookie.get('accessToken');

	// useEffect hook to fetch recommendation data from Spotify API
	//fetching recommendation data from the Spotify API when the component mounts or when the dependencies (recommendationId, recommendationType, accessToken) change.
	useEffect(() => {

		// Async function to fetch data
		const fetchData = async () => {
			setLoading(true);
			try {

				// Making an HTTP GET request to Spotify API recommendations endpoint
				const { data: res } = await axios.get(
					`https://api.spotify.com/v1/recommendations?seed_${recommendationType}s=${recommendationId}`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);

				// Logging tracks data to the console
				console.log(res.tracks);

				// Switch statement to set data based on recommendation type
				switch (recommendationType) {
					case 'genre':
						setData(res.tracks);
						break;
					case 'track':
						setData(res.tracks);
						break;
					case 'artist':
						setData(res.tracks);
						break;
					default:
						setData([]);
				}
			} catch (error) {
				// Handling errors, e.g., logging to the console
				console.error(error);
			}

			// Updating loading state after data fetch
			setLoading(false);
		};

		// Calling the fetchData function
		fetchData();
	}, [recommendationId, recommendationType, accessToken]); // The useEffect will re-run whenever these dependencies change

	// JSX representing the Recommendation component
	return (
		<div className={styles.recommendationContainer}>
			{/* Rendering RecommendationNav component */}
			<RecommendationNav />

			{/* Conditional rendering based on data length */}
			{data.length <= 0 && (
				<h3 className={styles.placeholderRecommendationResults}>
					Type in a recommendation term to find results
				</h3>
			)}

			{/* Conditional rendering based on loading state and data length */}
			{!loading && data.length > 0 && (
				<div className={styles.recommendationContainerResultContainer}>
					{/* Rendering RecommendationResults component */}

					<RecommendationResults
						data={data}
						recommendationType={recommendationType}
					/>

				</div>
			)}
			{/* Empty placeholder to be filled if needed */}
			{/* {} */}
		</div>
	);
}

// Exporting the Recommendation component as the default export
export default Recommendation;

