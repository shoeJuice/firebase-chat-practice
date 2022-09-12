import {
  Container,
  Stack,
  Input,
  Button,
  Divider,
  useChakra,
  FormLabel,
  theme,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { useAuthentication } from "../context/AuthenticationContext";
import { motion } from "framer-motion";
import { ConfettiAnimation } from "../modules/layout/BackgroundAnimations";
import { useRouter } from "next/router";
import useLoginStyles from "../modules/jss/login_styles";
import ColorModeSwitcher from "../modules/layout/ColorModeSwitcher";


function LoginPage() {
  const { theme, colorMode } = useChakra();
  const { login, user, loginWithGoogle } = useAuthentication();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const styles = useLoginStyles(colorMode);
  const router = useRouter();

  useEffect(() => {
    if (user != null) {
      router.push("/rooms");
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1.5, ease: "linear" } }}
      exit={{ opacity: 0 }}
    >
      <ColorModeSwitcher />
      <ConfettiAnimation
        opacity={5}
        numConfetti={250}
        excludeList={["gray", "dark", "blackAlpha", "whiteAlpha"]}
      >
        <Container position="relative">
          <motion.div
            className={styles.loginForm}
            initial={{ opacity: 0, y: "200%" }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 1, ease: "easeInOut" },
            }}
            exit={{ opacity: 0 }}
          >
            <Heading as="h1" size="xl" mb={5}>
              Login
            </Heading>
            <Stack spacing={2} my={5}>
              <FormLabel>E-mail Address</FormLabel>
              <Input
                backgroundColor={theme.colors.blackAlpha[300]}
                color={theme.colors.gray[50]}
                borderColor={theme.colors.blackAlpha[500]}
                sx={{
                  _hover: {
                    borderColor: theme.colors.blackAlpha[800],
                  },
                  _placeholder: {
                    color: theme.colors.gray[50],
                  },
                }}
                placeholder="E-mail Address"
                ref={emailRef}
              />
              <FormLabel>Password</FormLabel>
              <Input
                backgroundColor={theme.colors.blackAlpha[300]}
                color={theme.colors.gray[50]}
                borderColor={theme.colors.blackAlpha[500]}
                sx={{
                  _hover: {
                    borderColor: theme.colors.blackAlpha[800],
                  },
                  _placeholder: {
                    color: theme.colors.gray[50],
                  },
                }}
                placeholder="Password"
                ref={passwordRef}
              />
              <Button
                colorScheme="purple"
                mt={10}
                onClick={() => {
                  login(emailRef.current?.value, passwordRef.current?.value);
                }}
              >
                {" "}
                Sign In{" "}
              </Button>
            </Stack>

            <Divider mb={5} />
            <Button
              colorScheme="purple"
              onClick={loginWithGoogle}
              style={{ width: "100%" }}
            >
              Sign In with Google
            </Button>
          </motion.div>
        </Container>
      </ConfettiAnimation>
    </motion.div>
  );
}

export default LoginPage;