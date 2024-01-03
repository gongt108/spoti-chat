import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useRecommendationParams } from 'next/navigation';

import styles from '../styles/Recommendation.module.css';
import { IoHomeOutline, IoRecommendation, IoLibraryOutline } from 'react-icons/io5';
function RecommendaitonNav() {
	const recommendationParams = useRecommendationParams();

	const defaultType = recommendationParams.get('type') || 'track';

	const [type, setType] = useState(defaultType);
	const code = recommendaitonParams.get('code');

	const [recommendationTerm, setRecommendaitonTerm] = useState('');
	const router = useRouter();

	// set recommendation term as you are typing
	const onChange = (e) => {
		setRecommendationTerm(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		router.push(`/recommendation?recommendationTerm=${recommendationTerm}&code=${code}&type=${type}`);
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
					<label htmlFor="track" onClick={() => setType('track')}>
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
					<label htmlFor="album" onClick={() => setType('album')}>
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

export default RecommendationNav;
