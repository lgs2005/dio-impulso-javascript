import { useState } from "react"
import Searchbox from "./Searchbox";
import UserCardLoader from "./UserCard/UserCardLoader";

export default function App() {
	const [search, setSearch] = useState('lgs2005');

	return (
		<div style={{ padding: 50 }}>
			<Searchbox onSearch={(name) => setSearch(name)} />
			<UserCardLoader username={search}/>
		</div>
	)
}