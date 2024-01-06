import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import styles from '../styles/Chat.module.css';
import { io } from 'socket.io-client';
import { allUsersRoute, host } from '../api/APIRoutes';

function ChatDisplay({ socket, room }) {
	// const socket = useRef();
	const userId = cookie.get('userId');
	const [name, setName] = useState(cookie.get('name'));
	const [content, setContent] = useState('');
	const [messages, setMessages] = useState([]);

	// Runs whenever a socket event is recieved from the server
	useEffect(() => {
		axios
			.get(`http://localhost:8000/chats/${room}`)
			.then((response) => {
				setMessages(response.data.messages);
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
	}, [socket]);

	// dd/mm/yyyy, hh:mm:ss
	function formatDateFromTimestamp(timestamp) {
		const date = new Date(timestamp);
		return date.toLocaleString();
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		if (content.trim() !== '') {
			// socket.emit('sendMessage', { name, message });
			// console.log({
			// 	sender: userId,
			// 	senderName: name,
			// 	content: content,
			// 	chatroomId: room,
			// });
			axios
				.post(`http://localhost:8000/messages/${room}/new`, {
					sender: userId,
					senderName: name,
					content: content,
					chatroomId: room,
				})
				.then((response) => {
					console.log(response.data);
				});
		}
	};

	const handleChange = (e) => {
		setContent(e.target.value);
		console.log(content);
	};

	return (
		<div className={styles.chatDisplayContainer}>
			<div className={styles.messagesDisplayContainer}>
				{messages.map((msg, i) => (
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
