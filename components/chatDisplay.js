import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import cookie from 'js-cookie';
import styles from '../styles/Chat.module.css';
import { io } from 'socket.io-client';
import { allUsersRoute, host } from '../api/APIRoutes';

function ChatDisplay({ socket, room }) {
	const searchParams = useSearchParams();

	// const socket = useRef();
	const userId = cookie.get('userId');
	const [name, setName] = useState(cookie.get('name'));
	const [content, setContent] = useState('');
	// const [messages, setMessages] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [messageDisplay, setMessageDisplay] = useState();

	// Runs whenever a socket event is recieved from the server
	useEffect(() => {
		console.log('changing rooms');
		setIsLoading(true);
		getMessages();
	}, [searchParams.get('room')]);

	socket.on('receive-message', (data) => {
		getMessages();
	});

	const getMessages = async () => {
		await axios
			.get(`http://localhost:8000/chats/${searchParams.get('room')}`)
			.then((response) => {
				// setMessages(response.data.messages);
				console.log(response.data);

				const messages = response.data.messages.map((msg, i) => (
					<div className={styles.message} key={i}>
						<h4 className={styles.msgSender}>{msg.senderName}</h4>
						<p className={styles.msgTimeStamp}>
							{formatDateFromTimestamp(msg.createdAt)}
						</p>
						<p className={styles.msgText}>{msg.content}</p>
					</div>
				));

				setMessageDisplay(messages);
				setIsLoading(false);
			})
			.catch((error) => console.log('error fetching messages'));
	};

	// dd/mm/yyyy, hh:mm:ss
	function formatDateFromTimestamp(timestamp) {
		const date = new Date(timestamp);
		return date.toLocaleString();
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		if (content.trim() !== '') {
			axios
				.post(`http://localhost:8000/messages/${room}/new`, {
					sender: userId,
					senderName: name,
					content: content,
					chatroomId: room,
				})
				.then((response) => {
					// console.log(response.data);

					socket.emit('send-message', { name, content }, room);
				});
		}
	};

	const handleChange = (e) => {
		setContent(e.target.value);
	};

	return (
		<div className={styles.chatDisplayContainer}>
			<div className={styles.messagesDisplayContainer}>
				{!isLoading && messageDisplay}
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
