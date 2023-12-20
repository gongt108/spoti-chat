import React from 'react';
import Link from 'next/link';
import styles from '../styles/Newsfeed.module.css';
import { BiSolidPlaylist } from 'react-icons/bi';
import { CiMicrophoneOn } from 'react-icons/ci';
import { IoMusicalNotes } from 'react-icons/io5';

import SongShareCard from './songShareCard';
import ArtistShareCard from './artistShareCard';
import AlbumShareCard from './albumShareCard';

function Newsfeed({ code }) {
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
						<Link
							href={{
								pathname: '/search',
								query: { code: `${code}`, type: 'track' },
							}}
							className={styles.shareContainer}
						>
							<IoMusicalNotes size={16} />
							<p>Share a song</p>
						</Link>
						<Link
							href={{
								pathname: '/search',
								query: { code: `${code}`, type: 'album' },
							}}
							className={styles.shareContainer}
						>
							<BiSolidPlaylist size={16} />
							<p>Share an album</p>
						</Link>
						<Link
							href={{
								pathname: '/search',
								query: { code: `${code}`, type: 'artist' },
							}}
							className={styles.shareContainer}
						>
							<CiMicrophoneOn size={16} />
							<p>Share an artist</p>
						</Link>
					</div>
				</div>
			</div>

			<SongShareCard />
			<ArtistShareCard />
			<AlbumShareCard />
		</div>
	);
}

export default Newsfeed;
