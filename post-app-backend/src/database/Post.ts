import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Post {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ length: 255 })
	title: string

	@Column({ type: "text" })
	content: string

	@ManyToOne(() => User, (user) => user.posts)
	author: User
}