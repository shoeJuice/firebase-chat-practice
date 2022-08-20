import React from "react";
import { useAuthentication } from "../../context/AuthenticationContext";
import {
  Navbar,
  Button,
  Image,
  Center,
  Stack,
  Space,
  Group,
  Divider,
  useMantineColorScheme,
} from "@mantine/core";
import NextLink from "next/link";

const Nav = ({ hiddenBreakpoint, hidden }: any) => {
  const { login, user, logout } = useAuthentication();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const handleLogin = () => {
    if (!user) {
      login();
    } else {
      console.log(user);
      logout();
    }
  };

  return (
    <Navbar>
      
    </Navbar>
  );
};

export default Nav;
