import React from 'react';
import Image from 'next/image';
import axios from 'axios';

import styles from '../styles/ShareCard.module.css';
import { FaPlay, FaBookmark, FaThumbsUp } from 'react-icons/fa6';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { PiShareFatLight } from 'react-icons/pi';

function SongShareCard(props) {
	const track = {
		spotifyId: props.trackId,
		postType: 'track',
		userId: '65826cf1311fe591fdaa60e0',
		albumName: props.albumName,
		imgUrl: props.albumArt,
		artistName: props.artistName,
		trackName: props.trackName,
	};

	const handleSave = (e) => {
		console.log('clicked save');
	};

	const handleShare = (e) => {
		// save to favorites
		// albumId = props.id
		// type = 'album'
		axios.post('http://localhost:8000/posts/new', track).catch((err) => {
			e.preventDefault();
			console.log('Error in Post!', err);
		});
	};

	return (
		<div className={styles.shareCardContainer}>
			{/* <h4>Tiffany shared a song</h4> */}
			<div className={styles.shareCardTop}>
				<Image src={track.imgUrl} width={50} height={50} alt="album image" />

				<div className={styles.shareCardDetails}>
					<h4>{track.artistName}</h4>
					<p>{track.trackName}</p>
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
				</div>
				<div className={styles.shareCardActions}>
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

export default SongShareCard;
