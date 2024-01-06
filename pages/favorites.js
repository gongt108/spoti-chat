import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import cookie from 'js-cookie';
import FavoritesPage from '../components/favoritesPage';
import styles from '../styles/Favorites.module.css';

function Favorites() {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const userId = cookie.get('userId');
	useEffect(() => {
		userId ? null : router.push('/users/login');
	});

	return (
		<div className={styles.favoritesContainer}>
			<FavoritesPage userId={userId} />
		</div>
	);
}

export default Favorites;
