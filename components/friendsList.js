import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import axios from 'axios';
import styles from '../styles/FriendsList.module.css';
import { useSearchParams } from 'next/navigation';

import io from 'socket.io-client';
const socket = io.connect('http://localhost:4000');
// console.log(socket);

// icons
import { FaPlus } from 'react-icons/fa6';
import { IoMdSearch } from 'react-icons/io';

function FriendsList() {
	const [friends, setFriends] = useState([]);
	const [username, setUsername] = useState(''); // Add this
	const [room, setRoom] = useState(''); // Add this

	const userId = '6587314c0e29b38d86c8ae39';
	const router = useRouter();

	const searchParams = useSearchParams();
	const code = searchParams.get('code');

	useEffect(() => {
		axios
			.get(`http://localhost:8000/users/${userId}/allFriends`)
			.then((res) => {
				setFriends(res.data);
			})

			.catch((err) => {
				console.log('Error getting Friends List');
			});
	}, []);

	const joinRoom = () => {
		if (room !== '' && username !== '') {
			socket.emit('join_room', { username, room });
		}

		router.push(
			`/chat?username=${username}&code=${code}&room=${room}&socket=${socket}`,
			'/chat'
		);

		// href={{
		// 	pathname: '/chat',
		// 	query: {
		// 		code: `${code}`,
		// 		username: `${username}`,
		// 		setUsername: `${setUsername}`,
		// 		room: `${room}`,
		// 		setRoom: `${setRoom}`,
		// 		socket: `${socket}`,
		// 	},
		// }}
	};

	const friendDisplay = friends.map((friend, i) => {
		return (
			<div key={i} className={styles.friendDisplayContainer}>
				<div className={styles.friendDisplayModal}>
					<div className={styles.friendDisplayTop}>
						<Image
							src={friend?.imgURl || '/images/default-profile-pic.jpg'}
							className={styles.friendImg}
							width={50}
							height={50}
							alt="Friend profile picture"
						/>
						<p className={styles.friendsName}>
							{friend.firstName} {friend.lastName}
						</p>
					</div>
					<div className={styles.friendDisplayBottom}>
						<Link href="#" className={styles.profileButton}>
							Go to Profile
						</Link>
						<div onClick={joinRoom} className={styles.chatButton}>
							Go to Chat
						</div>
						{/* <Link
							href={{
								pathname: '/chat',
								query: {
									code: `${code}`,
									username: `${username}`,
									setUsername: `${setUsername}`,
									room: `${room}`,
									setRoom: `${setRoom}`,
									socket: `${socket}`,
								},
							}}
							as={`/chat`}
							className={styles.chatButton}
						>
							Go to Chat
						</Link> */}
					</div>
				</div>
				<div className={styles.friendDisplay}>
					<Image
						src={friend.imgURl || '/images/default-profile-pic.jpg'}
						className={styles.friendImg}
						width={40}
						height={40}
						alt="Friend profile picture"
					/>
					<p className={styles.friendsName}>
						{friend.firstName} {friend.lastName}
					</p>
				</div>
			</div>
		);
	});

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3>Friends List</h3>
			</div>
			<div className={styles.friendListDisplayContainer}>{friendDisplay}</div>
		</div>
	);
}

export default FriendsList;
