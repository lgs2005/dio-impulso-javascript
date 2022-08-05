import { User } from "../Typings";
import s from "./styles";

type Props = {
	user: User,
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