import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./Post";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column({ unique: true })
  username!: string
  
  @Column({ unique: true })
  password!: string

  @OneToMany(() => Post, post => post.creator)
  posts: Post[]

  @Field(() => String)
  @CreateDateColumn()
  createdAt:Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt:Date
}