import React from "react";
import { useAuthentication } from "../../../context/AuthenticationContext";
import {
  Button,
  Text,
  useColorMode,
  Icon,
  Flex,
  HStack,
} from "@chakra-ui/react";
import NextLink from "next/link";

import { FaUserAlt, FaCog } from "react-icons/fa";
import { HiChatAlt2, HiLogout } from "react-icons/hi";


/**
 * Renders a navigation bar for the application.
 * 
 * @returns 
 */
const Nav = ({ hiddenBreakpoint, hidden }: any) => {
  const { login, user, logout } = useAuthentication();
  const { colorMode } = useColorMode();

  const handleLogin = () => {
    if (!user) {
      login();
    } else {
      console.log(user);
      logout();
    }
  };

  return (
    <Flex
      direction={["row", "row", "column", "column"]}
      position="relative"
      alignItems={["center", "center", "flex-start", "flex-start"]}
      justifyContent={[
        "space-between",
        "space-between",
        "flex-start",
        "flex-start",
      ]}
      paddingY={[0, 0, "1rem", "1rem"]}
      zIndex={100}
      order={["1", "1", "0", "0"]}
      flex={.1}
      gap={1}
      height="100%"
      boxShadow="base"
    >
      <NextLink href="/rooms">
        <Button
          boxShadow="xl"
          colorScheme="purple"
          aria-label="Chat-Rooms"
          size="lg"
          width="100%"
          height={["100%" , "100%", "10%", "10%"]}
          borderRadius={0}
        >
          <HStack
            spacing={2}
            justifyContent={["center", "center", "flex-start", "flex-start"]}
            width="100%"
          >
            <Icon boxSize={["2em", "2em", "1em", "1em"]} as={HiChatAlt2} />
            <Text display={["none", "none", "block", "block"]}>Rooms</Text>
          </HStack>
        </Button>
      </NextLink>


      <NextLink href="/settings">
        <Button
          boxShadow="xl"
          colorScheme="purple"
          aria-label="Settings"
          size="lg"
          width="100%"
          height={["100%" , "100%", "10%", "10%"]}
          borderRadius={0}
        >
          <HStack
            spacing={2}
            justifyContent={["center", "center", "flex-start", "flex-start"]}
            width="100%"
          >
            <Icon boxSize={["2em", "2em", "1em", "1em"]} as={FaCog} />
            <Text display={["none", "none", "block", "block"]}>Settings</Text>
          </HStack>
        </Button>
      </NextLink>

      <Button
        boxShadow="xl"
        colorScheme="purple"
        aria-label="Logout"
        size="lg"
        onClick={logout}
        width="100%"
        height={["100%" , "100%", "10%", "10%"]}
        borderRadius={0}
      >
        <HStack
          spacing={2}
          justifyContent={["center", "center", "flex-start", "flex-start"]}
          width="100%"
        >
          <Icon boxSize={["2em", "2em", "1em", "1em"]} as={HiLogout} />
          <Text display={["none", "none", "block", "block"]}>Logout</Text>
        </HStack>
      </Button>
    </Flex>
  );
};

export default Nav;
