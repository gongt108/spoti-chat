import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Sidebar.module.css';
import { FaDice } from 'react-icons/fa';
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
function SideBar({ code }) {
	const playlistDisplay = playlists.map((playlist, i) => {
		return (
			<div className={styles.playlistDisplay} key={i}>
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
				<Link
					href={{ pathname: `/`, query: { code: `${code}` } }}
					className={styles.navLink}
				>
					<div>
						<IoHomeOutline size={25} className={styles.navLinkIcon} />
					</div>
					<h3>Home</h3>
				</Link>
				<Link
					href={{ pathname: `/search`, query: { code: `${code}` } }}
					className={styles.navLink}
				>
					<div>
						<IoSearch size={25} className={styles.navLinkIcon} />
					</div>
					<h3>Search</h3>
				</Link>
				<Link
					href={{ pathname: '/recommendations', query: { code: `${code}` } }}
					className={styles.navLink}
				>
					<div>
						<FaDice size={25} className={styles.navLinkIcon} />
					</div>
					<h3>Recommendations</h3>
				</Link>
			</div>
			<div className={styles.sidebarContainerBottom}>
				<div className={styles.sidebarContainerBottomHeader}>
					<div className={styles.navLink}>
						<div>
							<IoLibraryOutline size={25} className={styles.navLinkIcon} />
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
