import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import styles from '../styles/Newsfeed.module.css';
import { BiSolidPlaylist } from 'react-icons/bi';
import { CiMicrophoneOn } from 'react-icons/ci';
import { IoMusicalNotes } from 'react-icons/io5';

import SongShareCard from './songShareCard';
import ArtistShareCard from './artistShareCard';
import AlbumShareCard from './albumShareCard';

function Newsfeed({ code }) {
	const [loading, setLoading] = useState(true);
	const [displayResult, setDisplayResult] = useState();
	const [sharedPosts, setSharedPosts] = useState([]);

	// const userId = '1';

	useEffect(() => {
		setLoading(true);
		axios
			// get user's following list
			.get('http://localhost:8000/users')
			.then((res) => {
				// extract ids from data
				let followingIds = res.data.map((following) => {
					return following._id;
				});

				followingIds = [...followingIds, '6587314c0e29b38d86c8ae39'];

				// console.log('followingIds', followingIds);

				// get posts that the following list has shared
				axios.get('http://localhost:8000/posts').then((response) => {
					let followingPosts = response.data.filter((post) => {
						return followingIds.includes(post.userId);
					});

					// display the data in the appropriate card layout
					setDisplayResult(displayPosts(followingPosts));

					setLoading(false);
				});
			})
			.catch((err) => {
				console.log('Error from ShowBookList');
			});
	}, []);

	// choose display card based on post type
	function displayPosts(posts) {
		return posts.map((post, i) => {
			if (post.postType === 'album') {
				return (
					<AlbumShareCard
						albumName={post.name}
						artistName={post.artistName}
						albumId={post.spotifyId}
						albumArt={post.imgUrl || '/images/default-artwork.png'}
						key={i}
					/>
				);
			} else if (post.postType === 'track') {
				return (
					<SongShareCard
						albumName={post.albumName}
						artistName={post.artistName}
						trackId={post.spotifyId}
						albumArt={post.imgUrl || '/images/default-artwork.png'}
						key={i}
						trackName={post.name}
					/>
				);
			} else if (post.postType === 'artist') {
				return (
					<ArtistShareCard
						artistName={post.name}
						artistId={post.spotifyId}
						artistArt={post.imgUrl || '/images/default-artwork.png'}
						key={i}
					/>
				);
			}
		});
	}

	return (
		<div className={styles.newsfeedContainer}>
			{/* <div> */}
			{/* <h2>Welcome, Tiffany</h2> */}
			<div>
				<div className={styles.inputContainer}>
					<div className={styles.inputContainerTop}>
						<h2>Welcome, Tiffany</h2>
						{/* <p>Find a song</p>
							<input type="text" placeholder="What's on your mind?" /> */}
					</div>
					<div className={styles.inputContainerBottom}>
						<Link
							href={{
								pathname: '/search',
								query: { code: `${code}`, type: 'track' },
							}}
							className={styles.shareContainer}
						>
							<IoMusicalNotes size={16} />
							<p>Search tracks</p>
						</Link>
						<Link
							href={{
								pathname: '/search',
								query: { code: `${code}`, type: 'album' },
							}}
							className={styles.shareContainer}
						>
							<BiSolidPlaylist size={16} />
							<p>Search albums</p>
						</Link>
						<Link
							href={{
								pathname: '/search',
								query: { code: `${code}`, type: 'artist' },
							}}
							className={styles.shareContainer}
						>
							<CiMicrophoneOn size={16} />
							<p>Search artists</p>
						</Link>
					</div>
				</div>
			</div>
			{/* <SongShareCard />
					<ArtistShareCard />
					<AlbumShareCard /> */}
			<div className={styles.displayContainer}>{!loading && displayResult}</div>
			{/* </div> */}
		</div>
	);
}

export default Newsfeed;
