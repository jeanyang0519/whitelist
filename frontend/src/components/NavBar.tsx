import { Flex, Box, Button, Spinner, Link, Heading } from "@chakra-ui/core"
import NextLink from "next/link"
import React from "react"
import { useLogoutMutation, useMeQuery } from "../generated/graphql"
import { isServer } from "../utils/isServer"

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
    const [{ data, fetching }] = useMeQuery({
        // pause: isServer() // data will only be run by the brower instread of server
    })

    if (fetching) {
        return <div>Loading <Spinner/></div>
    }
    if (data?.me) {
        return (
            <Flex zIndex={1} position="sticky" top={0} p={4} bg="blue.400" justify="space-between">
                <Box>
                    <NextLink href="/">
                    <Link>
                        <Heading>Whitelist</Heading>
                    </Link>
                    </NextLink>
                </Box>
                <Flex align="center" >
                    <Box mr={4}>Hi {data.me.username} !</Box>
                    <NextLink href="/create-post">
                        <Button
                            size="sm"
                            borderRadius="full"
                            mr={4}
                        >
                            Add list
                        </Button>
                    </NextLink>
                    <Button
                        size="sm"
                        borderRadius="full"
                        onClick={() => {
                            logout()
                        }}
                        isLoading={logoutFetching}
                    >
                        Log out
                    </Button>
                </Flex>
            </Flex>
        );
    };
};