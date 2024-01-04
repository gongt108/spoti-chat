import { atom } from 'recoil';

export const playlistState = atom({
	key: 'playlistState',
	default: null,
});

export const playlistIdState = atom({
	key: 'playlistIdState',
	default: '6Lq1lrCfkpxKa4jCo5gKWr',
});

export const playingState = atom({
	key: 'playingState',
	default: false,
});
