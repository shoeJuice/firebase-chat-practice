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
      direction="column"
      backgroundColor={theme.colors.purple[300]}
      position="relative"
      minH="container.xl"
      padding={10}
      zIndex={100}
    >
      <Button colorScheme="purple" aria-label="Chat-Rooms" size="lg">
        <Icon mr={2} as={HiChatAlt2} />
        <Text>Rooms</Text>
      </Button>

      <Button colorScheme="purple" aria-label="Chat-Rooms" size="lg">
        <Icon mr={2} as={FaUserAlt} />
        <Text>Profile</Text>
      </Button>
      <Button colorScheme="purple" aria-label="Chat-Rooms" size="lg">
        <Icon mr={2} as={FaCog} />
        <Text>Settings</Text>
      </Button>
      <Button colorScheme="purple" aria-label="Chat-Rooms" size="lg" onClick={logout}>
        <Icon mr={2} as={HiLogout} />
        <Text>Logout</Text>
      </Button>
    </Stack>
  );
};

export default Nav;
