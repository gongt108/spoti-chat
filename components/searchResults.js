import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/Search.module.css';
import SearchNav from './searchNav';

import ArtistShareCard from './artistShareCard';
import AlbumShareCard from './albumShareCard';
import SongShareCard from './songShareCard';
import Alert from './alert';

function SearchResults({ data, searchType }) {
	const [loading, setLoading] = useState(true);
	const [displayResult, setDisplayResult] = useState();
	const [isAlerted, setIsAlerted] = useState(false);
	const [alertMessage, setAlertMessage] = useState();

	const showAlert = () => {
		// alert("Sorry, we couldn't find any results for your query.");
		// console.log(alertMessage);
		setIsAlerted(true);
		setTimeout(() => {
			setIsAlerted(false);
		}, 1000);
	};

	// showAlert();

	// console.log(data);
	useEffect(() => {
		if (searchType === 'album') {
			const dataMap = data.map((album, i) => {
				return (
					<AlbumShareCard
						albumName={album.name}
						artistName={album.artists[0].name}
						albumId={album.id}
						albumArt={album.images[0].url}
						key={i}
						showAlert={showAlert}
					/>
				);
			});
			setDisplayResult(dataMap);
			setLoading(false);
		} else if (searchType === 'track') {
			const dataMap = data.map((track, i) => {
				return (
					<SongShareCard
						albumName={track.name}
						artistName={track.artists[0].name}
						albumId={track.id}
						albumArt={
							track.album.images[0]?.url || '/images/default-artwork.png'
						}
						key={i}
						trackName={track.name}
						showAlert={showAlert}
					/>
				);
			});
			setDisplayResult(dataMap);

			setLoading(false);
		} else if (searchType === 'artist') {
			const dataMap = data.map((artist, i) => {
				return (
					<ArtistShareCard
						artistName={artist.name}
						artistId={artist.id}
						artistArt={artist?.images[0]?.url || '/images/default-artwork.png'}
						key={i}
						showAlert={showAlert}
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
		<div className={styles.searchResultContainer}>
			{/* <Image src="/images/madeon-good-faith.jpg" width={50} height={50} /> */}
			{isAlerted && <Alert />}
			{!loading && displayResult}
		</div>
	);
}

export default SearchResults;
