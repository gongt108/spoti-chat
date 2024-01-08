import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import styles from '../styles/Favorites.module.css';

import SongShareCard from './songShareCard';
import AlbumShareCard from './albumShareCard';
import ArtistShareCard from './artistShareCard';

function FavoritesPage() {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({});
	const [type, setType] = useState('track');

	const userId = cookie.get('userId');

	useEffect(() => {
		setLoading(true);
		axios
			.get(`http://localhost:8000/favorites/${userId}`)
			.then((response) => {
				let favoriteTracks = response.data.filter((favorite) => {
					return favorite.type === 'track';
				});
				let favoriteAlbums = response.data.filter((favorite) => {
					return favorite.type === 'album';
				});
				let favoriteArtists = response.data.filter((favorite) => {
					return favorite.type === 'artist';
				});

				setData({
					favoriteTracks: favoriteTracks,
					favoriteAlbums: favoriteAlbums,
					favoriteArtists: favoriteArtists,
				});

				// display the data in the appropriate card layout
				// setDisplayResult(displayPosts(followingPosts));

				setLoading(false);
			})
			.catch((err) => {
				console.log('Error retrieving favorites');
			});
	}, []);

	return (
		<div className={styles.favoritesPageContainer}>
			<div className={styles.favoritesOptionContainer}>
				<h2>Favorites</h2>

				<div className={styles.favoritesOptionButtonsWrapper}>
					<div className={styles.favoritesOptionButton}>
						<input
							type="radio"
							value="track"
							name="type"
							checked={type === 'track'}
						/>
						<label htmlFor="track" onClick={() => setType('track')}>
							Tracks
						</label>
					</div>
					<div className={styles.favoritesOptionButton}>
						<input
							type="radio"
							value="album"
							name="type"
							checked={type === 'album'}
						/>
						<label htmlFor="album" onClick={() => setType('album')}>
							Albums
						</label>
					</div>
					<div className={styles.favoritesOptionButton}>
						<input
							type="radio"
							value="artist"
							name="type"
							checked={type === 'artist'}
						/>
						<label htmlFor="artist" onClick={() => setType('artist')}>
							Artists
						</label>
					</div>
				</div>
			</div>
			<div className={styles.favoritesDisplayContainer}>
				{!loading && type === 'track' && (
					<div>
						{data.favoriteTracks.map((track, i) => {
							return (
								<SongShareCard
									key={i}
									albumName={track.name}
									artistName={track.artistName}
									trackId={track.spotifyId}
									albumArt={track.imgUrl || '/images/default-artwork.png'}
									trackName={track.name}
									isFavorited={track.isFavorited}
								/>
							);
						})}
					</div>
				)}
				{!loading && type === 'album' && (
					<div>
						{data.favoriteAlbums.map((album, i) => {
							return (
								<AlbumShareCard
									key={i}
									albumName={album.name}
									artistName={album.artistName}
									albumId={album.spotifyId}
									albumArt={album.imgUrl || '/images/default-artwork.png'}
									isFavorited={album.isFavorited}
								/>
							);
						})}
					</div>
				)}
				{!loading && type === 'artist' && (
					<div>
						{data.favoriteArtists.map((artist, i) => {
							return (
								<ArtistShareCard
									key={i}
									artistName={artist.name}
									trackId={artist.spotifyId}
									artistArt={artist.imgUrl || '/images/default-artwork.png'}
									trackName={artist.name}
									isFavorited={artist.isFavorited}
								/>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}

export default FavoritesPage;
