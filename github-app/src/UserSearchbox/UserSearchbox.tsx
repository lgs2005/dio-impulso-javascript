import { useEffect, useState } from "react";
import { User } from "../Typings";

interface Props {
	onSelected: (username: string) => void;
}


// id love to use this, but it hits the rate limit too quickly
// it works tough!!!
export default function UserSearchbox(props: Props) {
	const [query, setQuery] = useState('');
	const [options, setOptions] = useState<User[]>([]);
	const [onCooldown, setOnCooldown] = useState(false);
	const [lastQuery, setLastQuery] = useState('');

	useEffect(() => {
		if (!onCooldown && query != lastQuery && query != '') {
			setOnCooldown(true);
			setLastQuery(query);

			let timeout = false;
			let url = new URL('https://api.github.com/search/users')
			url.searchParams.append('q', query);
			url.searchParams.append('per_page', '10');

			console.log('fetching query', query);

			fetch(url).then(
				async (res) => {
					if (!timeout) {
						if (res.status == 200) {
							let users = await res.json();
							console.log('update users');
							setOptions(users.items);
						} else {
							throw `Server responded with ${res.status}`;
						}
					}

					console.log('finished query', query)
				}
			)
			.catch((err) => {
				if (!timeout) {
					console.log('Failed to fetch users:', err);
					setOptions([]);
				}
			});


			setTimeout(() => {
				console.log('cooldown ended', query)
				timeout = true;
				setOnCooldown(false);
			}, 500);
		}
	}, [query, lastQuery, onCooldown])

	const queryChanged = (newQuery: string) => {
		setQuery(newQuery);
	}

	return (
		<>
			<div style={{display: 'flex', flexDirection: 'row'}}>
				<input type={'text'} onChange={ev => queryChanged(ev.target.value)} list='user-options'/>
				<button>Search</button>
			</div>
			<div>
				{options.map(user => <p>{user.login}</p>)}
			</div>
		</>
	)
}