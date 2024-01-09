import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import cookie from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';

import styles from '../styles/FriendPage.module.css';

import SongShareCard from './songShareCard';
import ArtistShareCard from './artistShareCard';
import AlbumShareCard from './albumShareCard';

function FriendPage({ friend }) {
	const [loading, setLoading] = useState(true);

	const [displayResult, setDisplayResult] = useState();

	const notify = () => {
		toast("Just kidding. That's mean. Don't do that.", {
			position: 'top-right',
			autoClose: 2000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'dark',
		});
	};

	useEffect(() => {
		setLoading(true);
		getPosts(friend._id);
	}, [friend]);

	const getPosts = async (friendId) => {
		axios
			.get(`http://localhost:8000/posts/${friendId}`)
			.then((response) => {
				// console.log(response.data);
				// display the data in the appropriate card layout
				if (response.data.length === 0) {
					setDisplayResult('User has not shared any posts.');
					setLoading(false);
					return;
				}
				setDisplayResult(displayPosts(response.data));

				setLoading(false);
			})
			.catch((err) => {
				console.error('Error from ShowBookList', err);
			});
	};

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
						// getData={getData}
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
						// getData={getData}
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
						// getData={getData}
					/>
				);
			}
		});
	}
	// console.log(friend);
	return (
		<div className={styles.container}>
			<div className={styles.friendInfoContainer}>
				<Image
					src={friend?.imgURl || '/images/default-profile-pic.jpg'}
					className={styles.friendImg}
					width={100}
					height={100}
					alt="Friend profile picture"
				/>
				<h2>
					{friend.firstName} {friend.lastName}
				</h2>
			</div>
			<div className={styles.removeBtn} onClick={notify}>
				Remove Friend
			</div>
			<ToastContainer />
			<div className={styles.postsContainer}>
				<h2>Latest Posts</h2>
				<div className={styles.displayContainer}>
					{!loading && displayResult}
				</div>
			</div>
		</div>
	);
}

export default FriendPage;
