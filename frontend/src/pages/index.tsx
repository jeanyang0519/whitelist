import { Button } from "@chakra-ui/core"
import { withUrqlClient } from "next-urql"
import React from "react"
import { Layout } from "../components/Layout"
import { usePostsQuery } from "../generated/graphql"
import { createUrqlClient } from "../utils/createUrqlClient"
import NextLink from "next/link"

const Index = () => {
  const [{ data }] = usePostsQuery()
  return (
    <Layout variant="regular">
      <NextLink href="/create-post">
                <Button>create post</Button>
      </NextLink>
      {!data ? (
        <div>loading...</div>
      ) : (
        data.posts.map((p) => <div key={p.id}>{p.plate}</div>)
      )}
    </Layout>

  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
