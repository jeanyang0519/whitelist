import { Link, Flex, Box, Button, IconButton } from "@chakra-ui/core"
import NextLink from "next/link"
import React from "react"
import { useLogoutMutation, useMeQuery } from "../generated/graphql"
import { isServer } from "../utils/isServer"

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
    const [{ data, fetching }] = useMeQuery({
        pause: isServer() // data will only be run by the brower instread of server
    })
    let body = null

    if (fetching) {
    // user not logged in
    } else if (!data?.me) {
        body = (
        <>
            <NextLink href="/login">
                <Link mr={2}>login</Link>
            </NextLink>
            <NextLink href="/register">
                <Link>register</Link>
            </NextLink>
        </>
        );
        // user is logged in
    } else {
        body = (
        <Flex align="center">
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
        );
    }
    return (
        <>
            <Flex zIndex={1} position="sticky" top={0} p={4}>
                <Box ml={"auto"} >{body}</Box>
            </Flex>
        </>
    )
}