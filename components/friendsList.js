import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import cookie from 'js-cookie';
import { useSearchParams } from 'next/navigation';
import styles from '../styles/FriendsList.module.css';

// icons
import { FaPlus } from 'react-icons/fa6';
import { IoMdSearch } from 'react-icons/io';

function FriendsList() {
	const [friends, setFriends] = useState([]);
	const [username, setUsername] = useState('');
	const [room, setRoom] = useState();

	const userId = cookie.get('userId');
	const router = useRouter();

	const searchParams = useSearchParams();
	const code = searchParams.get('code');

	if (userId) {
		useEffect(() => {
			axios
				.get(`http://localhost:8000/friends/${userId}`)
				.then((res) => {
					setFriends(res.data);
				})

				.catch((err) => {
					console.log('Error getting Friends List');
				});
		}, []);
	}

	const goToProfile = (friendId) => {
		router.push(`/friend?friendId=${friendId}&code=${code}`);
	};

	const joinRoom = (friendId) => {
		axios
			.get(`http://localhost:8000/chats/`, {
				params: {
					user1: userId,
					user2: friendId,
				},
			})
			.then((response) => {
				// console.log(response.data._id);
				setRoom(response.data._id);
				router.push(`/chat?room=${response.data._id}&code=${code}`);
			})
			.catch((error) => console.log('error fectching chatroom'));
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
						<div
							onClick={() => goToProfile(friend._id)}
							className={styles.profileButton}
						>
							Go to Profile
						</div>
						<div
							onClick={() => joinRoom(friend._id)}
							className={styles.chatButton}
						>
							Go to Chat
						</div>
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
