
/** Schema for user data returned by Github's API
 * Includes only data relevant for the application
*/
export type User = {
	login: string,
	id: number,
	avatar_url: string,
	html_url: string,
	name: string | null,
	bio: string,
	followers: number,
	following: number,
	url: string,
}

/** Schema for repository data returned by Github's API
 * Includes only data relevant for the application
*/
export type Repository = {
	id: number,
	name: string,
	full_name: string,
	html_url: string,
	description: string | null,
	fork: boolean,
	stargazers_count: number,
	watchers_count: number,
}