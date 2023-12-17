import React from 'react';
import Image from 'next/image';
import styles from '../../styles/SongShare.module.css';
import { FaPlay, FaBookmark, FaThumbsUp } from 'react-icons/fa6';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { PiShareFatLight } from 'react-icons/pi';
function SongShareCard() {
	return (
		<div className={styles.songCardContainer}>
			<div className={styles.songCardTop}>
				<Image src="/images/madeon-good-faith.jpg" width={50} height={50} />

				<div className={styles.songCardDetails}>
					<h4>Madeon</h4>
					<p>All My Friends</p>
				</div>
			</div>
			<div className={styles.songCardBottom}>
				<div className={styles.songCardActions}>
					<FaPlay size={16} />
					<p>Play</p>
				</div>
				<div className={styles.songCardActions}>
					<FaThumbsUp size={16} />
					<p>Like</p>
				</div>
				<div className={styles.songCardActions}>
					<IoChatbubbleOutline size={16} />
					<p>Comment</p>
				</div>
				<div className={styles.songCardActions}>
					<FaBookmark size={16} />
					<p>Save</p>
				</div>

				<div className={styles.songCardActions}>
					<PiShareFatLight size={16} />
					<p>Share</p>
				</div>
			</div>
		</div>
	);
}

export default SongShareCard;
