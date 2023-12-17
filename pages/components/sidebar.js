import React from 'react';
import styles from '../../styles/Sidebar.module.css';
import { IoHomeOutline, IoSearch, IoLibraryOutline } from 'react-icons/io5';

function SideBar() {
	return (
		<div className={styles.sidebarContainer}>
			<div>
				<div className={styles.navLink}>
					<div>
						<IoHomeOutline size={25} />
					</div>
					<h3>Home</h3>
				</div>
				<div className={styles.navLink}>
					<div>
						<IoSearch size={25} />
					</div>
					<h3>Search</h3>
				</div>
			</div>
			<div>
				<div className={styles.navLink}>
					<div>
						<IoLibraryOutline size={25} />
					</div>
					<h3>Your Library</h3>
				</div>
			</div>
		</div>
	);
}

export default SideBar;
