import React from 'react';
import Layout from '../components/layout';
import SpotifyLogin from './spotifyLogin';

import { useSearchParams } from 'next/navigation';

function App({ Component, pageProps }) {
	const searchParams = useSearchParams();
	const code = searchParams.get('code');

	return code ? (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	) : (
		<SpotifyLogin />
	);
}

export default App;
