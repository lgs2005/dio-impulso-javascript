import styled from "styled-components"
import { User } from "./Typings"

type Props = {
	user: User,
}

const s = {
	Card: styled.div`
		display: flex;
		flex-direction: row;
		height: 200px;
		box-shadow: 0 0 5px black;
		border-radius: 25px;
		overflow: hidden;
	`,

	InfoSection: styled.div`
		display: flex;
		flex-direction: column;
		margin: 10px 15px;
		align-items: start;
	`,

	Username: styled.span`
		font-weight: bold;
		font-size: large;
	`,

	Tag: styled.a`
		font-size: small;
	`,

	Bio: styled.span`
		margin: 10px 0;
		color: gray;
		
		display: -webkit-box;
		overflow: hidden;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
	`,

	Space: styled.span`
		flex-grow: 1;
	`,

	Follows: styled.div`
		display: flex;
		flex-direction: row;

		span {
			margin-right: 10px;
		}
	`,
}

export default function UserCard({ user }: Props) {
	return (
		<s.Card>
			<img src={user.avatar_url} alt="User avatar" />
			<s.InfoSection>
				<s.Username>{user.name}</s.Username>
				<s.Tag href={user.html_url}>@{user.login}</s.Tag>
				<s.Bio>{user.bio}</s.Bio>
				<s.Space />
				<s.Follows>
					<span>{user.followers} Followers</span>
					<span>{user.following} Following</span>
				</s.Follows>
			</s.InfoSection>
		</s.Card>
	)
}