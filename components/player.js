import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Image from 'next/image';
import SpotifyPlayer from 'react-spotify-web-playback';
import styles from '../styles/Player.module.css';
import { FaStepBackward, FaPlay, FaStepForward } from 'react-icons/fa';
import { FaHeart, FaShuffle, FaVolumeHigh } from 'react-icons/fa6';
import { SlLoop } from 'react-icons/sl';
import cookie from 'js-cookie';
import {
	playlistIdState,
	playlistState,
	playingState,
} from '../atoms/playlistAtom';

function Player() {
	const accessToken = cookie.get('accessToken');
	const currentTrack = useRecoilState(playlistIdState);
	const isPlaying = useRecoilState(playingState);
	const [playlist, setPlaylist] = useRecoilState(playlistState);

	return (
		<div className={styles.playerContainer}>
			<SpotifyPlayer
				token={accessToken}
				play={isPlaying}
				styles={{
					bgColor: 'rgb(19, 18, 18)',
					color: '#ffffff',
					sliderColor: '#1cb954',
					sliderHandleColor: 'whitesmoke',
					trackArtistColor: '#ffffff',
					trackNameColor: '#fff',
				}}
				uris={[currentTrack[0]]}
			/>

			{/* <div className={styles.songDetails}>
				<Image src="/images/madeon-good-faith.jpg" width={50} height={50} />
				<div className={styles.songDetailsText}>
					<h4>Madeon</h4>
					<p>All My Friends</p>
				</div>
				<FaHeart color="white" className={styles.likeHeart} />
			</div>
			<div className={styles.playerControls}>
				<div className={styles.playerControlButtons}>
					<FaShuffle />
					<FaStepBackward />
					<div className={styles.playButtonContainer}>
						<FaPlay className={styles.playButton} />
					</div>
					<FaStepForward />
					<SlLoop />
				</div>
				<div className={styles.playTime}>
					<p>2:01</p>
					<div className={styles.playBar}></div>
					<p>2:22</p>
				</div>
			</div>
			<div className={styles.volumeControls}>
				<FaVolumeHigh />
				<div className={styles.volumeBar}></div>
			</div> */}
		</div>
	);
}

export default Player;
