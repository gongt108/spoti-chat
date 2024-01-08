import React, { useState, useEffect } from 'react';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';

function Logout() {
	const router = useRouter();
	// const [isLoggedOut, setIsLoggedOut] = useState(false);

	useEffect(() => {
		if (cookie.get('userId')) {
			cookie.remove('userId');
			cookie.remove('accessToken');
			// setIsLoggedOut(true);
			router.reload();
			console.log(isLoggedOut);
		} else {
			router.push('/');
		}
	}, []);

	return <div>Logout</div>;
}

export default Logout;
