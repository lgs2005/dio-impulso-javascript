import { useRef } from "react";
import styled from "styled-components";

type Props = {
	onSearch: (value: string) => void;
}

const s = {
	Container: styled.div`
		display: flex;
		flex-direction: row;
		margin: 25px 0px;
	`,

	Input: styled.input`
		flex-grow: 1;
		margin: 5px;
		padding: 5px 10px;
		box-shadow: 0 0 2px black;
		border: none;
	`,

	Button: styled.button`
		margin: 5px;
		background-color: #0088ff;
		color: #FFFFFF;
		border: none;
		box-shadow: 0 0 2px black;
		font-size: large;
		padding: 5px 10px;
	`,
}

export default function Searchbox(props: Props) {
	const searchbox = useRef<HTMLInputElement>(null);
	const handleClick = () => {
		if (searchbox.current && searchbox.current.value != '') {
			props.onSearch(searchbox.current.value);
		}
	}

	return (
		<s.Container>
			<s.Button onClick={handleClick}>
				SEARCH
			</s.Button>
			<s.Input type={'text'} ref={searchbox}/>
		</s.Container>
	)
}