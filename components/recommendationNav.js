import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

// Material UI Components
import styles from '../styles/Recommendation.module.css';
import { IoHomeOutline, IoRecommendation, IoLibraryOutline } from 'react-icons/io5';
function RecommendationNav() {
	const searchParams = useSearchParams();

	const defaultType = searchParams.get('type') || 'track';

	const [type, setType] = useState(defaultType);
	const code = searchParams.get('code');
	const [recommendationTerm, setRecommendationTerm] = useState('');
	const [recommendationType, setRecommendationType] = useState('');
	const [recommendationId, setRecommendationId] = useState('');
	const router = useRouter();

	// set recommendation term as you are typing
	const onChange = (e) => {
		setRecommendationTerm(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios.get(`https://api.spotify.com/v1/search?q=${recommendationTerm}&type=${recommendationType}`)
			.then(res => {
				console.log(res.data)
			})
		// router.push(`/recommendations?recommendationId=${recommendationId}&code=${code}&recommendationType=${recommendationType}`);
	};

	return (
		<form className={styles.recommendationNav} onSubmit={handleSubmit}>
			<div className={styles.recommendationNavInputWrapper}>
				<IoRecommendation size={20} color="white" />
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
						checked={type === 'track'}
					/>
					<label htmlFor="track" onClick={() => setRecommendationType('track')}>
						Tracks
					</label>
				</div>
				<div className={styles.recommendationNavButton}>
					<input
						type="radio"
						value="album"
						name="type"
						checked={type === 'album'}
					/>
					<label htmlFor="album" onClick={() => setRecommendationType('album')}>
						Albums
					</label>
				</div>
				<div className={styles.recommendationNavButton}>
					<input
						type="radio"
						value="artist"
						name="type"
						checked={type === 'artist'}
					/>
					<label htmlFor="artist" onClick={() => setRecommendationType('artist')}>
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

export default RecommendationNav;
