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
		</div>
	);
}

export default Player;
