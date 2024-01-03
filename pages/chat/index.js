import React from 'react';
import { useSearchParams } from 'next/navigation';

import styles from '../../styles/Chat.module.css';
import ChatDisplay from '../../components/chatDisplay';

function Chat({ username, setUsername, room, setRoom }) {
	const searchParams = useSearchParams();
	const socket = searchParams.get('socket');

	// const joinRoom = () => {
	// 	if (room !== '' && username !== '') {
	// 	  socket.emit('join_room', { username, room });
	// 	}
	//   };
	// console.log(socket.id);

	return (
		<div className={styles.container}>
			Chat
			<ChatDisplay socket={socket} />
		</div>
	);
}

export default Chat;
