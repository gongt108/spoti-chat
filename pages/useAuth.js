import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';

function useAuth(code) {
	const [accessToken, setAccessToken] = useState();
	const [refreshToken, setRefreshToken] = useState();
	const [expiresIn, setExpiresIn] = useState();

	useEffect(() => {
		axios
			.post(`${process.env.NEXT_PUBLIC_HEROKU_SERVER_URL}/login`, {
				headers: { 'Access-Control-Allow-Origin': '*' },
				code,
			})
			.then((res) => {
				setAccessToken(res.data.accessToken);
				setRefreshToken(res.data.refreshToken);
				setExpiresIn(res.data.expiresIn);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [code]);

	useEffect(() => {
		if (!refreshToken || !expiresIn) return;
		const interval = setInterval(() => {
			axios
				.post(`${process.env.NEXT_PUBLIC_HEROKU_SERVER_URL}/refresh`, {
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
