import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

import styles from '../../styles/Chat.module.css';
import ChatDisplay from '../../components/chatDisplay';

import io from 'socket.io-client';
const socket = io.connect('http://localhost:4000');

function Chat() {
	const searchParams = useSearchParams();
	const socketRef = useRef(null);

	const [room, setRoom] = useState(searchParams.get('room'));
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	// const socket = searchParams.get('socket');

	// const joinRoom = () => {
	// 	if (room !== '' && username !== '') {
	//   socket.emit('join_room', { username, room });
	// 	}
	//   };
	// console.log(socket.id);

	useEffect(() => {
		// const room = searchParams.get('room');

		// if (socketRef.current === null) {
		// 	socketRef.current = socket;
		// }

		socket.emit('join_room', room, (message) => {
			console.log(message);
		});
		// socket.on('message', (message) => {
		// 	setMessages((messages) => [...messages, message]);
		// });
	}, []);

	// const handleSubmit = (event) => {
	// 	event.preventDefault();
	// 	if (name && message) {
	// 		socket.emit('sendMessage', { name, message });
	// 		setName('');
	// 		setMessage('');
	// 	}
	// };

	return (
		<div className={styles.container}>
			Chat
			<ChatDisplay socket={socket} room={room} />
		</div>
	);
}

export default Chat;
