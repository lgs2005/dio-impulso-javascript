import { User } from "./Typings";
import { useAsync } from "./useAsyncHook";
import UserCard from "./UserCard";

async function fetchUser(username: string) {
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

	if (user.loading) {
		return <>Loading...</>
	}

	if (user.error) {
		return <>Error: {String(user.value)}</>
	}

	if (user.value == null) {
		return <>No such user</>
	}

	return <UserCard user={user.value} />
}