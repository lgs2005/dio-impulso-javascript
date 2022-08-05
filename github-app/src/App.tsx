import { useState } from "react"
import { createGlobalStyle } from "styled-components";
import LoadUserProfile from "./components/LoadUserProfile";
import Searchbox from "./components/Searchbox";

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
	const [search, setSearch] = useState('');

	return (
		<div style={{ padding: 50, maxWidth: 'calc(100vw - 120px)' }}>
			<GlobalStyle />
			<Searchbox onSearch={(name) => setSearch(name)} />
			{
				search === ''
				? <span>Search for an user above.</span>
				: <LoadUserProfile username={search} />
			}
		</div>
	)
}