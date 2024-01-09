import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import styles from '../styles/NoAccess.module.css';

function Callback() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const code = searchParams.get('code');

	useEffect(() => {
		router.push(`/?code=${searchParams.get('code')}`);
	});

	return (
		<div className={styles.container}>
			<h2>
				You have successfully logged in. If you are not redirected to the home
				page within 5 seconds, please press{' '}
				<Link href={{ pathname: `/`, query: { code: `${code}` } }}>here</Link>
			</h2>
		</div>
	);
}

export default Callback;
