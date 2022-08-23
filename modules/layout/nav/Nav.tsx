import React from "react";
import { useAuthentication } from "../../../context/AuthenticationContext";
import {
  Button,
  Text,
  Stack,
  useChakra,
  useColorModeValue,
  theme,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import NextLink from "next/link";

import { FaUserAlt, FaCog } from "react-icons/fa";
import { HiChatAlt2, HiLogout } from "react-icons/hi";

const Nav = ({ hiddenBreakpoint, hidden }: any) => {
  const { login, user, logout } = useAuthentication();

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
      backgroundColor={theme.colors.purple[200]}
      position="relative"
      boxShadow="xl"
      alignItems={["center", "flex-start"]}
      justifyContent={[
        "space-between",
        "space-between",
        "flex-start",
        "flex-start",
      ]}
      padding={10}
      zIndex={100}
      order={["1", "1", "0", "0"]}
    >
      <NextLink href="/rooms">
        <Button
          boxShadow="xl"
          colorScheme="purple"
          aria-label="Chat-Rooms"
          size="lg"
          width="100%"
        >
          <Icon mr={[0, 0, 2, 2]} as={HiChatAlt2} />
          <Text display={["none", "none", "block", "block"]}>Rooms</Text>
        </Button>
      </NextLink>

      <Button
        boxShadow="xl"
        colorScheme="purple"
        aria-label="Profile"
        size="lg"
        width="100%"
      >
        <Icon mr={[0, 0, 2, 2]} as={FaUserAlt} />
        <Text display={["none", "none", "block", "block"]}>Profile</Text>
      </Button>

      <Button
        boxShadow="xl"
        colorScheme="purple"
        aria-label="Settings"
        size="lg"
        width="100%"
      >
        <Icon mr={[0, 0, 2, 2]} as={FaCog} />
        <Text display={["none", "none", "block", "block"]}>Settings</Text>
      </Button>

      <Button
        boxShadow="xl"
        colorScheme="purple"
        aria-label="Logout"
        size="lg"
        onClick={logout}
        width="100%"
      >
        <Icon mr={[0, 0, 2, 2]} as={HiLogout} />
        <Text display={["none", "none", "block", "block"]}>Logout</Text>
      </Button>
    </Stack>
  );
};

export default Nav;
