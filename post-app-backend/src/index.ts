import * as express from "express";
import * as cors from "cors";
import { db } from "./database/db";
import { authRoutes } from "./auth";
import { userRoutes } from "./routers/users";
import { postRoutes } from "./routers/posts";
import { searchRoutes } from "./routers/search";

async function startServer() {  
    await db.initialize();
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use(userRoutes);
    app.use(authRoutes);
    app.use(postRoutes);
    app.use(searchRoutes);
    
    app.listen(5000, () => {
        console.log('server up');
    });
}

startServer();