import React from "react";
import { useAuthentication } from "../../../context/AuthenticationContext";
import {
  Button,
  Text,
  Stack,
  useChakra,
  useColorModeValue,
  useColorMode,
  theme,
  IconButton,
  Icon,
  HStack,
} from "@chakra-ui/react";
import NextLink from "next/link";

import { FaUserAlt, FaCog } from "react-icons/fa";
import { HiChatAlt2, HiLogout } from "react-icons/hi";

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
    <Stack
      direction={["row", "row", "column", "column"]}
      backgroundColor={
        colorMode == "dark"
          ? theme.colors.whiteAlpha[500]
          : theme.colors.purple[200]
      }
      position="relative"
      boxShadow={["dark-lg", "dark-lg", "xl", "xl"]}
      alignItems={["center", "center", "flex-start", "flex-start"]}
      justifyContent={[
        "space-between",
        "space-between",
        "flex-start",
        "flex-start",
      ]}
      padding={5}
      zIndex={100}
      order={["1", "1", "0", "0"]}
      flex={1}
    
    >
      <NextLink href="/rooms">
        <Button
          boxShadow="xl"
          colorScheme="purple"
          aria-label="Chat-Rooms"
          size="lg"
          width="100%"
        >
          <HStack
            spacing={2}
            justifyContent={["center", "center", "flex-start", "flex-start"]}
            width="100%"
          >
            <Icon as={HiChatAlt2} />
            <Text display={["none", "none", "block", "block"]}>Rooms</Text>
          </HStack>
        </Button>
      </NextLink>

      <Button
        boxShadow="xl"
        colorScheme="purple"
        aria-label="Profile"
        size="lg"
        width="100%"
      >
        <HStack
          spacing={2}
          justifyContent={["center", "center", "flex-start", "flex-start"]}
          width="100%"
        >
          <Icon as={FaUserAlt} />
          <Text display={["none", "none", "block", "block"]}>Profile</Text>
        </HStack>
      </Button>

      <NextLink href="/settings">
        <Button
          boxShadow="xl"
          colorScheme="purple"
          aria-label="Settings"
          size="lg"
          width="100%"
        >
          <HStack
            spacing={2}
            justifyContent={["center", "center", "flex-start", "flex-start"]}
            width="100%"
          >
            <Icon as={FaCog} />
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
      >
        <HStack
          spacing={2}
          justifyContent={["center", "center", "flex-start", "flex-start"]}
          width="100%"
        >
          <Icon as={HiLogout} />
          <Text display={["none", "none", "block", "block"]}>Logout</Text>
        </HStack>
      </Button>
    </Stack>
  );
};

export default Nav;
