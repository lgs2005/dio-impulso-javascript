export type User = {
	id: number,
	name: string,
	email: string,
}

export type Post = {
	id: number,
	title: string,
	content: string,
	author: User,
	lastUpdated: string,
}