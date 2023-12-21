import React from 'react';
import Image from 'next/image';
import axios from 'axios';
import styles from '../styles/ShareCard.module.css';
import { FaPlay, FaBookmark, FaThumbsUp } from 'react-icons/fa6';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { PiShareFatLight } from 'react-icons/pi';

function AlbumShareCard(props) {
	const album = {
		spotifyId: props.albumId,
		postType: 'album',
		userId: '65826cf1311fe591fdaa60e0',
		albumName: props.albumName,
		imgUrl: props.albumArt,
		artistName: props.artistName,
	};

	const handleSave = (e) => {
		console.log('clicked save');
	};

	const handleShare = (e) => {
		// save to favorites
		// albumId = props.id
		// type = 'album'
		axios.post('http://localhost:8000/posts/new', album).catch((err) => {
			e.preventDefault();
			console.log('Error in Post!', err);
		});
	};
	return (
		<div className={styles.shareCardContainer}>
			{/* <h4>Tiffany shared an album</h4> */}
			<div className={styles.shareAlbumCard}>
				<Image
					src={props.albumArt}
					width={300}
					height={300}
					className={styles.shareAlbumImage}
					alt="album image"
				/>

				<div className={styles.shareAlbumDetails}>
					<h2>{props.albumName}</h2>
					<p>{props.artistName}</p>
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

export default AlbumShareCard;
