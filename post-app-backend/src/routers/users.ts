import * as bcrypt from "bcrypt";
import { Router } from "express";
import { jwtAuthMiddleware } from "../auth";
import { db } from "../database/db";
import { Post } from "../database/Post";
import { User } from "../database/User";

export const userRoutes = Router();

userRoutes.post('/user', async (req, res) => {
	let { username, password, email } = req.body;

	if (typeof(username) != 'string' || typeof(password) != 'string' || typeof(email) != 'string') {
		return res.status(400).send();
	}

	let existingUser = await db
		.getRepository(User)
		.createQueryBuilder('user')
		.where('user.name = :username OR user.email = :email', { username, email })
		.getOne();

	if (existingUser != null) {
		return res.status(409).send('This user already exists.');
	}

	await db
		.getRepository(User)
		.insert({
			name: username,
			password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
			email: email,
		});

	return res.status(200).send();
});

userRoutes.get('/user', jwtAuthMiddleware, (req, res) => {
	return res.status(200).json({
		id: req.user?.id,
		name: req.user?.name,
		email: req.user?.email,
	});
});

userRoutes.get('/user/:name', async (req, res) => {
	let user = await db
		.getRepository(User)
		.createQueryBuilder('user')
		.where('user.name = :name', { name: req.params.name })
		.getOne();

	if (user === null) {
		return res.status(404).send('This user doesn\'t exist.');
	} else {
		return res.status(200).json({
			id: user.id,
			name: user.name,
			email: user.email,
		});
	}
});

userRoutes.get('/user/:name/posts', async (req, res) => {
	let posts = await db
		.getRepository(Post)
		.createQueryBuilder('post')
		.innerJoin(User, 'user', 'user.id = post.author')
		.where('user.name = :name', { name: req.params.name })
		.getMany();

	return res.status(200).json(posts);
});