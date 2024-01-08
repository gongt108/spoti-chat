// Importing React, and required modules from Next.js and other libraries
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import cookie from 'js-cookie';
import styles from '../styles/Recommendation.module.css';
import { IoHomeOutline, IoSearch, IoLibraryOutline } from 'react-icons/io5';

// Defining the RecommendationNav function component
function RecommendationNav() {
	// Fetching the URL search parameters using Next.js
	const searchParams = useSearchParams();

	// Retrieving the access token from the cookie
	const accessToken = cookie.get('accessToken');

	// Setting the default recommendation type based on the URL parameter or 'track'
	const defaultType = searchParams.get('type') || 'track';
	const [type, setType] = useState(defaultType);

	// Getting 'code' and settung the initial state for recommendation term, type, and ID
	const code = searchParams.get('code');
	const [recommendationTerm, setRecommendationTerm] = useState('');
	const [recommendationType, setRecommendationType] = useState('track');
	const [recommendationId, setRecommendationId] = useState('');

	// Next.js router instance
	const router = useRouter();

	// Event handler for input change
	const onChange = (e) => {
		setRecommendationTerm(e.target.value);
	};

	// Spotify API search endpoint for recommendations
	const searchAPI = `https://api.spotify.com/v1/search?q=${recommendationTerm}&type=${recommendationType}`;

	// Form submission handler
	const handleSubmit = (e) => {
		e.preventDefault();

		// Conditional handling based on recommendation type
		if (recommendationType === 'track' || recommendationType === 'artist') {
			// The Axios request to the Spotify API for track or artist recommendations
			// axios.get initiates the GET request to the Spotify endpoint
			axios
				.get(
					`https://api.spotify.com/v1/search?q=${recommendationTerm}&type=${recommendationType}`,
					{
						method: 'GET',
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				)

				// callback that is executed when the promise (axios.get request) is successfully resolved
				.then((res) => {
					let spotifyID;

					// Extracting the Spotify ID based on recommendation type
					if (recommendationType === 'artist') {
						spotifyID = res.data.artists.items[0].id;
					} else if (recommendationType === 'track') {
						spotifyID = res.data.tracks.items[0].id;
					}

					// Redirecting to the recommendations page with corresponding parameters
					router.push(
						`/recommendations?recommendationId=${spotifyID}&code=${code}&recommendationType=${recommendationType}`
					);
				});
		} else if (recommendationType === 'genre') {
			router.push(
				`/recommendations?recommendationTerm=${recommendationTerm}&code=${code}&recommendationType=${recommendationType}`
			);
		}
	};

	// JSX representing the RecommendationNav component
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
					<label
						htmlFor="artist"
						onClick={() => setRecommendationType('artist')}
					>
						Artist
					</label>
				</div>
			</div>
		</form>
	);
}

// Exporting the RecommendationNav component as the default export
export default RecommendationNav;
