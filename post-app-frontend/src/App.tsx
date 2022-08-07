import { useEffect } from "react"
import { useSelector } from "react-redux";
import store, { useAppSelector } from "./store/store";
import { update, userSlice } from "./store/user";
import { User } from "./types";

async function fetchTokenBearer(token: string) {
	let url = 'https://localhost:5000/user';
	let options = { headers: { Authentication: 'Bearer ' + token } }

	return new Promise<User>((resolve, reject) => {
		setTimeout(() => {
			let user: User = {
				name: 'test',
				email: 'test',
				id: 0,
			};

			resolve(user);
		}, 2000);
	})

	// return fetch(url, options).then(
	// 	async res => {
	// 		if (res.status == 200) {
	// 			return await res.json() as User;
	// 		} else {
	// 			return null;
	// 		}
	// 	},

	// 	err => {
	// 		return null;
	// 	}
	// );
	
}

async function tryLoginLocalUser() {
	let savedToken = window.localStorage.getItem('post-app:jwt') ?? '';
	if (savedToken != null) {
		console.log('we')
		let user = await fetchTokenBearer(savedToken);

		if (user != null) {
			console.log('sus');
		 	store.dispatch(update({ user, token: savedToken }));
		}
	}
}

export default function App() {
	const currentUser = useAppSelector((state) => state.user.user);

	useEffect(() => {tryLoginLocalUser()}, []);

	return (
		<div>
			Hello ! {currentUser?.name ?? "no one."}
		</div>
	)
}