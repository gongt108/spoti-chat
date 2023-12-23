import SideBar from './sidebar';
import Player from './player';
import FriendsList from './friendsList';
import Alert from './alert';
import styles from '../styles/Layout.module.css';

export default function Layout({ children, code }) {
	return (
		<>
			<div className={styles.container}>
				<SideBar className={styles.sidebarContainer} code={code} />
				<div className={styles.newsfeedContainer} code={code}>
					{/* <Alert /> */}
					{children}
				</div>
				<FriendsList className={styles.friendsListContainer} />
			</div>
			<Player className={styles.playerContainer} />
		</>
	);
}
