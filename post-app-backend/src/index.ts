import * as express from "express";
import * as cors from "cors";
import { db } from "./database/db";

async function startServer() {
    await db.initialize();
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.listen(3000, () => {
        console.log('server up');
    });
}

startServer();