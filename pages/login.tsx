import {
  Container,
  Stack,
  TextInput,
  useMantineTheme,
  useMantineColorScheme,
  createStyles,
  Button,
  Space,
  Divider,
} from "@mantine/core";
import React from "react";
import { useAuthentication } from "../context/AuthenticationContext";
import { motion } from "framer-motion";
import { ConfettiAnimation } from "../modules/layout/BackgroundAnimations";

const useStyles = createStyles((theme) => ({
  label: {
    color: theme.colors.gray[2],
  },
}));

function LoginPage() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const { classes } = useStyles();
  const { login, user, logout, loginWithGoogle } = useAuthentication();

  console.log("Color Scheme", colorScheme);
  return (
    <ConfettiAnimation
      opacity={5}
      numConfetti={1000}
      excludeList={["gray", "dark", "blackAlpha", "whiteAlpha"]}
    >
      <Container
        style={{
          position: "relative",
        }}
      >
        <h1>Login</h1>
        <div
          style={{
            backgroundColor: theme.colors.whiteAlpha[6],
            padding: theme.spacing.sm,
            borderRadius: 6,
            zIndex: 50,
          }}
        >
          <Stack spacing={2} mb={10}>
            <TextInput
              placeholder="E-mail Address"
              label="Email"
              //classNames={{label: classes.label}}
            />
            <TextInput
              placeholder="Password"
              label="Password"
              styles={{
                label: { color: colorScheme == "light" ? "dark" : "white" },
              }}
            />
            <Button mt={10}> Sign In </Button>
          </Stack>

          <Divider my="lg" />
          <Button onClick={loginWithGoogle} style={{ width: "100%" }}> Sign In with Google </Button>
        </div>
      </Container>
    </ConfettiAnimation>
  );
}

export default LoginPage;
