require('dotenv').config();
SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
SPOTIFY_SECRET = process.env.SPOTIFY_SECRET;

const clientId = SPOTIFY_CLIENT_ID; // Replace with your client ID
const code = undefined;

if (!code) {
	redirectToAuthCodeFlow(clientId);
} else {
	const accessToken = await getAccessToken(clientId, code);
	const profile = await fetchProfile(accessToken);
	populateUI(profile);
}

async function redirectToAuthCodeFlow(clientId) {
	// TODO: Redirect to Spotify authorization page
}

async function getAccessToken(clientId, code) {
	// TODO: Get access token for code
}

async function fetchProfile(token) {
	// TODO: Call Web API
}

function populateUI(profile) {
	// TODO: Update UI with profile data
}
