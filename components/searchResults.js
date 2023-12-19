import React from 'react';
import styles from '../styles/Search.module.css';
import SearchNav from './searchNav';
function SearchResults() {
	return (
		<div className={styles.searchContainer}>
			<SearchNav />
		</div>
	);
}

export default SearchResults;
