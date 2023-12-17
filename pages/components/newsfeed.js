import React from 'react';
import styles from '../../styles/Newsfeed.module.css';
import { BiSolidPlaylist } from 'react-icons/bi';
import { CiMicrophoneOn } from 'react-icons/ci';
import { IoMusicalNotes } from 'react-icons/io5';

import SongShareCard from './songShareCard';

function Newsfeed() {
	return (
		<div className={styles.newsfeedContainer}>
			<h2>Welcome, Tiffany</h2>
			<div>
				<div className={styles.inputContainer}>
					<div className={styles.inputContainerTop}>
						<p>Find a song</p>

						<input type="text" placeholder="What's on your mind?" />
					</div>
					<div className={styles.inputContainerBottom}>
						<div className={styles.shareContainer}>
							<IoMusicalNotes size={16} />
							<p>Share a song</p>
						</div>
						<div className={styles.shareContainer}>
							<BiSolidPlaylist size={16} />
							<p>Share an album</p>
						</div>
						<div className={styles.shareContainer}>
							<CiMicrophoneOn size={16} />
							<p>Share an artist</p>
						</div>
					</div>
				</div>
			</div>

			<SongShareCard />
		</div>
	);
}

export default Newsfeed;
