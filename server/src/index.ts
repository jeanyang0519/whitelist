import "reflect-metadata"
import { COOKIE_NAME, __prod__ } from "./constants"
import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import {buildSchema} from 'type-graphql'
import { PostResolver } from "./resolvers/post"
import { UserResolver } from "./resolvers/user"
import redis from 'redis'
import session from 'express-session'
import connectRedis from 'connect-redis'
import cors from 'cors'
import { createConnection } from 'typeorm'
import { User } from "./entities/User"
import { Post } from "./entities/Post"

const main = async () => {
    await createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
        logging: true,
        synchronize: true,
        entities: [Post, User],
    })

    const app = express()
    const RedisStore = connectRedis(session)
    const redisClient = redis.createClient()
    app.use(
        cors({
            origin: "http://localhost:3000",
            credentials: true
        })
    )
    app.use(
        session({
            name: COOKIE_NAME,
            store: new RedisStore({
                client: redisClient,
                disableTouch: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: true,
                sameSite: 'lax',
                secure: __prod__,
            },
            saveUninitialized: false,
            secret: ';alkdsnfoiweng12341234fasdf',
            resave: false,
        })
    )
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PostResolver, UserResolver],
            validate: false,
        }),
        context: ({  req, res }) => ({ req, res }),
    })

    apolloServer.applyMiddleware({
        app,
        cors: false
    })
    
    app.listen(4000, () => {
        console.log('server start')
    })
}

main().catch((err) => {
    console.error(err)
})