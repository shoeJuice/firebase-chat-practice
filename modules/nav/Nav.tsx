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
} from "@mantine/core";
import NextLink from "next/link";

const Nav = ({hiddenBreakpoint, hidden} : any) => {
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
    <Navbar width={{ sm: 200, lg: 300 }} p="xs" hiddenBreakpoint={hiddenBreakpoint} hidden={hidden}>
      <Navbar.Section grow mt="mid">
        <Stack align='flex-start'>
          <NextLink href={"/"}>
            <Button variant="subtle">Home</Button>
          </NextLink>

          <Button variant="subtle">About</Button>

          <Button variant="subtle">Contact</Button>

          {user && (
            <NextLink href={"/rooms"}>
              <Button variant="subtle">Rooms</Button>
            </NextLink>
          )}

          <Button onClick={handleLogin}>{user ? "Logout" : "Login"}</Button>
        </Stack>
      </Navbar.Section>
      <Divider my="md" />
      <Navbar.Section>
        <Group spacing="xs">
          {user && (
            <Image
              radius="xl"
              src={user?.photoURL}
              width={60}
              height={60}
              alt={user?.displayName}
            />
          )}
          <Space w="xs" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>{user?.displayName}</div>
            <div>{user?.email}</div>
          </div>
        </Group>
      </Navbar.Section>
    </Navbar>
  );
};

export default Nav;
