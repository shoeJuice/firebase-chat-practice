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
import React from "react";
import { useAuthentication } from "../context/AuthenticationContext";
import { motion } from "framer-motion";
import { ConfettiAnimation } from "../modules/layout/BackgroundAnimations";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import nookies from "nookies";
import initAdminApp from "../modules/auth/InitAdminApp";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  loginForm: {
    borderRadius: 6,
    zIndex: 50,
    backgroundColor: theme.colors.purple[300],
    color: theme.colors.whiteAlpha[900],
    padding: {
      left: 30,
      right: 30,
      top: 20,
      bottom: 20,
    },
    boxShadow: "10 10 5 rgba(0, 0, 0, 0.1)",
  },
});

function LoginPage() {
  const { theme, colorMode, toggleColorMode, setColorMode } = useChakra();
  const { login, user, logout, loginWithGoogle } = useAuthentication();

  const styles = useStyles();

  console.log("Color Scheme", theme.keys);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 2.5, ease: "linear" } }}
      exit={{ opacity: 0 }}
    >
      <ConfettiAnimation
        opacity={5}
        numConfetti={250}
        excludeList={["gray", "dark", "blackAlpha", "whiteAlpha"]}
      >
        <Container position="relative">
          <motion.div
            className={styles.loginForm}
            initial={{ opacity: 0, y: "200%" }}
            animate={{ opacity: 1, y: 0, transition: { duration: 2.5 } }}
            exit={{ opacity: 0 }}
          >
            <Heading as="h1" size="xl" mb={5}>
              Login
            </Heading>
            <Stack spacing={2} my={5}>
              <FormLabel>E-mail Address</FormLabel>
              <Input
                backgroundColor={theme.colors.blackAlpha[300]}
                color={theme.colors.whiteAlpha[900]}
                borderColor={theme.colors.blackAlpha[500]}
                sx={{
                  _hover: {
                    borderColor: theme.colors.blackAlpha[800],
                  },
                }}
                placeholder="E-mail Address"
              />
              <FormLabel>Password</FormLabel>
              <Input
                backgroundColor={theme.colors.blackAlpha[300]}
                color={theme.colors.whiteAlpha[900]}
                borderColor={theme.colors.blackAlpha[500]}
                sx={{
                  _hover: {
                    borderColor: theme.colors.blackAlpha[800],
                  },
                }}
                placeholder="Password"
              />
              <Button colorScheme="purple" mt={10}>
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
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { adminApp, adminAuth } = initAdminApp();

  try {
    const cookies = nookies.get(context);
    const token = await adminAuth.verifyIdToken(cookies.token);
    context.res.writeHead(302, { location: "/rooms" });
    context.res.end();
    return {
      props: {
        uid: token.uid,
        email: token.email,
      },
    };
  } catch (e) {
    context.res.writeHead(302, { location: "/" });
    context.res.end();
    return {
      props: {} as never,
    };
  }
};
