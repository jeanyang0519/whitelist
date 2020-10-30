import { Box, Button, Flex, IconButton, Link, Stack, Text,Heading } from "@chakra-ui/core"
import { withUrqlClient } from "next-urql"
import React from "react"
import { Layout } from "../components/Layout"
import { useDeletePostMutation, usePostsQuery } from "../generated/graphql"
import { createUrqlClient } from "../utils/createUrqlClient"
import NextLink from "next/link"
import { EditDeletePostButtons } from "../components/EditDeletePostButtons"

const Index = () => {
  const [{ data, fetching }] = usePostsQuery()
  const [, deletePost] = useDeletePostMutation()

  if (!fetching && !data) {
    return <div>you got query failed for some reason</div>;
  }
  
  return (
    <Layout>
      {!data && fetching ? (
          <div>loading...</div>
        ) : (
          <Stack spacing={8}>
            {data!.posts.map((p) =>
              !p ? null : (
                <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                  
                  <Box flex={1}>
                    
                      <Link>
                        <Heading fontSize="xl">{p.plate}</Heading>
                      </Link>
                    
                    {/* <Text>posted by {p.creator.username}</Text> */}
                    <Flex align="center">
                      <Text flex={1} mt={4}>
                        {p.company}
                      </Text>
                      <Box ml="auto">
                        <EditDeletePostButtons
                          id={p.id}
                          creatorId={p.creatorId}
                        />
                      </Box>
                    </Flex>
                  </Box>
                </Flex>
              )
            )}
          </Stack>
        )}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
