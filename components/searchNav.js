import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import styles from '../styles/Search.module.css';
import { IoHomeOutline, IoSearch, IoLibraryOutline } from 'react-icons/io5';
function SearchNav() {
	const searchParams = useSearchParams();

	const defaultType = searchParams.get('type') || 'track';

	const [type, setType] = useState(defaultType);
	const code = searchParams.get('code');

	const [searchTerm, setSearchTerm] = useState('');
	const router = useRouter();

	// set search term as you are typing
	const onChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		router.push(`/search?searchTerm=${searchTerm}&code=${code}&type=${type}`);
	};

	return (
		<form className={styles.searchNav} onSubmit={handleSubmit}>
			<div className={styles.searchNavInputWrapper}>
				<IoSearch size={20} color="white" />
				<input
					type="text"
					className={styles.searchNavInput}
					placeholder="What would you like to listen to?"
					onChange={onChange}
				/>
			</div>
			<div className={styles.searchNavButtons}>
				<h3>Search by:</h3>
				<div className={styles.searchNavButton}>
					<input
						type="radio"
						value="track"
						name="type"
						checked={type === 'track'}
					/>
					<label htmlFor="track" onClick={() => setType('track')}>
						Tracks
					</label>
				</div>
				<div className={styles.searchNavButton}>
					<input
						type="radio"
						value="album"
						name="type"
						checked={type === 'album'}
					/>
					<label htmlFor="album" onClick={() => setType('album')}>
						Albums
					</label>
				</div>
				<div className={styles.searchNavButton}>
					<input
						type="radio"
						value="artist"
						name="type"
						checked={type === 'artist'}
					/>
					<label htmlFor="artist" onClick={() => setType('artist')}>
						Artists
					</label>
				</div>
				{/* <p onClick={() => setType('track')}>Songs</p>
				<p onClick={() => setType('album')}>Albums</p>
				<p onClick={() => setType('artist')}>Artists</p> */}
			</div>
		</form>
	);
}

export default SearchNav;
