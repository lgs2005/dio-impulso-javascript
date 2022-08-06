import * as bcrypt from "bcrypt";
import * as JWT from "jsonwebtoken";
import { NextFunction, Request, Response, Router } from "express";
import { db } from "./database/db";
import { User } from "./database/User";
import { PRIVATE_KEY } from "./config";
import { HttpError } from "./HttpError";

export const authRoutes = Router();

authRoutes.get('/token', async (req, res) => {
	let args = req.headers.authorization?.split(' ', 2);

	if (!args || args.at(0) !== 'Basic' || !args.at(1)) {
		throw new HttpError(400, 'Invalid authorization header.');
	}

	let authInfo =
		Buffer.from(args[1], 'base64')
			.toString('utf-8')
			.split(':', 2)

	if (authInfo.length < 2) {
		throw new HttpError(400, 'Invalid authorization header.');
	}

	let [username, password] = authInfo;
	let user = await db
		.getRepository(User)
		.createQueryBuilder('user')
		.where('user.name = :username', { username })
		.getOne();

	if (user == null) {
		throw new HttpError(400, 'User doesn\'t exist.');
	}
	if (!bcrypt.compareSync(password, user.password)) {
		throw new HttpError(400, 'Wrong password.');
	}


	let token: string = JWT.sign(
		{ userid: user.id },
		PRIVATE_KEY,
		{
			subject: 'auth',
			audience: 'user',
			expiresIn: '30d',
		}
	);

	return res.status(200).json({ token });
})

export async function jwtAuthMiddleware(req: Request, res: Response, next: NextFunction) {
	let args = req.headers.authorization?.split(' ', 2);

	if (!args || args.at(0) !== 'Bearer' || !args.at(1)) {
		throw new HttpError(401, 'Invalid authorization header.');
	}

	let userid: number;
	try {
		let payload: any = JWT.verify(args[1], PRIVATE_KEY);
		userid = payload.userid;
	} catch (err) {
		throw new HttpError(401, 'Couldn\'t verify token: ' + String(err));
	}

	let user = await db
		.getRepository(User)
		.createQueryBuilder('user')
		.where('user.id = :userid', { userid })
		.getOne();

	if (user == null) {
		throw new HttpError(401, 'THIS USER DOESNT EVENT EXIST. HOW')
	}

	req.user = user;
	next()
}

authRoutes.get('/token/validate', jwtAuthMiddleware, (_req, res) => {
	res.status(200).send();
})