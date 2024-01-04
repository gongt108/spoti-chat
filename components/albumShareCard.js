import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import cookie from 'js-cookie';
import { playlistIdState, playingState } from '../atoms/playlistAtom';

import styles from '../styles/ShareCard.module.css';
import { BiAlbum, BiDotsHorizontal } from 'react-icons/bi';
import { FaPlay, FaBookmark, FaThumbsUp } from 'react-icons/fa6';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { PiShareFatLight } from 'react-icons/pi';

function AlbumShareCard(props) {
	const [currentTrack, setCurrentTrack] = useRecoilState(playlistIdState);
	const [isplaying, setIsPlaying] = useRecoilState(playingState);
	const [isFavorited, setIsFavorited] = useState(props.isFavorited || false);
	const canEdit = props.userId === '6587314c0e29b38d86c8ae39' || false;

	// retrieve access code from cookies
	const accessToken = cookie.get('accessToken');

	// store values in an object
	const album = {
		spotifyId: props.albumId,
		type: 'album',
		userId: '6587395da725779148bf22e0',
		name: props.albumName,
		imgUrl: props.albumArt,
		artistName: props.artistName,
	};

	// dynamically set notification based on button clicked
	const notify = (message) => {
		toast(message, {
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

	// get tracks for album from Spotify API
	const playAlbum = (e) => {
		axios
			.get(`https://api.spotify.com/v1/albums/${album.spotifyId}/tracks`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.then((response) => {
				const tracks = response.data.items.map((track) => {
					return track.uri;
				});
				setCurrentTrack(...tracks);
				setIsPlaying(true);
			})
			.catch((err) => {
				e.preventDefault();
				console.log('Error in Retrieving album information!', err);
			});
	};

	// save album to database
	const handleSave = (e) => {
		axios
			.post(`http://localhost:8000/favorites/${album.userId}/save`, album)
			.then((response) => {
				notify(`${album.name} saved to Favorites`);
				setIsFavorited(true);
			})
			.catch((err) => {
				e.preventDefault();
				console.log('Error in Post!', err);
			});
	};

	const handleRemove = (e) => {
		axios
			.delete(`http://localhost:8000/users/${album.userId}/unsave`, {
				_id: props._id,
				spotifyId: props.spotifyId,
			})
			.then((response) => {
				notify(`${album.name} removed from Favorites`);
				setIsFavorited(false);
			})
			.catch((err) => {
				e.preventDefault();
				console.log('Error in Post!', err);
			});
	};

	const handleShare = (e) => {
		// save to favorites
		// albumId = props.id
		// type = 'album'
		axios
			.post('http://localhost:8000/posts/new', album)
			.then((response) => {
				notify(`${response.data.name} shared to feed`);
			})
			.catch((err) => {
				e.preventDefault();
				console.log('Error in Sharing Album!', err);
			});
	};

	const removePost = (e) => {
		axios
			.delete(`http://localhost:8000/posts/${props.postId}`)
			.then((response) => {
				props.getData();
			})
			.catch((err) => {
				e.preventDefault();
				console.log('Error in delete Post!', err);
			});
	};

	return (
		<div className={styles.shareCardContainer}>
			{/* <h4>Tiffany shared an album</h4> */}
			<ToastContainer />
			{canEdit && (
				<div className={styles.removeShareContainer}>
					<BiDotsHorizontal className={styles.removeShare} size={24} />
					<div className={styles.removeShareBtn} onClick={removePost}>
						Remove from Feed
					</div>
				</div>
			)}
			<div className={styles.shareAlbumCard}>
				<Image
					src={props.albumArt}
					width={300}
					height={300}
					className={styles.shareAlbumImage}
					alt="album image"
				/>

				<div className={styles.shareAlbumDetails}>
					<h2>{album.name}</h2>
					<p>{album.artistName}</p>
				</div>
			</div>
			<div className={styles.shareCardBottom}>
				<div className={styles.shareCardActions} onClick={playAlbum}>
					{/* <BiAlbum size={16} /> */}
					<FaPlay size={16} />
					<p>Play Album</p>
				</div>
				{/* <div className={styles.shareCardActions}>
					<FaThumbsUp size={16} />
					<p>Like</p>
				</div> */}
				{/* <div className={styles.shareCardActions}>
					<IoChatbubbleOutline size={16} />
					<p>Comment</p>
				</div> */}
				{!isFavorited && (
					<div className={styles.shareCardActions} onClick={handleSave}>
						<FaBookmark size={16} />
						<p>Save</p>
					</div>
				)}
				{isFavorited && (
					<div className={styles.shareCardActions} onClick={handleRemove}>
						<FaBookmark size={16} color="white" />
						<p>Unsave</p>
					</div>
				)}

				<div className={styles.shareCardActions} onClick={handleShare}>
					<PiShareFatLight size={16} />
					<p>Share</p>
				</div>
			</div>
		</div>
	);
}

export default AlbumShareCard;
