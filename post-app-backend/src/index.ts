import * as express from "express";
import * as cors from "cors";
import { db } from "./database/db";
import { authRoutes } from "./auth";
import { handleHttpErrorMiddleware } from "./HttpError";

async function startServer() {  
    await db.initialize();
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use(authRoutes);
    
    app.use(handleHttpErrorMiddleware)

    app.listen(3000, () => {
        console.log('server up');
    });
}

startServer();