import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/Recommendation.module.css';
import RecommendationNav from './recommendationNav';

import ArtistShareCard from './artistShareCard';
import AlbumShareCard from './albumShareCard';
import SongShareCard from './songShareCard';

function RecommendationResults({ data, recommendationType }) {
	const [loading, setLoading] = useState(true);
	const [displayResult, setDisplayResult] = useState();

	// choose display card based on data type
	useEffect(() => {
		const dataMap = data.map((track, i) => {
			return (
				<SongShareCard
					albumName={track.name}
					artistName={track.artists[0].name}
					trackId={track.id}
					albumArt={
						track.album.images[0]?.url || '/images/default-artwork.png'
					}
					key={i}
					trackName={track.name}
					trackUri={track.uri}
				/>
			);
		});
		setDisplayResult(dataMap);
		setLoading(false);
	}, []);

	// const albumDisplay = data.map((item, idx) => {
	// 	return <ArtistShareCard />;
	// });

	return (
		<div className={styles.recommendationResultContainer}>
			{/* <Image src="/images/madeon-good-faith.jpg" width={50} height={50} /> */}
			{!loading && displayResult}
		</div>
	);
}

export default RecommendationResults;
