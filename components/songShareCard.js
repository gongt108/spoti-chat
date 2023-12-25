import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/ShareCard.module.css';
import { FaPlay, FaBookmark, FaThumbsUp } from 'react-icons/fa6';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { PiShareFatLight } from 'react-icons/pi';
import cookie from 'js-cookie';

function SongShareCard(props) {
	const [currentTrack, setCurrentTrack] = useState('');
	const track = {
		spotifyId: props.trackId,
		postType: 'track',
		userId: '65826cf1311fe591fdaa60e0',
		albumName: props.albumName,
		imgUrl: props.albumArt,
		artistName: props.artistName,
		trackName: props.trackName,
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
		cookie.set('currentTrack', props.trackUri);
		// console.log(props.trackUri);

		// notify(`${track.trackName} saved to Favorites`);
	};

	const handleSave = (e) => {
		console.log('clicked save');
		notify(`${track.trackName} saved to Favorites`);
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
					<p>{track.trackName}</p>
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
