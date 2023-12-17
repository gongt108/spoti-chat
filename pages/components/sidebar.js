import React from 'react';
import Image from 'next/image';
import styles from '../../styles/Sidebar.module.css';
import { FaPlus } from 'react-icons/fa6';
import { IoMdSearch } from 'react-icons/io';

import { IoHomeOutline, IoSearch, IoLibraryOutline } from 'react-icons/io5';

const playlists = [
	{
		owner: 'Madeon',
		name: 'Good Faith',
		imgURl: '/images/madeon-good-faith.jpg',
	},
];
function SideBar() {
	const playlistDisplay = playlists.map((playlist, i) => {
		return (
			<div className={styles.playlistDisplay}>
				<Image src="/images/madeon-good-faith.jpg" width={50} height={50} />
				<div className={styles.playlistDetails}>
					<p className={styles.playlistName}>{playlist.name}</p>
					<p className={styles.playlistOwner}>{playlist.owner}</p>
				</div>
			</div>
		);
	});
	return (
		<div className={styles.sidebarContainer}>
			<div className={styles.sidebarContainerTop}>
				<div className={styles.navLink}>
					<div>
						<IoHomeOutline size={25} />
					</div>
					<h3>Home</h3>
				</div>
				<div className={styles.navLink}>
					<div>
						<IoSearch size={25} />
					</div>
					<h3>Search</h3>
				</div>
			</div>
			<div className={styles.sidebarContainerBottom}>
				<div className={styles.sidebarContainerBottomHeader}>
					<div className={styles.navLink}>
						<div>
							<IoLibraryOutline size={25} />
						</div>
						<h3>Your Library</h3>
					</div>
					<div className={styles.addButtonContainer}>
						<FaPlus size={25} className={styles.addButton} />
						<p className={styles.addButtonText}>Add to Playlist</p>
					</div>
				</div>

				{playlistDisplay}
			</div>
		</div>
	);
}

export default SideBar;
