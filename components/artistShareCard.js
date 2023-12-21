import React from 'react';
import Image from 'next/image';
import styles from '../styles/ShareCard.module.css';
import { FaPlay, FaBookmark, FaThumbsUp } from 'react-icons/fa6';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { PiShareFatLight } from 'react-icons/pi';

function ArtistShareCard() {
	return (
		<div className={styles.shareCardContainer}>
			{/* <h4>Tiffany shared an artist</h4> */}
			<div className={styles.shareArtistCard}>
				<Image
					src="/images/madeon-good-faith.jpg"
					width={50}
					height={50}
					className={styles.shareArtistImage}
				/>

				<div className={styles.shareArtistDetails}>
					<h2>Madeon</h2>
					<p>Artist on Spotify</p>
				</div>
			</div>
			<div className={styles.shareCardBottom}>
				<div className={styles.shareCardActions}>
					<FaPlay size={16} />
					<p>Play</p>
				</div>
				<div className={styles.shareCardActions}>
					<FaThumbsUp size={16} />
					<p>Like</p>
				</div>
				{/* <div className={styles.shareCardActions}>
					<IoChatbubbleOutline size={16} />
					<p>Comment</p>
				</div> */}
				<div className={styles.shareCardActions}>
					<FaBookmark size={16} />
					<p>Save</p>
				</div>

				<div className={styles.shareCardActions}>
					<PiShareFatLight size={16} />
					<p>Share</p>
				</div>
			</div>
		</div>
	);
}

export default ArtistShareCard;
