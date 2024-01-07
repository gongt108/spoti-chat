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

	useEffect(() => {
		const room = searchParams.get('room');
		setRoom(room);

		socket.emit('join-room', room);
		// console.log(`User joined room ${room}`);
	}, [searchParams.get('room')]);

	return (
		<div className={styles.container}>
			Messages
			<ChatDisplay socket={socket} room={room} />
		</div>
	);
}

export default Chat;
