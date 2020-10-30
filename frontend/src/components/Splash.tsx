import React from "react";
import { Wrapper } from "./Wrapper";
import { Flex, Text, Button, Stack, Heading } from "@chakra-ui/core"
import NextLink from "next/link"

interface SplashProps {}

export const Splash: React.FC<SplashProps> = ({}) => {
  return (
    <Wrapper>
        <Flex justify="center">
        <Stack >
            <Heading size="2xl">
                Whitelist
            </Heading>
            <Text>Manage your parking easy breezy</Text>
            <Flex>
                <NextLink href="/register">
                    <Button variantColor="blue" mr={2}>Get started</Button>
                </NextLink>
                <NextLink href="/login">
                    <Button variantColor="blue" variant="outline">Log in</Button>
                </NextLink>
            </Flex>
        </Stack>
        </Flex>
    </Wrapper>
  );
};