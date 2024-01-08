import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import Login from './users/login';
import SpotifyLogin from './spotifyLogin';
import '../styles/global.css';
import useAuth from './useAuth';
import cookie from 'js-cookie';
import { RecoilRoot } from 'recoil';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

function App({ Component, pageProps: { session, ...pageProps } }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const searchParams = useSearchParams();
	const code = searchParams.get('code');
	cookie.set('code', code);
	const router = useRouter();

	// save access token in cookies after getting it fron the Spotify API
	// cookie will expire in an hour because access token from Spotify API expires in an hour
	const accessToken = useAuth(code);
	const oneHour = 1 / 24;
	cookie.set('accessToken', accessToken, { expires: oneHour });
	const [userId, setUserId] = useState(cookie.get('userId'));

	useEffect(() => {
		if (userId) {
			setIsLoggedIn(true);
		}
	}, [userId]);

	return isLoggedIn ? (
		<RecoilRoot>
			{accessToken && (
				<Layout code={code}>
					<Component {...pageProps} code={code} />
				</Layout>
			)}
			{!accessToken && <SpotifyLogin />}
		</RecoilRoot>
	) : (
		<RecoilRoot>
			<Component {...pageProps} code={code} />
		</RecoilRoot>
	);
	// accessToken ?
	// (
	// 	// <SessionProvider session={session}>
	// 	<RecoilRoot>
	// 		<Layout code={code}>
	// 			<Component {...pageProps} code={code} />
	// 		</Layout>
	// 	</RecoilRoot>
	// )
	// : (
	// 	// {/* </SessionProvider> */}
	// 	<SpotifyLogin />
	// );
}

export default App;
