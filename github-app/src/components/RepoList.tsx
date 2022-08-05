import styled from "styled-components"
import { Repository } from "../Typings"

type Props = {
	repos: Repository[],
}

const githubForkIcon = <path fillRule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />

const s = {
	Container: styled.div`
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;

		> * {
			margin: 15px;
		}
	`,

	Card: styled.div`
		display: flex;
		flex-direction: column;
		width: 300px;
		height: 100px;
		box-shadow: 0 0 3px black;
		border-radius: 25px;
		padding: 15px 25px;
	`,

	Title: styled.a`
		text-decoration: none;
		font-weight: bold;
	`,

	ForkTitle: styled.div`
		display: flex;
		flex-direction: row;
		align-items: center;
	`,

	ForkIcon: styled.svg`
		width: 16px;
		height: 16px;
		margin-right: 5px;
	`,

	Description: styled.span`
		color: gray;
		margin: 5px 0;
		
		display: -webkit-box;
		overflow: hidden;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	`,

	Space: styled.div`
		flex-grow: 1;
	`,

	StatsContainer: styled.span`
		display: flex;
		flex-direction: row;

		span {
			margin-right: 10px;
		}
	`
}

export function RepoCard({ repo }: {repo: Repository}) {
	
	let title = <s.Title href={repo.html_url}>{repo.name}</s.Title>;

	if (repo.fork) {
		title = (
			<s.ForkTitle>
				<s.ForkIcon aria-hidden={true}>
					{githubForkIcon}
				</s.ForkIcon>
				{title}
			</s.ForkTitle>
		)
	}

	return (
		<s.Card>
			{title}
			<s.Description>{repo.description ?? ''}</s.Description>
			<s.Space />
			<s.StatsContainer>
				<span>{repo.stargazers_count} starred</span>
				<span>{repo.watchers_count} watching</span>
			</s.StatsContainer>
		</s.Card>
	)
}

export default function RepoList({ repos }: Props) {
	return (
		<s.Container>
			{repos.map((repo, index) => 
				<RepoCard repo={repo} key={index} />)}
		</s.Container>
	)
}