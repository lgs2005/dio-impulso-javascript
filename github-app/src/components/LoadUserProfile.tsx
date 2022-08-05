import { User } from "../Typings"
import { useAsync } from "../useAsyncHook"
import UserProfile from "./UserProfile"

type Props = {
	username: string
}

async function fetchUser(username: string) {
	return fetch('https://api.github.com/users/' + username).then(async (res) => {
		if (res.status === 200) {
			return await res.json() as User;
		} else if (res.status === 404) {
			return null;
		} else {
			throw Error('Server responded with: ' + res.status);
		}
	})
}

export default function LoadUserProfile(props: Props) {
	const user = useAsync(fetchUser, props.username);

	if (user.loading) {
		return <>Loading user...</>
	} else if (user.error) {
		return <>Couldn't load user: {user.value}</>
	} else {
		if (user.value === null) {
			return <>User {props.username} doesn't exist.</>
		} else {
			return <UserProfile user={user.value} />
		}
	}
}