import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import styles from '../styles/FriendsList.module.css';

// icons
import { FaPlus } from 'react-icons/fa6';
import { IoMdSearch } from 'react-icons/io';

// temp data
// const friends1 = [
// 	{
// 		firstName: 'Jennifer',
// 		lastName: 'Test',
// 		friendImg: '/images/madeon-good-faith.jpg',
// 	},
// 	{
// 		firstName: 'Jennifer',
// 		lastName: 'Test',
// 		friendImg: '/images/madeon-good-faith.jpg',
// 	},
// 	{
// 		firstName: 'Jennifer',
// 		lastName: 'Test',
// 		friendImg: '/images/madeon-good-faith.jpg',
// 	},
// 	{
// 		firstName: 'Jennifer',
// 		lastName: 'Test',
// 		friendImg: '/images/madeon-good-faith.jpg',
// 	},
// 	{
// 		firstName: 'Jennifer',
// 		lastName: 'Test',
// 		friendImg: '/images/madeon-good-faith.jpg',
// 	},
// 	{
// 		firstName: 'Jennifer',
// 		lastName: 'Test',
// 		friendImg: '/images/madeon-good-faith.jpg',
// 	},
// 	{
// 		firstName: 'Jennifer',
// 		lastName: 'Test',
// 		friendImg: '/images/madeon-good-faith.jpg',
// 	},
// 	{
// 		firstName: 'Jennifer',
// 		lastName: 'Test',
// 		friendImg: '/images/madeon-good-faith.jpg',
// 	},
// 	{
// 		firstName: 'Jennifer',
// 		lastName: 'Test',
// 		friendImg: '/images/madeon-good-faith.jpg',
// 	},
// 	{
// 		firstName: 'Jennifer',
// 		lastName: 'Test',
// 		friendImg: '/images/madeon-good-faith.jpg',
// 	},
// 	{
// 		firstName: 'Jennifer',
// 		lastName: 'Test',
// 		friendImg: '/images/madeon-good-faith.jpg',
// 	},
// 	{
// 		firstName: 'Jennifer',
// 		lastName: 'Test',
// 		friendImg: '/images/madeon-good-faith.jpg',
// 	},
// 	{
// 		firstName: 'Jennifer',
// 		lastName: 'Test',
// 		friendImg: '/images/madeon-good-faith.jpg',
// 	},
// 	{
// 		firstName: 'Jennifer',
// 		lastName: 'Test',
// 		friendImg: '/images/madeon-good-faith.jpg',
// 	},
// 	{
// 		firstName: 'Jennifer',
// 		lastName: 'Test',
// 		friendImg: '/images/madeon-good-faith.jpg',
// 	},
// 	{
// 		firstName: 'Jennifer',
// 		lastName: 'Test',
// 		friendImg: '/images/madeon-good-faith.jpg',
// 	},
// 	{
// 		firstName: 'Jennifer',
// 		lastName: 'Test',
// 		friendImg: '/images/madeon-good-faith.jpg',
// 	},
// 	{
// 		firstName: 'Jennifer',
// 		lastName: 'Test',
// 		friendImg: '/images/madeon-good-faith.jpg',
// 	},
// 	{
// 		firstName: 'Jennifer',
// 		lastName: 'Test',
// 		friendImg: '/images/madeon-good-faith.jpg',
// 	},
// 	{
// 		firstName: 'Jennifer',
// 		lastName: 'Test',
// 		friendImg: '/images/madeon-good-faith.jpg',
// 	},
// 	{
// 		firstName: 'Jennifer',
// 		lastName: 'Test',
// 		friendImg: '/images/madeon-good-faith.jpg',
// 	},
// 	{
// 		firstName: 'Jennifer',
// 		lastName: 'Test',
// 		friendImg: '/images/madeon-good-faith.jpg',
// 	},
// 	{
// 		firstName: 'Jennifer',
// 		lastName: 'Test',
// 		friendImg: '/images/madeon-good-faith.jpg',
// 	},
// 	{
// 		firstName: 'Jennifer',
// 		lastName: 'Test',
// 		friendImg: '/images/madeon-good-faith.jpg',
// 	},
// 	{
// 		firstName: 'Jennifer',
// 		lastName: 'Test',
// 		friendImg: '/images/madeon-good-faith.jpg',
// 	},
// 	{
// 		firstName: 'Jennifer',
// 		lastName: 'Test',
// 		friendImg: '/images/madeon-good-faith.jpg',
// 	},
// ];
function FriendsList() {
	const [friends, setFriends] = useState([]);

	const userId = '6587314c0e29b38d86c8ae39';

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
						/>
						<p className={styles.friendsName}>
							{friend.firstName} {friend.lastName}
						</p>
					</div>
					<div className={styles.friendDisplayBottom}>
						<Link href="#" className={styles.profileButton}>
							Go to Profile
						</Link>
						<Link href="#" className={styles.chatButton}>
							Go to Chat
						</Link>
					</div>
				</div>
				<div className={styles.friendDisplay}>
					<Image
						src={friend.imgURl || '/images/default-profile-pic.jpg'}
						className={styles.friendImg}
						width={40}
						height={40}
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
				{/* <div>
					<FaPlus className={styles.searchButton} size={20} />
					<IoMdSearch className={styles.searchButton} size={20} />
				</div> */}
			</div>
			<div className={styles.friendListDisplayContainer}>{friendDisplay}</div>
		</div>
	);
}

export default FriendsList;
