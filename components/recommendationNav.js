import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import cookie from 'js-cookie';


// Material UI Components
import styles from '../styles/Recommendation.module.css';
import { IoHomeOutline, IoSearch, IoLibraryOutline } from 'react-icons/io5';

function RecommendationNav() {
	const searchParams = useSearchParams();
	const accessToken = cookie.get('accessToken');
	const defaultType = searchParams.get('type') || 'track';
	const [type, setType] = useState(defaultType);
	const code = searchParams.get('code');
	const [recommendationTerm, setRecommendationTerm] = useState('');
	const [recommendationType, setRecommendationType] = useState('track');
	const [recommendationId, setRecommendationId] = useState('');
	const router = useRouter();

	// set recommendation term as you are typing
	const onChange = (e) => {
		setRecommendationTerm(e.target.value);
	};

	// get recommendation by id or type and term
	const searchAPI = `https://api.spotify.com/v1/search?q=${recommendationTerm}&type=${recommendationType}`

	const handleSubmit = (e) => {
		e.preventDefault();
		if (recommendationType === 'track' || recommendationType === 'artist') {

			axios.get(`https://api.spotify.com/v1/search?q=${recommendationTerm}&type=${recommendationType}`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
				.then(res => {
					console.log(res.data)
					let spotifyID
					if (recommendationType === 'artist') {
						// setRecommendationId(res.data.artist.items[0].id)
						spotifyID = res.data.artists.items[0].id
					} else if (recommendationType === 'track') {
						// setRecommendationId(res.data.tracks.items[0].id)
						spotifyID = res.data.tracks.items[0].id
					}
					router.push(`/recommendations?recommendationId=${spotifyID}&code=${code}&recommendationType=${recommendationType}`);
					// 1. getting an id of a song
					// 2. return the id based on what's entered into the input line
					// 3. parse through the data the api returns to get the id
					// 4. return the recommendation based on the Spotify id that you give it 
				})
		}
		else if (recommendationType === 'genre') {
			router.push(`/recommendations?recommendationTerm=${recommendationTerm}&code=${code}&recommendationType=${recommendationType}`);
		}
	};

	return (
		<form className={styles.recommendationNav} onSubmit={handleSubmit}>
			<div className={styles.recommendationNavInputWrapper}>
				<IoSearch size={20} color="white" />
				<input
					type="text"
					className={styles.recommendationNavInput}
					placeholder="What would you like to listen to?"
					onChange={onChange}
				/>
			</div>
			<div className={styles.recommendationNavButtons}>
				<h3>Recommend by:</h3>
				<div className={styles.recommendationNavButton}>
					<input
						type="radio"
						value="track"
						name="type"
						checked={recommendationType === 'track'}
					/>
					<label htmlFor="track" onClick={() => setRecommendationType('track')}>
						Track
					</label>
				</div>
				<div className={styles.recommendationNavButton}>
					<input
						type="radio"
						value="genre"
						name="type"
						checked={recommendationType === 'genre'}
					/>
					<label htmlFor="genre" onClick={() => setRecommendationType('genre')}>
						Genre
					</label>
				</div>
				<div className={styles.recommendationNavButton}>
					<input
						type="radio"
						value="artist"
						name="type"
						checked={recommendationType === 'artist'}
					/>
					<label htmlFor="artist" onClick={() => setRecommendationType('artist')}>
						Artist
					</label>
				</div>
			</div>
		</form>
	);
}

export default RecommendationNav;
