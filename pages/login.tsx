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
    color: theme.colors.gray[50],
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
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
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
                color={theme.colors.gray[50]}
                borderColor={theme.colors.blackAlpha[500]}
                sx={{
                  _hover: {
                    borderColor: theme.colors.blackAlpha[800],
                  },
                  _placeholder: {
                    color: theme.colors.gray[50],
                  }
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
                  }
                }}
                placeholder="Password"
                ref={passwordRef}
              />
              <Button colorScheme="purple" mt={10} onClick={() => {
                login(emailRef.current?.value, passwordRef.current?.value);
              }}>
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
    console.log("No user detected\nUser:", context.req.headers["user-agent"])
    return {
      props: {} as never,
    };
  }
};
