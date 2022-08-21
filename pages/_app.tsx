import { useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthenticationProvider } from "../context/AuthenticationContext";
import { useRouter } from "next/router";
import Nav from "../modules/layout/nav/Nav";
import { AnimatePresence, motion } from "framer-motion";
import { createUseStyles } from "react-jss";
import { Button, ChakraProvider } from "@chakra-ui/react";

const useStyles = createUseStyles({
  '@global': {
    body: {
      padding: 0,
      margin: 0,
      fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
      overflow: "hidden",
      height: "100vh",
      width: "100vw",
    }
  }
});

function MyApp({ Component, pageProps, router }: AppProps) {
  const [opened, setOpened] = useState(false);

  return (
    <ChakraProvider>
      <AuthenticationProvider>
        {/* @ts-ignore */}
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={router.route}
            animate={{
              opacity: [0, 1],
              transition: {
                duration: 0.5,
                ease: "easeInOut",
              },
            }}
          >
            <Component {...pageProps} key={router.route} />
          </motion.div>
        </AnimatePresence>
      </AuthenticationProvider>
    </ChakraProvider>
  );
}

export default MyApp;
