import styled from "styled-components";
import { Post } from "../lib/types"
import { useAsync } from "../lib/useAsync"

type Props = {
	fetch: () => Promise<Post[]>,
	select: (post: Post) => void,
}

export default function PostList(props: Props) {
	const postList = useAsync(props.fetch);

	if (postList.loading) {
		return (
			<>Loading posts...</>
		)
	}

	if (postList.error) {
		return (
			<>Couldn't load posts...</>
		)
	}

	return (
		<div>
			{
				postList.value.map((post, index) => {
					let date = new Date(post.lastUpdated);
					let datestr = date.toLocaleString();

					return (
						<SPostCard key={index}>
							<SPostTitle onClick={() => props.select(post)}>{post.title}</SPostTitle>
							<SAuthoring>By @{post.author.name} ({datestr})</SAuthoring>
							<SPreview>{post.content.substring(0, 300) + '...'}</SPreview>
						</SPostCard>
					)
				})
			}
		</div>
	)
}

const SPostCard = styled.div`
	margin: 30px 20px;
	padding: 5px 15px;
	border-radius: 15px;
	box-shadow: 0 0 3px black;
	display: flex;
	flex-direction: column;
`;

const SPostTitle = styled.span`
	font-size: x-large;
	font-weight: bold;
`;

const SAuthoring = styled.span`
	font-size: small;
	color: gray;
	margin-left: 5px;
`;

const SPreview = styled.span`
	display: -webkit-box;
	overflow: hidden;
	-webkit-line-clamp: 4;
	-webkit-box-orient: vertical;
	text-wrap: break-word;
	margin: 5px 0;
`;