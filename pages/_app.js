import React from 'react';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/layout';
import SpotifyLogin from './spotifyLogin';
import '../styles/global.css';
import useAuth from './useAuth';
import cookie from 'js-cookie';
import { RecoilRoot } from 'recoil';
import { useSearchParams } from 'next/navigation';

function App({ Component, pageProps: { session, ...pageProps } }) {
	const searchParams = useSearchParams();
	const code = searchParams.get('code');

	// save access token in cookies after getting it fron the Spotify API
	// cookie will expire in an hour because access token from Spotify API expires in an hour
	const accessToken = useAuth(code);
	const oneHour = 1 / 24;
	cookie.set('accessToken', accessToken, { expires: oneHour });

	return accessToken ? (
		// <SessionProvider session={session}>
		<RecoilRoot>
			<Layout code={code}>
				<Component {...pageProps} code={code} />
			</Layout>
		</RecoilRoot>
	) : (
		// {/* </SessionProvider> */}
		<SpotifyLogin />
	);
}

export default App;
