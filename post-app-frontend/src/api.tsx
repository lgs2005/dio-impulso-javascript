import { Base64 } from "js-base64";
import { User } from "./types";

const BASE_URL = new URL('http://localhost:5000');

class ResponseError extends Error {
	response: Response

	constructor(res: Response) {
		super(`Server responded with ${res.status}`);
		this.response = res;
	}
}

function authHeaders(token: string): RequestInit {
	return { headers: { Authorization: 'Bearer ' + token } };
}

function jsonBody(body: any): RequestInit {
	return { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) };
}

export const enum LoginError {
	WrongUser,
	WrongPassword,
}

export async function login(username: string, password: string) {
	let url = new URL('/token', BASE_URL);
	let hash = Base64.encode(username + ':' + password);
	let options: RequestInit = { headers: { Authorization: 'Basic ' + hash },  };

	return fetch(url, options).then(
		async res => {
			if (res.status === 200) {
				return await res.json() as {
					token: string,
					user: User,
				};
			} else if (res.status === 404) {
				return LoginError.WrongUser;
			} else if (res.status === 401) {
				return LoginError.WrongPassword
			} else {
				throw new ResponseError(res);
			}
		}
	)
}

export async function fetchTokenBearer(token: string) {
	let url = new URL('/user', BASE_URL);
	let options = authHeaders(token);

	return fetch(url, options).then(
		async res => {
			if (res.status === 200) {
				return await res.json() as User;
			}
			else {
				throw new ResponseError(res);
			}
		},
	)
}

export async function register(username: string, password: string, email: string) {
	let url = new URL('/user', BASE_URL);
	let body = { username, password, email };
	let options: RequestInit = { method: 'POST', ...jsonBody(body) };

	return fetch(url, options).then(
		res => {
			if (res.status === 200) {
				return true;
			} else if (res.status === 409) {
				return false;
			} else {
				throw new ResponseError(res);
			}
		},
	)
}
