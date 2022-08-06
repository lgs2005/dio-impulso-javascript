import { NextFunction, Request, Response } from "express";

export class HttpError extends Error {
	code: number
	description: string

	constructor(code: number, description: any) {
		super(`HTTP ${code}: ${String(description)}`);
		this.code = code;
		this.description = description;
	}
}

export function handleHttpErrorMiddleware(err: any, _req: Request, res: Response, next: NextFunction) {
	if (err instanceof HttpError) {
		res.status(err.code).json({ error: err.description }).send();
	} else {
		next();
	}
}