import React, { useEffect } from "react";
import {
  Flex,
  Box,
  theme,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useColorModeValue, useColorMode } from "@chakra-ui/react";
import Nav from "./nav/Nav";

/**
 * @description The main layout for wrapping app content.
 * Use this layout with all pages that need navigation, header, footer, etc.
 */
export const MainLayout = ({ children }: any) => {
  const { colorMode } = useColorMode();
  let fullMobileHeight : number;

  useEffect(() => {
    fullMobileHeight = window.innerHeight;
  }, [window.innerHeight])

  return (
    <Box
      width="100%"
      height={[window.innerHeight, window.innerHeight, "100vh", "100vh"]}
    >
      <Flex
        backgroundColor={
          colorMode == "dark"
            ? theme.colors.whiteAlpha[500]
            : theme.colors.whiteAlpha[900]
        }
        height="100%"
        flexDirection={["column", "column", "row", "row"]}
      >
        <Nav />
        <Box
          width="100%"
          height={["85%", "85%", "100%", "100%"]}
          backgroundColor={
            colorMode == "dark"
              ? theme.colors.blackAlpha[900]
              : theme.colors.whiteAlpha[100]
          }
          flex={.9}
        >
          <Box
            boxShadow="inner"
            height={["100%", "100%", "100%", "100%"]}
            margin="auto"
            color={theme.colors.gray[600]}
            backgroundColor={theme.colors.whiteAlpha[400]}
            overflow="auto"
          >
            {children}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};
