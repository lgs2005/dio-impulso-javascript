import { Repository } from "../Typings"
import { useAsync } from "../useAsyncHook"
import RepoList from "./RepoList";

type Props = {
	reposUrl: string,
	noReposText: string,
}

async function fetchRepos(link: string) {
	const url = new URL(link);
	url.searchParams.append('per_page', '100');
	url.searchParams.append('sort', 'updated')

	return fetch(url).then(async (res) => {
		if (res.status === 200) {
			return await res.json() as Repository[];
		} else {
			throw Error('Server responded with ' + res.status);
		}
	});
}

export default function LoadRepoList(props: Props) {
	const repos = useAsync(fetchRepos, props.reposUrl)

	if (repos.loading) {
		return <>Loading Repos...</>
	} else if (repos.error) {
		return <>Couldn't load repos: {repos.value}</>
	} else {
		if (repos.value.length === 0) {
			return <>{props.noReposText}</>
		} else {
			return <RepoList repos={repos.value} />
		}
	}
}