import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Image from 'next/image';
import axios from 'axios';
import cookie from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/ShareCard.module.css';
import { BiDotsHorizontal } from 'react-icons/bi';
import { FaPlay, FaBookmark, FaThumbsUp } from 'react-icons/fa6';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { PiShareFatLight } from 'react-icons/pi';
import { playlistIdState, playingState } from '../atoms/playlistAtom';

function SongShareCard(props) {
	const [currentTrack, setCurrentTrack] = useRecoilState(playlistIdState);
	const [isplaying, setIsPlaying] = useRecoilState(playingState);
	const [isFavorited, setIsFavorited] = useState(props.isFavorited || false);
	const userId = cookie.get('userId');
	const canEdit = props.userId === userId || false;

	const track = {
		spotifyId: props.trackId,
		type: 'track',
		userId: userId,
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
			.post(
				`${process.env.NEXT_PUBLIC_HEROKU_SERVER_URL}/favorites/${track.userId}/save`,
				track
			)
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
			.delete(
				`${process.env.NEXT_PUBLIC_HEROKU_SERVER_URL}/users/${track.userId}/unsave`,
				{
					_id: props._id,
					spotifyId: props.spotifyId,
				}
			)
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
			.post(`${process.env.NEXT_PUBLIC_HEROKU_SERVER_URL}/posts/new`, track)
			.then((response) => notify(`${response.data.name} shared to feed`))
			.catch((err) => {
				e.preventDefault();
				console.log('Error in Post!', err);
			});
	};

	const removePost = (e) => {
		axios
			.delete(
				`${process.env.NEXT_PUBLIC_HEROKU_SERVER_URL}/posts/${props.postId}`
			)
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
