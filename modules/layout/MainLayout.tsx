import React, { useState, useEffect } from "react";
import {
  Container,
  Stack,
  Button,
  Flex,
  Text,
  Heading,
  Box,
  theme,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useColorModeValue } from "@chakra-ui/react";
import Nav from "./nav/Nav";

/**
 * @description The main layout for wrapping app content.
 * Use this layout with all pages that need navigation, header, footer, etc.
 */
export const MainLayout = ({ children }: any) => {
  return (
    <Container
      maxW="100v"
      minH="container.xl"
      backgroundColor={theme.colors.purple[300]}
      
    >
      <Flex width="100%" height="100%">
        <Nav />
        <Container
          minW="100%"
          backgroundColor={theme.colors.gray[100]}
          padding={10}
        >
          <Box width="80%" boxShadow="md" padding={5} borderRadius={8} color={theme.colors.gray[600]} backgroundColor={theme.colors.whiteAlpha[800]}>{children}</Box>
        </Container>
      </Flex>
    </Container>
  );
};
