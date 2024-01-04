import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Image from 'next/image';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/ShareCard.module.css';
import { BiDotsHorizontal } from 'react-icons/bi';
import { FaPlay, FaBookmark, FaThumbsUp } from 'react-icons/fa6';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { PiShareFatLight } from 'react-icons/pi';
import cookie from 'js-cookie';
import { playlistIdState, playingState } from '../atoms/playlistAtom';

function SongShareCard(props) {
	const [currentTrack, setCurrentTrack] = useRecoilState(playlistIdState);
	const [isplaying, setIsPlaying] = useRecoilState(playingState);
	const [isFavorited, setIsFavorited] = useState(props.isFavorited || false);
	const canEdit = props.userId === '6587314c0e29b38d86c8ae39' || false;

	const track = {
		spotifyId: props.trackId,
		type: 'track',
		userId: '6587314c0e29b38d86c8ae39',
		albumName: props.albumName,
		imgUrl: props.albumArt,
		artistName: props.artistName,
		name: props.trackName,
	};

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

	const handlePlay = (e) => {
		e.preventDefault();
		setCurrentTrack(props.trackUri);
		setIsPlaying(true);
	};

	const handleSave = (e) => {
		axios
			.post(`http://localhost:8000/favorites/${track.userId}/save`, track)
			.then((response) => {
				notify(`${track.name} saved to Favorites`);
				setIsFavorited(true);
			})
			.catch((err) => {
				e.preventDefault();
				console.log('Error in Post!', err);
			});
	};

	const handleRemove = (e) => {
		axios
			.delete(`http://localhost:8000/users/${track.userId}/unsave`, {
				_id: props._id,
				spotifyId: props.spotifyId,
			})
			.then((response) => {
				notify(`${track.name} removed from Favorites`);
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
			.post('http://localhost:8000/posts/new', track)
			.then((response) => notify(`${response.data.name} shared to feed`))
			.catch((err) => {
				e.preventDefault();
				console.log('Error in Post!', err);
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
			{/* <h4>Tiffany shared a song</h4> */}
			<ToastContainer />
			{canEdit && (
				<div className={styles.removeShareContainer}>
					<BiDotsHorizontal className={styles.removeShare} size={24} />
					<div className={styles.removeShareBtn} onClick={removePost}>
						Remove from Feed
					</div>
				</div>
			)}
			<div className={styles.shareCardTop}>
				<Image src={track.imgUrl} width={50} height={50} alt="album image" />

				<div className={styles.shareCardDetails}>
					<h4>{track.name}</h4>
					<p>{track.artistName}</p>
				</div>
				{/* <div className={styles.removeBtnContainer}> */}

				{/* </div> */}
			</div>
			<div className={styles.shareCardBottom}>
				<div className={styles.shareCardActions} onClick={handlePlay}>
					<FaPlay size={16} />
					<p>Play</p>
				</div>
				{/* <div className={styles.shareCardActions}>
					<FaThumbsUp size={16} />
					<p>Like</p>
				</div>
				<div className={styles.shareCardActions}>
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

export default SongShareCard;
