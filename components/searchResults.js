import React from 'react';
import Image from 'next/image';
import styles from '../styles/Search.module.css';
import SearchNav from './searchNav';

import ArtistShareCard from './artistShareCard';
function SearchResults({ data, searchType }) {
	const albumDisplay = data.map((item, idx) => {
		return <ArtistShareCard />;
		console.log(item);
	});

	return (
		<div className={styles.searchResultContainer}>
			{/* <Image src="/images/madeon-good-faith.jpg" width={50} height={50} /> */}
			{albumDisplay}
		</div>
	);
}

export default SearchResults;
