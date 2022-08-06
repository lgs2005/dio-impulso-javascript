import { User } from "../database/User";

declare module 'express-serve-static-core' {
	interface Request {
		user?: User,
	}
}