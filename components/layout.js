import SideBar from './sidebar';
import Player from './player';
import FriendsList from './friendsList';
import styles from '../styles/Layout.module.css';

export default function Layout({ children }) {
	return (
		<>
			<div className={styles.container}>
				<SideBar className={styles.sidebarContainer} />
				<div className={styles.newsfeedContainer}>{children}</div>
				<FriendsList className={styles.friendsListContainer} />
			</div>
			<Player className={styles.playerContainer} />
		</>
	);
}
