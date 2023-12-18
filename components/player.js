import React from 'react';
import Image from 'next/image';
import styles from '../styles/Player.module.css';
import { FaStepBackward, FaPlay, FaStepForward } from 'react-icons/fa';
import { FaHeart, FaShuffle, FaVolumeHigh } from 'react-icons/fa6';
import { SlLoop } from 'react-icons/sl';

function Player() {
	return (
		<div className={styles.playerContainer}>
			<div className={styles.songDetails}>
				<Image src="/images/madeon-good-faith.jpg" width={50} height={50} />
				<div className={styles.songDetailsText}>
					<h4>Madeon</h4>
					<p>All My Friends</p>
				</div>
				<FaHeart color="white" className={styles.likeHeart} />
			</div>
			<div className={styles.playerControls}>
				<div className={styles.playerControlButtons}>
					<FaShuffle />
					<FaStepBackward />
					<div className={styles.playButtonContainer}>
						<FaPlay className={styles.playButton} />
					</div>
					<FaStepForward />
					<SlLoop />
				</div>
				<div className={styles.playTime}>
					<p>2:01</p>
					<div className={styles.playBar}></div>
					<p>2:22</p>
				</div>
			</div>
			<div className={styles.volumeControls}>
				<FaVolumeHigh />
				<div className={styles.volumeBar}></div>
			</div>
		</div>
	);
}

export default Player;
