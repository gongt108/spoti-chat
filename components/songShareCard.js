import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Image from 'next/image';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/ShareCard.module.css';
import { FaPlay, FaBookmark, FaThumbsUp } from 'react-icons/fa6';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { PiShareFatLight } from 'react-icons/pi';
import cookie from 'js-cookie';
import { playlistIdState, playingState } from '../atoms/playlistAtom';

function SongShareCard(props) {
	const [currentTrack, setCurrentTrack] = useRecoilState(playlistIdState);
	const [isplaying, setIsPlaying] = useRecoilState(playingState);

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
			.post(`http://localhost:8000/users/${track.userId}/save`, track)
			.then((response) => {
				console.log(response.data);
				notify(`${track.name} saved to Favorites`);
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
			.then((response) => notify(`${response.data.trackName} shared to feed`))
			.catch((err) => {
				e.preventDefault();
				console.log('Error in Post!', err);
			});
	};

	return (
		<div className={styles.shareCardContainer}>
			{/* <h4>Tiffany shared a song</h4> */}
			<ToastContainer />
			<div className={styles.shareCardTop}>
				<Image src={track.imgUrl} width={50} height={50} alt="album image" />

				<div className={styles.shareCardDetails}>
					<h4>{track.artistName}</h4>
					<p>{track.name}</p>
				</div>
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
				<div className={styles.shareCardActions} onClick={handleSave}>
					<FaBookmark size={16} />
					<p>Save</p>
				</div>

				<div className={styles.shareCardActions} onClick={handleShare}>
					<PiShareFatLight size={16} />
					<p>Share</p>
				</div>
			</div>
		</div>
	);
}

export default SongShareCard;
