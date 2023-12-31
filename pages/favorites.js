import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import FavoritesPage from '../components/favoritesPage';
import styles from '../styles/Favorites.module.css';

function Favorites() {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const accessToken = cookie.get('accessToken');
	console.log(accessToken);
	return (
		<div className={styles.favoritesContainer}>
			<FavoritesPage />
		</div>
	);
}

export default Favorites;
