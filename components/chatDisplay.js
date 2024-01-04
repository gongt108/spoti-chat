import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styles from '../styles/Chat.module.css';
import { io } from 'socket.io-client';
import { allUsersRoute, host } from '../api/APIRoutes';

function ChatDisplay({ socket, room }) {
	// const socket = useRef();
	// const [name, setName] = useState('');
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [messagesRecieved, setMessagesReceived] = useState([]);

	const userId = '6587314c0e29b38d86c8ae39';
	// Runs whenever a socket event is recieved from the server
	useEffect(() => {
		axios
			.get(`http://localhost:8000/chats/${room}`)
			.then((response) => {
				setMessage(response.data.messages);
				console.log(response.data);
			})
			.catch((error) => console.log('error fetching messages'));
		// socket.on('receive_message', (data) => {
		// 	console.log(data);
		// 	setMessagesReceived((state) => [
		// 		...state,
		// 		{
		// 			message: data.message,
		// 			username: data.username,
		// 			__createdtime__: data.__createdtime__,
		// 		},
		// 	]);
		// });

		// Remove event listener on component unmount
		// return () => socket.off('receive_message');
	}, []);

	// dd/mm/yyyy, hh:mm:ss
	function formatDateFromTimestamp(timestamp) {
		const date = new Date(timestamp);
		return date.toLocaleString();
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		if (name && message) {
			socket.emit('sendMessage', { name, message });
			setName('');
			setMessage('');
		}
	};

	const handleChange = (e) => {
		setMessage(e.target.value);
		console.log(message);
	};

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
			<form className={styles.chatInputContainer} onSubmit={handleSubmit}>
				<input
					type="text"
					name="message"
					placeholder="message..."
					className={styles.chatInput}
					onChange={handleChange}
				/>
			</form>
		</div>
	);
}

export default ChatDisplay;
