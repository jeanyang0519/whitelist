import { Field, ObjectType } from "type-graphql"
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { User } from "./User";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  plate!: string

  @Field()
  @Column()
  company!: string

  @Field()
  @Column()
  creatorId: number

  @Field()
  @ManyToOne(() => User, user => user.posts)
  creator: User

  @Field(() => String)
  @CreateDateColumn()
  createdAt:Date
  
  @Field(() => String)
  @UpdateDateColumn()
  updatedAt:Date
}