import { Router } from "express";
import { db } from "../database/db";
import { Post } from "../database/Post";

export const searchRoutes = Router();

searchRoutes.get('/search', async (req, res) => {
	let { q, user, sort } = req.query;
	
	let query = db
		.getRepository(Post)
		.createQueryBuilder('post')
		.leftJoinAndSelect('post.author', 'user', 'post.author = user.id');

	if (typeof(q) == 'string') {
		query = query.where('post.title LIKE :search', { search: `%${q}%` });
	}
	if (typeof(user) == 'string') {
		query = query.where('user.name = :name', { user });
	}

	if (sort === 'recent') {
		query = query.addOrderBy('post.lastUpdated', 'DESC');
	}

	let posts = await query.limit(100).getMany();

	return res.status(200).json(posts);
});