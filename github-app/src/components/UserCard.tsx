import styled from "styled-components";

type Props = {
	name: string,
	tag: string,
	bio: string,
	followers: number,
	following: number,
	avatar: string,
	link: string,
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

export default function UserCard(props: Props) {
	return (
		<s.Card>
			<img src={props.avatar} alt="User avatar" />
			<s.InfoSection>
				<s.Username>{props.name}</s.Username>
				<s.Tag href={props.link}>@{props.tag}</s.Tag>
				<s.Bio>{props.bio}</s.Bio>
				<s.Space />
				<s.Follows>
					<span>{props.followers} Followers</span>
					<span>{props.following} Following</span>
				</s.Follows>
			</s.InfoSection>
		</s.Card>
	)
}