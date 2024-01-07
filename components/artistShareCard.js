import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import Image from 'next/image';
import axios from 'axios';
import cookie from 'js-cookie';
import { playlistIdState, playingState } from '../atoms/playlistAtom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/ShareCard.module.css';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { BiDotsHorizontal } from 'react-icons/bi';
import { FaPlay, FaBookmark, FaThumbsUp } from 'react-icons/fa6';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { PiShareFatLight } from 'react-icons/pi';

function ArtistShareCard(props) {
	const [currentTrack, setCurrentTrack] = useRecoilState(playlistIdState);
	const [isplaying, setIsPlaying] = useRecoilState(playingState);
	const [isFavorited, setIsFavorited] = useState(props.isFavorited || false);
	const userId = cookie.get('userId');
	const canEdit = props.userId === userId || false;

	// retrieve access code from cookies
	const accessToken = cookie.get('accessToken');

	const artist = {
		spotifyId: props.artistId,
		type: 'artist',
		userId: userId,
		imgUrl: props.artistArt,
		name: props.artistName,
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

	// get top tracks for artist from Spotify API
	const playArtist = (e) => {
		axios
			.get(
				`https://api.spotify.com/v1/artists/${artist.spotifyId}/top-tracks?market=US`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			)
			.then((response) => {
				const tracks = response.data.tracks.map((track) => {
					return track.uri;
				});
				setCurrentTrack(...tracks);
				setIsPlaying(true);
			})
			.catch((err) => {
				e.preventDefault();
				console.error('Error in Retrieving artist information!', err);
			});
	};

	const handleSave = (e) => {
		axios
			.post(`http://localhost:8000/favorites/${artist.userId}/save`, artist)
			.then((response) => {
				notify(`${artist.name} saved to Favorites`);
				setIsFavorited(true);
			})
			.catch((err) => {
				e.preventDefault();
				console.log('Error in Post!', err);
			});
	};

	const handleRemove = (e) => {
		axios
			.delete(`http://localhost:8000/users/${artist.userId}/unsave`, {
				_id: props._id,
				spotifyId: props.spotifyId,
			})
			.then((response) => {
				notify(`${artist.name} removed from Favorites`);
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
			.post('http://localhost:8000/posts/new', artist)
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
			<ToastContainer />
			{canEdit && (
				<div className={styles.removeShareContainer}>
					<BiDotsHorizontal className={styles.removeShare} size={24} />
					<div className={styles.removeShareBtn} onClick={removePost}>
						Remove from Feed
					</div>
				</div>
			)}
			{/* <h4>Tiffany shared an artist</h4> */}
			<div className={styles.shareArtistCard}>
				<Image
					src={artist.imgUrl}
					width={300}
					height={300}
					className={styles.shareArtistImage}
					alt="artist image"
				/>

				<div className={styles.shareArtistDetails}>
					{/* <h2>Madeon</h2> */}
					<h2>{artist.name}</h2>
					<p>Artist on Spotify</p>
				</div>
			</div>
			<div className={styles.shareCardBottom}>
				<div className={styles.shareCardActions} onClick={playArtist}>
					{/* <BsFillPersonLinesFill size={16} /> */}
					<FaPlay size={16} />
					<p>Play Artist</p>
				</div>
				{/* <div className={styles.shareCardActions}>
					<FaThumbsUp size={16} />
					<p>Like</p>
				</div> */}
				{/* <div className={styles.shareCardActions}>
					<IoChatbubbleOutline size={16} />
					<p>Comment</p>
				</div> */}
				{/* <div className={styles.shareCardActions} onClick={handleSave}>
					<FaBookmark size={16} />
					<p>Save</p>
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

export default ArtistShareCard;
