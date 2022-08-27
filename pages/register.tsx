import {
  Input,
  Button,
  Text,
  useChakra,
  Flex,
  FormLabel,
  Box,
  VStack,
  FormControl,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { useRouter } from "next/router";
import useRegisterStyles, {useMotionStyles} from "../modules/jss/register_styles";
import { useAuthentication } from "../context/AuthenticationContext";

function Register() {
  const { theme } = useChakra();
  const router = useRouter();
  const styles = useRegisterStyles();
  const motionStyles = useMotionStyles();
  console.log(theme);
  const { registerWithEmailAndPassword } = useAuthentication();

  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const usernameRef = React.useRef<HTMLInputElement>(null);

  const handleRegister = () => {
    registerWithEmailAndPassword(emailRef.current?.value, passwordRef.current?.value, usernameRef.current?.value);
  }

  return (
    <motion.div
      animate={{
        backgroundPositionY: "-2000%",
        transition: { duration: 100, ease: "linear", loop: Infinity },
      }}
      className={styles.fullPage}
    >
      <Box boxShadow={"dark-lg"} backgroundColor={"white"} zIndex={3}>
        <motion.div
          className={motionStyles.registerPanel}
        >
          <Button
            colorScheme="purple"
            size="lg"
            onClick={() => router.push("/")}
          >
            Back
          </Button>
          <Flex
            align="center"
            justify="center"
            bg={useColorModeValue("white", "gray.800")}
            
          >
            <VStack width="100%" spacing={5} flexDirection="column" paddingY={10} paddingX={8}>
              <Heading
                marginX="auto"
                color={theme.colors.gray[700]}
                size="lg"
              >
                Register
              </Heading>
              <Text
                width={["300px", "450px", "600px"]}
                color={theme.colors.gray[700]}
                
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Commodi, a? Ad impedit consequatur illo vel, labore fugit in,
                cupiditate dolorum temporibus odit reprehenderit hic aperiam
                quaerat iste repellat excepturi nisi?
              </Text>
              <Box width="100%">
                <FormControl>
                  <FormLabel htmlFor="email">Username</FormLabel>
                  <Input ref={usernameRef} />
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input ref={emailRef} />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input ref={passwordRef} />
                </FormControl>
                <FormControl ></FormControl>
                <Button colorScheme="purple" size="lg" mt={10} onClick={handleRegister}>
                  Register
                </Button>
              </Box>
            </VStack>
          </Flex>
        </motion.div>
      </Box>
    </motion.div>
  );
}

export default Register;

/*
                  <FormLabel htmlFor="password">Confirm Password</FormLabel>
                  <Input />
*/