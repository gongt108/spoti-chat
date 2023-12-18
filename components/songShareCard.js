import React from 'react';
import Image from 'next/image';
import styles from '../styles/ShareCard.module.css';
import { FaPlay, FaBookmark, FaThumbsUp } from 'react-icons/fa6';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { PiShareFatLight } from 'react-icons/pi';

function SongShareCard() {
	return (
		<div className={styles.shareCardContainer}>
			<h4>Tiffany shared a song</h4>
			<div className={styles.shareCardTop}>
				<Image src="/images/madeon-good-faith.jpg" width={50} height={50} />

				<div className={styles.shareCardDetails}>
					<h4>Madeon</h4>
					<p>All My Friends</p>
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
				<div className={styles.shareCardActions}>
					<IoChatbubbleOutline size={16} />
					<p>Comment</p>
				</div>
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

export default SongShareCard;
