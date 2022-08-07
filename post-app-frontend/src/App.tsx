import { useEffect, useState } from "react"
import styled from "styled-components";
import { fetchTokenBearer } from "./lib/api";
import Floater from "./components/Floater";
import LoginForm from "./components/LoginForm";
import ModalContainer from "./components/ModalContainer";
import { closeIcon } from "./lib/icons";
import store, { useAppSelector } from "./store/store";
import { updateUser } from "./store/user";


async function tryLoginLocalUser() {
	let savedToken = window.localStorage.getItem('post-app:jwt');

	if (savedToken != null) {
		let user = await fetchTokenBearer(savedToken).catch(() => null);

		if (user != null) {
		 	store.dispatch(
				updateUser({ user, token: savedToken })
			);
		} else {
			window.localStorage.removeItem('post-app:jwt');
		}
	}
}

const SCloseButton = styled.button`
	width: 30px;
	height: 30px;
	border: 2px solid black;
	border-radius: 5px;
	background: none;

	* {
		width: 100%;
		height: 100%;
	}
`;


export default function App() {
	const currentUser = useAppSelector((state) => state.user.user);
	const [loginShown, setLoginShown] = useState(false);

	useEffect(() => {tryLoginLocalUser()}, []);

	const showLogin = () => setLoginShown(true);
	const hideLogin = () => setLoginShown(false);

	return (
		<div>
			Hello ! {currentUser?.name ?? "no one."}
			<button onClick={showLogin}>Click here to login!</button>

			<ModalContainer open={loginShown} onCancel={hideLogin}>
				<Floater top='0' right='0'>
					<SCloseButton onClick={hideLogin}>
						{closeIcon}
					</SCloseButton>
				</Floater>
				<LoginForm onSucess={hideLogin}/>
			</ModalContainer>
		</div>
	)
}