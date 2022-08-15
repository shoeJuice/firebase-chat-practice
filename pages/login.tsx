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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 2.5, ease: "linear" } }}
      exit={{ opacity: 0 }}
    >
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
          <motion.div
            style={{
              backgroundColor: theme.colors.whiteAlpha[6],
              padding: theme.spacing.sm,
              borderRadius: 6,
              zIndex: 50,
            }}
            initial={{ opacity: 0, y: "200%" }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            exit={{ opacity: 0 }}
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
              <Button color="grape" mt={10}> Sign In </Button>
            </Stack>

            <Divider my="lg" />
            <Button color="grape" onClick={loginWithGoogle} style={{ width: "100%" }}>
              Sign In with Google
            </Button>
          </motion.div>
        </Container>
      </ConfettiAnimation>
    </motion.div>
  );
}

export default LoginPage;
