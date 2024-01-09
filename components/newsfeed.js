import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import cookie from 'js-cookie';

import styles from '../styles/Newsfeed.module.css';
import { BiSolidPlaylist } from 'react-icons/bi';
import { CiMicrophoneOn } from 'react-icons/ci';
import { IoMusicalNotes } from 'react-icons/io5';

import SongShareCard from './songShareCard';
import ArtistShareCard from './artistShareCard';
import AlbumShareCard from './albumShareCard';

import SpotifyLogin from '../pages/spotifyLogin';
import { useSearchParams } from 'next/navigation';

function Newsfeed() {
	const [loading, setLoading] = useState(true);
	const [displayResult, setDisplayResult] = useState();
	const [sharedPosts, setSharedPosts] = useState([]);
	const userId = cookie.get('userId');
	const accessToken = cookie.get('accessToken');
	const searchParams = useSearchParams();
	const code = searchParams.get('code');
	const [name, setName] = useState('User');
	const router = useRouter();

	useEffect(() => {
		if (!userId) {
			router.push('/users/login');
		} else if (userId && code) {
			getData();
		}
	}, []);

	const getData = () => {
		setLoading(true);
		// 3;
		axios
			// get user's following list
			.get(`${process.env.NEXT_PUBLIC_HEROKU_SERVER_URL}/users/${userId}/id`)
			.then((res) => {
				// extract ids from data
				console.log(res.data.friends);
				setName(res.data.firstName);
				let followingIds = [...res.data.friends, userId];

				console.log(followingIds);

				// get posts that the following list has shared
				axios
					.get(`${process.env.NEXT_PUBLIC_HEROKU_SERVER_URL}/posts`)
					.then((response) => {
						let followingPosts = response.data.filter((post) => {
							return followingIds.includes(post.userId);
						});

						// display the data in the appropriate card layout
						setDisplayResult(displayPosts(followingPosts));

						setLoading(false);
					});
			})
			.catch((err) => {
				console.log('Error from Newsfeed posts');
			});
	};

	// choose display card based on post type
	function displayPosts(posts) {
		return posts.map((post, i) => {
			if (post.postType === 'album') {
				return (
					<AlbumShareCard
						key={i}
						userId={post.userId}
						postId={post._id}
						albumName={post.name}
						artistName={post.artistName}
						albumId={post.spotifyId}
						albumArt={post.imgUrl || '/images/default-artwork.png'}
						getData={getData}
					/>
				);
			} else if (post.postType === 'track') {
				return (
					<SongShareCard
						key={i}
						postId={post._id}
						userId={post.userId}
						albumName={post.albumName}
						artistName={post.artistName}
						trackId={post.spotifyId}
						albumArt={post.imgUrl || '/images/default-artwork.png'}
						trackName={post.name}
						getData={getData}
					/>
				);
			} else if (post.postType === 'artist') {
				return (
					<ArtistShareCard
						key={i}
						postId={post._id}
						userId={post.userId}
						artistName={post.name}
						artistId={post.spotifyId}
						artistArt={post.imgUrl || '/images/default-artwork.png'}
						getData={getData}
					/>
				);
			}
		});
	}

	return (
		<div className={styles.newsfeedContainer}>
			{code && (
				<div>
					<div className={styles.inputContainer}>
						<div className={styles.inputContainerTop}>
							<h2>Welcome, {name}</h2>
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
			)}
			{!code && <SpotifyLogin />}
			<div className={styles.displayContainer}>{!loading && displayResult}</div>
		</div>
	);
}

export default Newsfeed;
