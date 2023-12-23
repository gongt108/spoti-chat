import React from 'react';
import Image from 'next/image';
import axios from 'axios';

import styles from '../styles/ShareCard.module.css';
import { FaPlay, FaBookmark, FaThumbsUp } from 'react-icons/fa6';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { PiShareFatLight } from 'react-icons/pi';

function ArtistShareCard(props) {
	const artist = {
		spotifyId: props.artistId,
		postType: 'artist',
		userId: '65826cf1311fe591fdaa60e0',
		imgUrl: props.artistArt,
		artistName: props.artistName,
	};

	const handleSave = (e) => {
		console.log('clicked save');
	};

	const handleShare = (e) => {
		// save to favorites
		// albumId = props.id
		// type = 'album'
		axios.post('http://localhost:8000/posts/new', artist).catch((err) => {
			e.preventDefault();
			console.log('Error in Post!', err);
		});
	};

	return (
		<div className={styles.shareCardContainer}>
			{/* <h4>Tiffany shared an artist</h4> */}
			<div className={styles.shareArtistCard}>
				<Image
					src={artist.imgUrl}
					width={300}
					height={300}
					className={styles.shareArtistImage}
					alt="artist image"
				/>

				<div className={styles.shareArtistDetails}>
					{/* <h2>Madeon</h2> */}
					<h2>{artist.artistName}</h2>
					<p>Artist on Spotify</p>
				</div>
			</div>
			<div className={styles.shareCardBottom}>
				<div className={styles.shareCardActions}>
					<FaPlay size={16} />
					<p>Play</p>
				</div>
				{/* <div className={styles.shareCardActions}>
					<FaThumbsUp size={16} />
					<p>Like</p>
				</div> */}
				{/* <div className={styles.shareCardActions}>
					<IoChatbubbleOutline size={16} />
					<p>Comment</p>
				</div> */}
				<div className={styles.shareCardActions} onClick={handleSave}>
					<FaBookmark size={16} />
					<p>Save</p>
				</div>

				<div className={styles.shareCardActions} onClick={handleShare}>
					<PiShareFatLight size={16} />
					<p>Share</p>
				</div>
			</div>
		</div>
	);
}

export default ArtistShareCard;