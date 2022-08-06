import "reflect-metadata"
import { DataSource } from "typeorm"
import { Post } from "./Post"
import { User } from "./User"

export const db = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: true,
    entities: [Post, User],
    migrations: [],
    subscribers: [],
})
