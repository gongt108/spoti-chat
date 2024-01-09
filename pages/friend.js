import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

import styles from '../styles/FriendPage.module.css';
import FriendPage from '../components/friendPage';

function Friend() {
	const searchParams = useSearchParams();
	const [friend, setFriend] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		// const friendId = searchParams.get('friendId');
		getFriend(searchParams.get('friendId'));
	}, [searchParams.get('friendId')]);

	const getFriend = async (friendId) => {
		console.log(friendId);
		await axios
			.get(`${process.env.NEXT_PUBLIC_HEROKU_SERVER_URL}/users/${friendId}/id`)
			.then((response) => {
				setFriend(response.data);
				setIsLoading(false);
			})
			.catch((error) =>
				console.error("error fetching friend's user data", error)
			);
	};
	return (
		<div className={styles.container}>
			{!isLoading && <FriendPage friend={friend} />}
		</div>
	);
}

export default Friend;
