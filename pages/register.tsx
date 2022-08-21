import {
  Container,
  Grid,
  HStack,
  Input,
  Stack,
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
  InputGroup,
  InputRightElement,
  Link,
  useColorMode,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { useRouter } from "next/router";
import useRegisterStyles, {useMotionStyles} from "../modules/jss/register_styles";

function Register() {
  const { theme, colorMode, setColorMode, toggleColorMode } = useChakra();
  const router = useRouter();
  const styles = useRegisterStyles();
  const motionStyles = useMotionStyles();
  console.log(theme);

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
            <Flex flexDirection="column" paddingY={10} paddingX={8}>
              <Heading
                mb={5}
                marginX="auto"
                color={theme.colors.gray[700]}
                size="lg"
              >
                Register
              </Heading>
              <Text
                width={["300px", "450px", "600px"]}
                color={theme.colors.gray[700]}
                mb={10}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Commodi, a? Ad impedit consequatur illo vel, labore fugit in,
                cupiditate dolorum temporibus odit reprehenderit hic aperiam
                quaerat iste repellat excepturi nisi?
              </Text>
              <Box>
                <FormControl>
                  <FormLabel htmlFor="email">Username</FormLabel>
                  <Input />
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input />
                  <FormLabel htmlFor="password">Confirm Password</FormLabel>
                  <Input />
                </FormControl>
                <FormControl mt={4}></FormControl>
                <Button colorScheme="purple" size="lg" mt={10}>
                  Register
                </Button>
              </Box>
            </Flex>
          </Flex>
        </motion.div>
      </Box>
    </motion.div>
  );
}

export default Register;
