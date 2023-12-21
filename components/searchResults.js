import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/Search.module.css';
import SearchNav from './searchNav';

import ArtistShareCard from './artistShareCard';
import AlbumShareCard from './albumShareCard';
import SongShareCard from './songShareCard';

function SearchResults({ data, searchType }) {
	const [loading, setLoading] = useState(true);
	const [displayResult, setDisplayResult] = useState();
	// let displayResult;

	console.log(data);
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
			{!loading && displayResult}
		</div>
	);
}

export default SearchResults;
