import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/FriendsList.module.css';

// icons
import { FaUser } from 'react-icons/fa6';
import { IoMdSearch } from 'react-icons/io';

// temp data
const friends = [
	{
		name: 'Jennifer',
		imgURl: '/images/madeon-good-faith.jpg',
	},
	{
		name: 'Jennifer',
		imgURl: '/images/madeon-good-faith.jpg',
	},
	{
		name: 'Jennifer',
		imgURl: '/images/madeon-good-faith.jpg',
	},
	{
		name: 'Jennifer',
		imgURl: '/images/madeon-good-faith.jpg',
	},
	{
		name: 'Jennifer',
		imgURl: '/images/madeon-good-faith.jpg',
	},
	{
		name: 'Jennifer',
		imgURl: '/images/madeon-good-faith.jpg',
	},
	{
		name: 'Jennifer',
		imgURl: '/images/madeon-good-faith.jpg',
	},
	{
		name: 'Jennifer',
		imgURl: '/images/madeon-good-faith.jpg',
	},
	{
		name: 'Jennifer',
		imgURl: '/images/madeon-good-faith.jpg',
	},
	{
		name: 'Jennifer',
		imgURl: '/images/madeon-good-faith.jpg',
	},
	{
		name: 'Jennifer',
		imgURl: '/images/madeon-good-faith.jpg',
	},
	{
		name: 'Jennifer',
		imgURl: '/images/madeon-good-faith.jpg',
	},
	{
		name: 'Jennifer',
		imgURl: '/images/madeon-good-faith.jpg',
	},
	{
		name: 'Jennifer',
		imgURl: '/images/madeon-good-faith.jpg',
	},
	{
		name: 'Jennifer',
		imgURl: '/images/madeon-good-faith.jpg',
	},
	{
		name: 'Jennifer',
		imgURl: '/images/madeon-good-faith.jpg',
	},
	{
		name: 'Jennifer',
		imgURl: '/images/madeon-good-faith.jpg',
	},
	{
		name: 'Jennifer',
		imgURl: '/images/madeon-good-faith.jpg',
	},
	{
		name: 'Jennifer',
		imgURl: '/images/madeon-good-faith.jpg',
	},
	{
		name: 'Jennifer',
		imgURl: '/images/madeon-good-faith.jpg',
	},
	{
		name: 'Jennifer',
		imgURl: '/images/madeon-good-faith.jpg',
	},
	{
		name: 'Jennifer',
		imgURl: '/images/madeon-good-faith.jpg',
	},
	{
		name: 'Jennifer',
		imgURl: '/images/madeon-good-faith.jpg',
	},
	{
		name: 'Jennifer',
		imgURl: '/images/madeon-good-faith.jpg',
	},
	{
		name: 'Jennifer',
		imgURl: '/images/madeon-good-faith.jpg',
	},
	{
		name: 'Jennifer',
		imgURl: '/images/madeon-good-faith.jpg',
	},
];
function FriendsList() {
	const friendDisplay = friends.map((friend, i) => {
		return (
			<div key={i} className={styles.friendDisplayContainer}>
				<div className={styles.friendDisplayModal}>
					<div className={styles.friendDisplayTop}>
						<Image
							src={friend.imgURl}
							className={styles.friendImg}
							width={50}
							height={50}
						/>
						<p className={styles.friendsName}>{friend.name}</p>
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
						src={friend.imgURl}
						className={styles.friendImg}
						width={40}
						height={40}
					/>
					<p className={styles.friendsName}>{friend.name}</p>
				</div>
			</div>
		);
	});
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3>Contacts</h3>
				<IoMdSearch className={styles.searchButton} size={20} />
			</div>
			<div className={styles.friendListDisplayContainer}>{friendDisplay}</div>
		</div>
	);
}

export default FriendsList;
