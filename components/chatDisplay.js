import React, { useEffect, useState, useRef } from 'react';
import styles from '../styles/Chat.module.css';
import { io } from 'socket.io-client';
import { allUsersRoute, host } from '../api/APIRoutes';

function ChatDisplay({ socket }) {
	// const socket = useRef();
	const [messagesRecieved, setMessagesReceived] = useState([]);

	// Runs whenever a socket event is recieved from the server
	useEffect(() => {
		socket.on('receive_message', (data) => {
			console.log(data);
			setMessagesReceived((state) => [
				...state,
				{
					message: data.message,
					username: data.username,
					__createdtime__: data.__createdtime__,
				},
			]);
		});

		// Remove event listener on component unmount
		return () => socket.off('receive_message');
	}, [socket]);

	// dd/mm/yyyy, hh:mm:ss
	function formatDateFromTimestamp(timestamp) {
		const date = new Date(timestamp);
		return date.toLocaleString();
	}

	return (
		<div className={styles.chatDisplayContainer}>
			<div className={styles.messagesDisplayContainer}>
				{messagesRecieved.map((msg, i) => (
					<div className={styles.message} key={i}>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<span className={styles.msgMeta}>{msg.username}</span>
							<span className={styles.msgMeta}>
								{formatDateFromTimestamp(msg.__createdtime__)}
							</span>
						</div>
						<p className={styles.msgText}>{msg.message}</p>
						<br />
					</div>
				))}
			</div>
			<div className={styles.chatInputContainer}>
				<input
					type="text"
					name=""
					id=""
					placeholder="message..."
					className={styles.chatInput}
				/>
			</div>
		</div>
	);
}

export default ChatDisplay;
