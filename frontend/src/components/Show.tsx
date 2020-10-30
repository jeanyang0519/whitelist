import React from "react";
import { Wrapper, WrapperVariant } from "./Wrapper";
import { Link, Flex, Box, Text, Heading, Stack } from "@chakra-ui/core"
import NextLink from "next/link"
import { Layout } from "./Layout";
import { EditDeletePostButtons } from "./EditDeletePostButtons";
import { PostsQuery } from "../generated/graphql";

interface ShowProps {
    data: PostsQuery;
}

export const Show: React.FC<(ShowProps)> = ({ data }) => {
  return (
    
    <>
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
    </>
  );
};