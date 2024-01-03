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
		if (recommendationType === 'album') {
			const dataMap = data.map((album, i) => {
				return (
					<AlbumShareCard
						key={i}
						albumName={album.name}
						artistName={album.artists[0].name}
						albumId={album.id}
						albumArt={album.images[0].url}
					/>
				);
			});
			setDisplayResult(dataMap);
			setLoading(false);
		} else if (recommendationType === 'track') {
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
		} else if (recommendationType === 'artist') {
			const dataMap = data.map((artist, i) => {
				return (
					<ArtistShareCard
						artistName={artist.name}
						artistId={artist.id}
						artistArt={artist?.images[0]?.url || '/images/default-artwork.png'}
						key={i}
					/>
				);
			});
			setDisplayResult(dataMap);

			setLoading(false);
		}
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
