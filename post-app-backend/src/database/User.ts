// @ts-nocheck
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./Post";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ length: 255, unique: true })
	name: string

	@Column({ length: 255, unique: true })
	email: string

	@Column({ length: 100, select: false })
	password: string

	@OneToMany(() => Post, (post) => post.author)
	posts: Post[]
}