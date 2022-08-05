import { useState } from "react"
import { createGlobalStyle } from "styled-components";
import Searchbox from "./components/Searchbox";
import UserCardLoader from "./components/UserCard/UserCardLoader";

const GlobalStyle = createGlobalStyle`
	* {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
			'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
			sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
`

export default function App() {
	const [search, setSearch] = useState('lgs2005');

	return (
		<div style={{ padding: 50 }}>
			<GlobalStyle />
			<Searchbox onSearch={(name) => setSearch(name)} />
			<UserCardLoader username={search}/>
		</div>
	)
}