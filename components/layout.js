import SideBar from './sidebar';
import Player from './player';
import FriendsList from './friendsList';
import Login from '../pages/users/login';
import styles from '../styles/Layout.module.css';
import cookie from 'js-cookie';

export default function Layout({ children, code }) {
	const userId = cookie.get('userId');
	// return userId ? (
	// 	<div>
	// 		<div className={styles.container}>
	// 			<SideBar className={styles.sidebarContainer} code={code} />
	// 			<div className={styles.newsfeedContainer} code={code}>
	// 				{children}
	// 			</div>
	// 			<FriendsList className={styles.friendsListContainer} />
	// 		</div>
	// 		<Player className={styles.playerContainer} />
	// 	</div>
	// ) : (
	// 	<div>{children}</div>
	// );

	return (
		<div>
			<div className={styles.container}>
				<SideBar className={styles.sidebarContainer} code={code} />
				<div className={styles.newsfeedContainer} code={code}>
					{children}
				</div>
				<FriendsList className={styles.friendsListContainer} />
			</div>
			<Player className={styles.playerContainer} />
		</div>
	);
}
