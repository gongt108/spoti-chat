import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import styles from '../styles/Search.module.css';
import { IoHomeOutline, IoSearch, IoLibraryOutline } from 'react-icons/io5';
function SearchNav() {
	const searchParams = useSearchParams();
	const code = searchParams.get('code');

	const [searchTerm, setSearchTerm] = useState('');
	const router = useRouter();

	// console.log(code);

	const onChange = (e) => {
		setSearchTerm(e.target.value);
		// console.log(searchTerm);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		router.push(`/search?searchTerm=${searchTerm}&code=${code}`);
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
				<p href="/search/tracks">Songs</p>
				<p href="/search/albums">Albums</p>
				<p href="/search/artists">Artists</p>
			</div>
		</form>
	);
}

export default SearchNav;
