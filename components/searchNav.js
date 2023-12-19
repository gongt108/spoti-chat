import React from 'react';
import Link from 'next/link';
import styles from '../styles/Search.module.css';
import { IoHomeOutline, IoSearch, IoLibraryOutline } from 'react-icons/io5';
function SearchNav() {
	return (
		<div className={styles.searchNav}>
			<div className={styles.searchNavInputWrapper}>
				<IoSearch size={20} color="white" />
				<input
					type="text"
					className={styles.searchNavInput}
					placeholder="What would you like to listen to?"
				/>
			</div>
			<div className={styles.searchNavButtons}>
				<h3>Search by:</h3>
				<Link href="/search/tracks">Songs</Link>
				<Link href="/search/albums">Albums</Link>
				<Link href="/search/artists">Artists</Link>
			</div>
		</div>
	);
}

export default SearchNav;
