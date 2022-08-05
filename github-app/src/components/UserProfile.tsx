import { useState } from "react";
import styled from "styled-components";
import { User } from "../Typings";
import LoadRepoList from "./LoadRepoList";
import UserCard from "./UserCard";

interface Props {
	user: User,
}

const s = {
	Container: styled.div`
		display: flex;
		flex-direction: column;
	`,

	ButtonContainer: styled.div`
		display: flex;
		flex-direction: row;
		margin: 25px;
	`,

	Button: styled.button`
		flex-grow: 1;
		border: none;
		background: transparent;
		font-size: large;
		font-weight: bold;

		&.selected {
			color: #0066ff;
		}
	`,
}

const enum SelectedButton {
	Repos,
	Starred,
}

export default function UserProfile({ user }: Props) {
	const [selected, setSelected] = useState(SelectedButton.Repos);

	let repolist;
	if (selected === SelectedButton.Repos) {
		repolist = <LoadRepoList 
			reposUrl={user.url + '/repos'}
			noReposText="This user has no repositories"
		/>;
	} else if (selected === SelectedButton.Starred) {
		repolist = <LoadRepoList
			reposUrl={user.url + '/starred'}
			noReposText="This user has no starred repositories"
		/>
	}

	const getButtonFor = (value: SelectedButton, text: string) => {
		return (
			<s.Button
				onClick={() => setSelected(value)}
				className={value === selected ? 'selected' : undefined}
			>
				{text}
			</s.Button>
		)
	}

	return (
		<s.Container>
			<UserCard
				avatar={user.avatar_url}
				bio={user.bio}
				followers={user.followers}
				following={user.following}
				link={user.html_url}
				name={user.name ?? user.login}
				tag={user.login}
			/>

			<s.ButtonContainer>
				{getButtonFor(SelectedButton.Repos, 'Repositories')}
				{getButtonFor(SelectedButton.Starred, 'Starred')}
			</s.ButtonContainer>

			{repolist}
		</s.Container>
	);
}