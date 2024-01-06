// Importing necessary modules and components
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/Recommendation.module.css';
import RecommendationNav from './recommendationNav';
import ArtistShareCard from './artistShareCard';
import AlbumShareCard from './albumShareCard';
import SongShareCard from './songShareCard';

// Defining the RecommendationResults functional component
function RecommendationResults({ data, recommendationType }) {
	// Declaring variables to manage the 'Loading' state and 'displayeResults'
	const [loading, setLoading] = useState(true);
	const [displayResult, setDisplayResult] = useState();

	// useEffect hook to process and display recommendations when data changes
	// updating the component state 'displayResult' and 'Loading' based on changes to the data
	useEffect(() => {

		// Mapping the data to individual SongShareCard components
		const dataMap = data.map((track, i) => {
			return (
				<SongShareCard
					albumName={track.name}
					artistName={track.artists[0].name}
					trackId={track.id}
					albumArt={track.album.images[0]?.url || '/images/default-artwork.png'}
					key={i}
					trackName={track.name}
					trackUri={track.uri}
				/>
			);
		});

		// Updating variables to display the mapped results and setting the loading to be false
		setDisplayResult(dataMap);
		setLoading(false);
	}, []);

	// JSX representing the RecommendationResults component
	return (
		<div className={styles.recommendationResultContainer}>
			{!loading && displayResult}
		</div>
	);
}

// Exporting the RecommendationResults component as the default export
export default RecommendationResults;
