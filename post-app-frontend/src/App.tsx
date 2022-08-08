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

const SHeaderContainer = styled.header`
	position: sticky;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 10px 25px;
	width: auto;
	box-shadow: 0 0 5px black;
`;

const SUserInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 15%;
	align-items: center;

	button {
		margin-top: 10px;
		border: none;
		color: white;
		background-color: #0088ff;
		border-radius: 15px;
		padding: 10px 30px;
		font-weight: bold;
	}
`;

const SUsername = styled.span`
	font-style: italic;
`;

export default function App() {
	const currentUser = useAppSelector((state) => state.user.user);
	const [loginShown, setLoginShown] = useState(false);

	useEffect(() => {tryLoginLocalUser()}, []);

	const showLogin = () => setLoginShown(true);
	const hideLogin = () => setLoginShown(false);

	const handleLogout = () => {
		window.localStorage.removeItem('post-app:jwt');
		store.dispatch(
			updateUser({
				user: null,
				token: null,
			})
		);
	};

	return (
		<div>
			<ModalContainer open={loginShown} onCancel={hideLogin}>
				<Floater top='0' right='0'>
					<SCloseButton onClick={hideLogin}>
						{closeIcon}
					</SCloseButton>
				</Floater>
				<LoginForm onSucess={hideLogin}/>
			</ModalContainer>

			<SHeaderContainer>
				<h1>Post App</h1>
				<SUserInfoContainer>
					{
						currentUser == null
						? <>
							<span>Not logged in.</span>
							<button onClick={showLogin}>Login</button>
						</>
						: <>
							<span>Logged in as 
								<SUsername> {currentUser.name}</SUsername>
							</span>
							<button onClick={handleLogout}>Logout</button>
						</>
					}
				</SUserInfoContainer>
			</SHeaderContainer>
		</div>
	)
}