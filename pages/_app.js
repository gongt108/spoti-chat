import React from 'react';
import Layout from '../components/layout';
import SpotifyLogin from './spotifyLogin';
import '../styles/global.css';
import useAuth from './useAuth';
import cookie from 'js-cookie';
import { useSearchParams } from 'next/navigation';

function App({ Component, pageProps }) {
	const searchParams = useSearchParams();
	const code = searchParams.get('code');

	// save access token in cookies after getting it fron the Spotify API
	// cookie will expire in an hour because access token from Spotify API expires in an hour
	// const accessToken = useAuth(code);
	// const oneHour = 1 / 24;
	// cookie.set('accessToken', accessToken, { expires: oneHour });

	return code ? (
		<Layout code={code}>
			<Component {...pageProps} code={code} />
		</Layout>
	) : (
		<SpotifyLogin />
	);
}

export default App;
