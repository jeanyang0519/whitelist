import { Post } from "../entities/Post"
import { Arg, Ctx, Field, InputType, Int, Mutation, Query, Resolver, UseMiddleware } from "type-graphql"
import { MyContext } from "../types"
import { isAuth } from "../middleware/isAuth"
import { getConnection } from "typeorm"

@InputType()
class PostInput {
    @Field()
    plate: string
    @Field()
    company: string
}

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    async posts(): Promise<Post[] | null> {
    const posts = await getConnection().query(
        `
        select p.*
        from post p
        order by p."createdAt" DESC

        `
    )

        return posts
    }

    @Query(() => Post, {nullable: true})
    post(@Arg("id", () => Int) id: number): Promise<Post | undefined> {
        return Post.findOne(id)
    }

    @Mutation(() => Post)
    @UseMiddleware(isAuth)
    async createPost(
        @Arg("input") input: PostInput,
        @Ctx() { req }: MyContext
    ): Promise<Post> {
        return Post.create({
        ...input,
        creatorId: req.session.userId,
        }).save();
    }

    @Mutation(() => Post, { nullable: true })
    @UseMiddleware(isAuth)
    async updatePost(
        @Arg("id", () => Int) id: number,
        @Arg("plate") plate: string,
        @Arg("company") company: string,
        @Ctx() { req }: MyContext
    ): Promise<Post | null> {
        const result = await getConnection()
        .createQueryBuilder()
        .update(Post)
        .set({ plate, company })
        .where('id = :id and "creatorId" = :creatorId', {
            id,
            creatorId: req.session.userId,
        })
        .returning("*")
        .execute();

        return result.raw[0];
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deletePost(
        @Arg("id", () => Int) id: number,
        @Ctx() { req }: MyContext
    ): Promise<boolean> {
        await Post.delete({ id, creatorId: req.session.userId });
        return true;
    }
}