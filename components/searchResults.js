import React from 'react';
import styles from '../styles/Search.module.css';
import SearchNav from './searchNav';
function SearchResults({ code }) {
	return (
		<div className={styles.searchContainer}>
			<SearchNav code={code} />
		</div>
	);
}

export default SearchResults;
