import styled from "styled-components"
import { Post } from "../lib/types"

type Props = {
	post: Post,
	goback: () => void,
}

export default function PostPage({ post, goback }: Props) {
	return (
		<SPostContainer>
			<SPostHeader>
				<SPostTitle>{post.title}</SPostTitle>
				<SCloseButton onClick={goback}>Go back</SCloseButton>
			</SPostHeader>
			<SPostAuthoring>By {post.author.name} ({post.author.email})</SPostAuthoring>
			<SPostAuthoring>Last updated at {new Date(post.lastUpdated).toLocaleString()}</SPostAuthoring>
			<SPostContent>
				{post.content}
			</SPostContent>
		</SPostContainer>
	)
}

const SPostContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 25px;
	padding: 10px 15px;
	box-shadow: 0 0 5px black;
	border-radius: 15px;
`;

const SPostHeader = styled.header`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const SPostTitle = styled.h2`
	margin: 0;
	font-size: xx-large;
`;

const SCloseButton = styled.button`
	border-radius: 15px;
	border: none;
	box-shadow: 0 0 3px black;
	margin-right: 10px;
	background-color: #0088ff;
	color: white;
	font-weight: bold;
	padding: 5px 8px;
`;

const SPostAuthoring = styled.span`
	font-size: small;
	color: gray;
	margin-left: 5px;
`;

const SPostContent = styled.span`
	margin: 10px 0;
`;