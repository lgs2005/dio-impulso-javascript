import { Router } from "express";
import { InsertResult } from "typeorm";
import { jwtAuthMiddleware } from "../auth";
import { db } from "../database/db";
import { Post } from "../database/Post";

export const postRoutes = Router();

postRoutes.post('/post', jwtAuthMiddleware, async (req, res) => {
	let { title, content } = req.body;

	// if ([title, content].map(v => typeof(v)).some(t => t != typeof(''))) {
	// 		nao me conti
	// }

	if (typeof(title) != 'string' || typeof(content) != 'string') {
		return res.status(400).send();
	}

	let result: InsertResult = await db
		.getRepository(Post)
		.insert({
			title: title,
			content: content,
			author: req.user,
			lastUpdated: new Date().toUTCString(),
		});

	let postID = result.identifiers[0].id;
	
	return res.status(200).json({
		id: postID,
	});
});

postRoutes.get('/post/:id', async (req, res) => {
	let id = parseInt(req.params.id);

	if (id == NaN) {
		return res.status(404).send();
	}

	let post = await db
		.getRepository(Post)
		.createQueryBuilder('post')
		.leftJoinAndSelect('post.author', 'user', 'post.author = user.id')
		.where('post.id = :id', { id })
		.getOne();

	if (post == null) {
		return res.status(404).send();
	} else {
		return res.status(200).json(post);
	}
});

postRoutes.put('/post/:id', jwtAuthMiddleware, async (req, res) => {
	let { title, content } = req.body;
	let id = parseInt(req.params.id);

	if (typeof(title ?? '') != 'string' || typeof(content ?? '') != 'string') {
		return res.status(400).send();
	} else if (id == NaN) {
		return res.status(404).send();
	}

	let post = await db
		.getRepository(Post)
		.createQueryBuilder('post')
		.leftJoinAndSelect('post.author', 'user', 'post.author = user.id')
		.where('post.id = :id', { id })
		.getOne();

	if (post == null) {
		return res.status(404).send();
	} else if (post.author.id != req.user?.id) {
		return res.status(401).send('User does not own post.');
	}
	
	await db.getRepository(Post).update(post, {
		title: title ?? post.title,
		content: content ?? post.content,
		lastUpdated: new Date().toUTCString(),
	});

	return res.status(200).send();
});

postRoutes.delete('/post/:id', jwtAuthMiddleware, async (req, res) => {
	let id = parseInt(req.params.id);

	if (id == NaN) {
		return res.status(404).send();
	}

	let post = await db
		.getRepository(Post)
		.createQueryBuilder('post')
		.leftJoinAndSelect('post.author', 'user')
		.where('post.id = :id', { id })
		.getOne();
	
	if (post == null) {
		return res.status(404).send();
	} else if (post.author.id != req.user?.id) {
		return res.status(401).send('User does not own post.');
	}

	await db.getRepository(Post).remove(post);
	return res.status(200).send();
});