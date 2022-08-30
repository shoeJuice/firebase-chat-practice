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
import useRegisterStyles, {
  useMotionStyles,
} from "../modules/jss/register_styles";
import { useAuthentication } from "../context/AuthenticationContext";

function Register() {
  const { theme, colorMode } = useChakra();
  const router = useRouter();
  const styles = useRegisterStyles();
  const motionStyles = useMotionStyles();
  console.log(theme);
  const { registerWithEmailAndPassword } = useAuthentication();

  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const usernameRef = React.useRef<HTMLInputElement>(null);

  const handleRegister = () => {
    registerWithEmailAndPassword(
      emailRef.current?.value,
      passwordRef.current?.value,
      usernameRef.current?.value
    );
  };

  return (
    <motion.div
      animate={{
        backgroundPositionY: "2000%",
        transition: { duration: 200, ease: "linear", loop: Infinity },
      }}
      className={styles.fullPage}
    >
      <Box
        boxShadow={"dark-lg"}
        backgroundColor={
          colorMode == "dark" ? "gray.800" : theme.colors.gray[50]
        }
        zIndex={3}
      >
        <motion.div className={motionStyles.registerPanel}>
          <Button
            colorScheme="purple"
            size="lg"
            onClick={() => router.push("/")}
            mb={10}
          >
            Back
          </Button>
          <Flex
            align="center"
            justify="center"
            bg={useColorModeValue("white", "whiteAlpha.300")}
            borderRadius={6}
            boxShadow="base"
          >
            <VStack
              width="100%"
              spacing={5}
              flexDirection="column"
              paddingY={10}
              paddingX={8}
            >
              <Heading
                marginX="auto"
                color={
                  colorMode == "dark"
                    ? theme.colors.gray[50]
                    : theme.colors.gray[800]
                }
                size="lg"
              >
                Register
              </Heading>
              <Text
                width={["300px", "450px", "600px"]}
                color={
                  colorMode == "dark"
                    ? theme.colors.gray[50]
                    : theme.colors.gray[800]
                }
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Commodi, a? Ad impedit consequatur illo vel, labore fugit in,
                cupiditate dolorum temporibus odit reprehenderit hic aperiam
                quaerat iste repellat excepturi nisi?
              </Text>
              <Box width="100%">
                <FormControl>
                  <FormLabel
                    color={
                      colorMode == "dark"
                        ? theme.colors.gray[50]
                        : theme.colors.gray[800]
                    }
                    htmlFor="email"
                  >
                    Email
                  </FormLabel>
                  <Input
                    color={
                      colorMode == "dark"
                        ? theme.colors.gray[50]
                        : theme.colors.gray[800]
                    }
                    backgroundColor={
                      colorMode == "light" && theme.colors.blackAlpha[100]
                    }
                    boxShadow="inner"
                    type="email"
                    ref={emailRef}
                  />
                  <FormLabel
                    color={
                      colorMode == "dark"
                        ? theme.colors.gray[50]
                        : theme.colors.gray[800]
                    }
                    htmlFor="email"
                  >
                    Username
                  </FormLabel>
                  <Input
                    color={
                      colorMode == "dark"
                        ? theme.colors.gray[50]
                        : theme.colors.gray[800]
                    }
                    backgroundColor={
                      colorMode == "light" && theme.colors.blackAlpha[100]
                    }
                    boxShadow="inner"
                    ref={usernameRef}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel
                    color={
                      colorMode == "dark"
                        ? theme.colors.gray[50]
                        : theme.colors.gray[800]
                    }
                    htmlFor="password"
                  >
                    Password
                  </FormLabel>
                  <Input
                    color={
                      colorMode == "dark"
                        ? theme.colors.gray[50]
                        : theme.colors.gray[800]
                    }
                    backgroundColor={
                      colorMode == "light" && theme.colors.blackAlpha[100]
                    }
                    boxShadow="inner"
                    type="password"
                    ref={passwordRef}
                  />
                </FormControl>
                <FormControl></FormControl>
                <Button
                  colorScheme="purple"
                  size="lg"
                  mt={10}
                  onClick={handleRegister}
                >
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
