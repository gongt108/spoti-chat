import React from 'react';
import { useRecoilState } from 'recoil';
import Image from 'next/image';
import axios from 'axios';
import cookie from 'js-cookie';
import { playlistIdState, playingState } from '../atoms/playlistAtom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/ShareCard.module.css';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { FaPlay, FaBookmark, FaThumbsUp } from 'react-icons/fa6';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { PiShareFatLight } from 'react-icons/pi';

function ArtistShareCard(props) {
	const [currentTrack, setCurrentTrack] = useRecoilState(playlistIdState);
	const [isplaying, setIsPlaying] = useRecoilState(playingState);
	// retrieve access code from cookies
	const accessToken = cookie.get('accessToken');

	const artist = {
		spotifyId: props.artistId,
		postType: 'artist',
		userId: '65826cf1311fe591fdaa60e0',
		imgUrl: props.artistArt,
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
				// console.log(response.data.tracks);

				const tracks = response.data.tracks.map((track) => {
					return track.uri;
				});
				console.log(tracks);
				setCurrentTrack(...tracks);
				setIsPlaying(true);
			})
			.catch((err) => {
				e.preventDefault();
				console.error('Error in Retrieving artist information!', err);
			});
	};

	const handleSave = (e) => {
		notify(`${artist.artistName} saved to Favorites`);
	};

	const handleShare = (e) => {
		// save to favorites
		// albumId = props.id
		// type = 'album'
		axios
			.post('http://localhost:8000/posts/new', artist)
			.then((response) => notify(`${response.data.artistName} shared to feed`))
			.catch((err) => {
				e.preventDefault();
				console.log('Error in Post!', err);
			});
	};

	return (
		<div className={styles.shareCardContainer}>
			<ToastContainer />
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
					<h2>{artist.artistName}</h2>
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

export default ArtistShareCard;
