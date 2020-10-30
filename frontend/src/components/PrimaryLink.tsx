import React from "react";
import { Box, Link } from "@chakra-ui/core"
import NextLink from "next/link";

interface PrimaryLinkProps {
    text: string;
    href: string;
    mr?: number;
}

export const PrimaryLink: React.FC<(PrimaryLinkProps)> = ({
    text,
    href,
    mr,
}) => {
  return (
    <Box fontSize="xs" mt={2}>
        <NextLink href={href}>
            <Link mr={mr}>{text}</Link>
        </NextLink>
    </Box>
  );
};