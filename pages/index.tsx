import type { NextPage } from "next";
import Head from "next/head";
import { WordSwitcher } from "../modules/layout/WordSwitcher";
import { motion } from "framer-motion";
import {
  Button,
  UnstyledButton,
  useMantineTheme,
  useMantineColorScheme,
  Center,
} from "@mantine/core";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextLink } from "@mantine/next";

const Home: NextPage = () => {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      style={{
        backgroundColor: theme.colorScheme == "light" ? "white" : "black",
        color: theme.colorScheme == "light" ? "black" : "white",
      }}
      animate={{
        opacity: 1,
        backgroundColor: "white",
        transition: { duration: 1, ease: "linear" },
      }}
      className={styles.fullPage}
    >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.splashContainer}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1, ease: "easeIn", delay: 1 } }}
        >
          <h1>Welcome to Remy&apos;s Chat App.</h1>
          <h2>For my {<WordSwitcher />}</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum
            illum voluptates dolorum nobis unde ullam vero eligendi cumque
            exercitationem, consequuntur laudantium ratione eius doloremque
            cupiditate quas voluptatem laboriosam. Enim, voluptatem?
          </p>

          <div>
            <NextLink href="/register">
              <Button mt={20} size="lg">
                Register Today!
              </Button>
            </NextLink>
          </div>
          <div
            style={{
              width: "70%",
            }}
          >
            <NextLink href="/login">
              <UnstyledButton
                mt={10}
                style={{
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.whiteAlpha[8]
                      : theme.colors.blackAlpha[9],
                }}
              >
                If you already have an account, click here to log in.
              </UnstyledButton>
            </NextLink>
          </div>
        </motion.div>
        <motion.div
          className={styles.splashImage}
          initial={{
            opacity: 0,
            x: "100%",
          }}
          animate={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 1,
              ease: "easeInOut",
            },
          }}
          layout
        >
          <Image
            src="/gummy-wfh.svg"
            width={1000}
            height={1000}
            alt="Chat Splash"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
