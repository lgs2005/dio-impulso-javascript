import React, { useRef, useState } from "react";
import styled from "styled-components";
import { login, LoginError, register } from "../api";
import store from "../store/store";
import { updateUser } from "../store/user";

type Props = {
	onSucess: () => void,
}

const SFormContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 40vw;
	padding: 0 15px;

	* {
		width: 100%;
	}

	h1 {
		margin: 0;
	}

	input {
		border: none;
		border-radius: 10px;
		box-shadow: 0 0 2px black;
		transition: box-shadow 200ms ease-in-out;
		padding: 5px 10px;
		font-size: medium;
		margin-top: 5px;

		:focus-visible {
			outline: none;
			box-shadow 0 0 4px #0022ff;
		}
	}

	label, button, div {
		margin-top: 15px;
	}

	div {
		color: red;
		font-weight: bold;
		text-align: center;
	}

	button {
		width: fit-content;
		color: white;
		font-weight: bold;
		font-size: medium;
		background-color: #0088ff;
		border: none;
		border-radius: 15px;
		padding: 5px 15px;;
	}
`;

export default function LoginForm(props: Props) {
	const [showSignup, setShowSignup] = useState(false);
	const [fetching, setFetching] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);

	const handleLogin = (username: string, password: string) => {
		return login(username, password).then(
			res => {
				if (res === LoginError.WrongPassword) {
					setError('Wrong password.');
				}
				else if (res === LoginError.WrongUser) {
					setError('This user doesn\'t exist.');
				}
				else {
					props.onSucess();
					store.dispatch(
						updateUser({
							user: res.user,
							token: res.token,
						})
					);
				}
			},
			err => {
				console.error(err);
				setError('Login failed.')
			}
		);
	}

	const handleRegister = (username: string, password: string, email: string) => {
		return register(username, password, email).then(
			async res => {
				if (res) {
					setShowSignup(false);
					await handleLogin(username, password);
				} else {
					setError('This user already exists.');
				}
			},
			err => {
				console.error(err);
				setError('Signup failed.');
			}
		)
	}

	const clearError = () => {setError(null)};

	const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		clearError();
		setFetching(true);
		let native = ev.nativeEvent as SubmitEvent;
		let submit = native.submitter as HTMLButtonElement;

		let username = usernameRef.current?.value;
		let password = passwordRef.current?.value;

		if (username == null || password == null) {
			return;
		}

		if (submit.id === 'login-button') {
			await handleLogin(username, password);
		}
		else if (submit.id === 'signup-button') {
			let email = emailRef.current?.value;

			if (email == null) {
				return;
			}

			await handleRegister(username, password, email);
		}

		setFetching(false);
	}


	return (
		<form onSubmit={handleSubmit}>
			<SFormContainer>
				<h1>{showSignup ? 'Signup' : 'Login'}</h1>

				<label htmlFor='username'>Username: </label>
				<input type={'text'} ref={usernameRef} id='username'
					maxLength={255} required onChange={clearError}/>

				<label htmlFor='password'>Password: </label>
				<input type={'password'} ref={passwordRef} id='password'
					maxLength={50} required onChange={clearError}/>

				{
					!showSignup
					? <>
						<div>{error}</div>
						<button id='login-button' disabled={fetching}>
							{fetching ? 'Please wait...' : 'Login'}
						</button>

						<button onClick={() => setShowSignup(true)}>
							Dont have an account?
						</button>
					</>
					: <>
						<label htmlFor="email">Email:</label>
						<input type={'email'} ref={emailRef} id='email'
							maxLength={255} required onChange={clearError}/>

						<div>{error}</div>
						<button id='signup-button' disabled={fetching}>
							{fetching ? 'Please wait...' : 'Create Account'}
						</button>

						<button onClick={() => setShowSignup(false)}>
							Already have an account?
						</button>
					</>
				}
			</SFormContainer>
		</form>
	);
}