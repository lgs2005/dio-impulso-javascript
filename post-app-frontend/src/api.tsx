import { User } from "./types";

const BASE_URL = new URL('https://localhost:5000');

function authHeaders(token: string) {
	return { headers: { Authentication: 'Bearer ' + token } };
}

export async function login(username: string, password: string) {
	let url = new URL('/token', BASE_URL);
	let hash = Buffer.from(username + ':' + password).toString('base64');
	let options = { headers: { Authentication: 'Basic ' + hash } };

	return fetch(url, options).then(async res => {
		if (res.status == 200) {
			let data = await res.json();
			let token = data.token as string;
			return token;
		} else {
			throw 'Server responded with ' + res.statusText;
		}
	});
}

export async function getCurrentUser(token: string) {
	return fetch(new URL('/user', BASE_URL), authHeaders(token))
	.then(async res => {
		if (res.status == 200) {
			return await res.json() as User;
		} else {
			throw 'Server responded with ' + res.statusText;
		}
	});
}

