import React from 'react';
import styles from '../../styles/FriendsList.module.css';

// icons
import { FaUser } from 'react-icons/fa6';
import { IoMdSearch } from 'react-icons/io';

// temp data
const friends = [
	{
		name: 'Jennifer',
	},
	{
		name: 'Jennifer',
	},
	{
		name: 'Jennifer',
	},
	{
		name: 'Jennifer',
	},
	{
		name: 'Jennifer',
	},
	{
		name: 'Jennifer',
	},
	{
		name: 'Jennifer',
	},
	{
		name: 'Jennifer',
	},
	{
		name: 'Jennifer',
	},
	{
		name: 'Jennifer',
	},
	{
		name: 'Jennifer',
	},
	{
		name: 'Jennifer',
	},
	{
		name: 'Jennifer',
	},
	{
		name: 'Jennifer',
	},
	{
		name: 'Jennifer',
	},
	{
		name: 'Jennifer',
	},
	{
		name: 'Jennifer',
	},
	{
		name: 'Jennifer',
	},
	{
		name: 'Jennifer',
	},
	{
		name: 'Jennifer',
	},
	{
		name: 'Jennifer',
	},
	{
		name: 'Jennifer',
	},
	{
		name: 'Jennifer',
	},
	{
		name: 'Jennifer',
	},
	{
		name: 'Jennifer',
	},
	{
		name: 'Jennifer',
	},
];
function FriendsList() {
	const friendDisplay = friends.map((friend, i) => {
		return (
			<div className={styles.friendDisplay}>
				<FaUser />
				<p className={styles.friendsName}>{friend.name}</p>
			</div>
		);
	});
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3>Contacts</h3>
				<IoMdSearch className={styles.searchButton} size={20} />
			</div>
			{friendDisplay}
		</div>
	);
}

export default FriendsList;
