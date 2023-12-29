import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';

function useAuth(code) {
	const [accessToken, setAccessToken] = useState();
	const [refreshToken, setRefreshToken] = useState();
	const [expiresIn, setExpiresIn] = useState();

	useEffect(() => {
		axios
			.post('http://localhost:8000/login', {
				code,
			})
			.then((res) => {
				// console.log(res.data);

				setAccessToken(res.data.accessToken);
				setRefreshToken(res.data.refreshToken);
				setExpiresIn(res.data.expiresIn);
				// window.history.pushState({}, null, '/');
			})
			.catch((error) => {
				console.error(error);
			});
	}, [code]);

	useEffect(() => {
		if (!refreshToken || !expiresIn) return;
		const interval = setInterval(() => {
			axios
				.post('http://localhost:8000/refresh', {
					refreshToken,
				})
				.then((res) => {
					setAccessToken(res.data.accessToken);
					setExpiresIn(res.data.expiresIn);
				})
				.catch((error) => {
					console.error(error);
				});
		}, (expiresIn - 60) * 1000);

		return () => clearInterval(interval);
	}, [refreshToken, expiresIn]);

	// cookie.set('accessToken', accessToken);
	return accessToken;
}

export default useAuth;
