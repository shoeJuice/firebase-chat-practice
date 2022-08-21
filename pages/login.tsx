import {
  Container,
  Stack,
  Input,
  Button,
  Divider,
  useChakra,
  FormLabel
} from "@chakra-ui/react";
import React from "react";
import { useAuthentication } from "../context/AuthenticationContext";
import { motion } from "framer-motion";
import { ConfettiAnimation } from "../modules/layout/BackgroundAnimations";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import nookies from "nookies";
import initAdminApp from "../modules/auth/InitAdminApp";



function LoginPage() {
  const { theme, colorMode, toggleColorMode, setColorMode } = useChakra();
  const { login, user, logout, loginWithGoogle } = useAuthentication();

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
        <Container
          style={{
            position: "relative",
          }}
        >
          <h1>Login</h1>
          <motion.div
            style={{
              borderRadius: 6,
              zIndex: 50,
            }}
            initial={{ opacity: 0, y: "200%" }}
            animate={{ opacity: 1, y: 0, transition: { duration: 2.5 } }}
            exit={{ opacity: 0 }}
          >
            <Stack spacing={2} mb={10}>
              <FormLabel>E-mail Address</FormLabel>
              <Input
                placeholder="E-mail Address"
              />
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="Password"
              />
              <Button colorScheme="purple" mt={10}>
                {" "}
                Sign In{" "}
              </Button>
            </Stack>

            <Divider my="lg" />
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
