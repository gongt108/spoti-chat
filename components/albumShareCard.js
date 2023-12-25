import React from 'react';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import styles from '../styles/ShareCard.module.css';
import { BiAlbum } from 'react-icons/bi';
import { FaPlay, FaBookmark, FaThumbsUp } from 'react-icons/fa6';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { PiShareFatLight } from 'react-icons/pi';

function AlbumShareCard(props) {
	const album = {
		spotifyId: props.albumId,
		postType: 'album',
		userId: '65826cf1311fe591fdaa60e0',
		albumName: props.albumName,
		imgUrl: props.albumArt,
		artistName: props.artistName,
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

	const handleSave = (e) => {
		notify(`${album.albumName} saved to Favorites`);
	};

	const handleShare = (e) => {
		// save to favorites
		// albumId = props.id
		// type = 'album'
		axios
			.post('http://localhost:8000/posts/new', album)
			.then((response) => notify(`${response.data.albumName} shared to feed`))
			.catch((err) => {
				e.preventDefault();
				console.log('Error in Post!', err);
			});
	};
	return (
		<div className={styles.shareCardContainer}>
			{/* <h4>Tiffany shared an album</h4> */}
			<ToastContainer />
			<div className={styles.shareAlbumCard}>
				<Image
					src={props.albumArt}
					width={300}
					height={300}
					className={styles.shareAlbumImage}
					alt="album image"
				/>

				<div className={styles.shareAlbumDetails}>
					<h2>{props.albumName}</h2>
					<p>{props.artistName}</p>
				</div>
			</div>
			<div className={styles.shareCardBottom}>
				<div className={styles.shareCardActions}>
					<BiAlbum size={16} />
					<p>View Album</p>
				</div>
				{/* <div className={styles.shareCardActions}>
					<FaThumbsUp size={16} />
					<p>Like</p>
				</div> */}
				{/* <div className={styles.shareCardActions}>
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

export default AlbumShareCard;
