import { User } from "../../Typings";
import { useAsync } from "../../useAsyncHook";
import UserCard from "./UserCard";
import s from "./styles";

async function fetchUser(username: string) {
	console.log(`Fetching user ${username}`)
	let result = await fetch(`https://api.github.com/users/${username}`);

	if (result.status === 200) {
		return await result.json() as User;
	} else if (result.status === 404) {
		return null;
	} else {
		throw Error(`Server responded with ${result.status}`);
	}
}

export default function UserCardLoader(props: { username: string } ) {
	const user = useAsync(fetchUser, props.username);

	let statusText: string | undefined = undefined;

	if (user.loading) {
		statusText = 'Loading user...';
	}
	else if (user.error) {
		statusText = 'Couldn\'t load user: ' + String(user.value);
	}
	else if (user.value == null) {
		statusText = `User ${props.username} doesn't exist.`;
	}

	if (statusText) {
		return (
			<s.Card>
				<s.StatusHeader>
					{statusText}
				</s.StatusHeader>
			</s.Card>
		);
	}
	
	return <UserCard user={user.value} />
}