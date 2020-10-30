import React from "react";
import { Wrapper, WrapperVariant } from "./Wrapper";
import { Link, Flex, Box, Button } from "@chakra-ui/core"
import NextLink from "next/link"

interface SplashProps {
  variant?: WrapperVariant;
}

export const Splash: React.FC<SplashProps> = ({ children, variant }) => {
  return (
    
    <Wrapper variant={variant}>
        <NextLink href="/login">
            <Link mr={2}>Log in</Link>
        </NextLink>
        <NextLink href="/register">
            <Link>Get started</Link>
        </NextLink>
        this is a splash page
        {children}
    </Wrapper>
  );
};