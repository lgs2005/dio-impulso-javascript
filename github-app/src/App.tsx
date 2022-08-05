import { useState } from "react"
import UserCardLoader from "./UserCard/UserCardLoader";
import UserSearchbox from "./UserSearchbox/UserSearchbox";

export default function App() {
	const [search, setSearch] = useState('lgs2005');

	return (
		<div style={{ padding: 50 }}>
			<UserSearchbox onSelected={console.log}></UserSearchbox>
			<UserCardLoader username={search}/>
		</div>
	)
}