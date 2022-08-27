import { useState } from "react";
import type { AppProps } from "next/app";
import { AuthenticationProvider } from "../context/AuthenticationContext";

import { AnimatePresence, motion } from "framer-motion";
import injectSheet from "react-jss";
import { ChakraProvider } from "@chakra-ui/react";

const useStyles = {
  "@global": {
    body: {
      fontFamily:
        "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",

      },
    '::-webkit-scrollbar-track': {
      backgroundColor: 'rgba(0,0,0,0.1)',
    },
    '::-webkit-scrollbar': {

      backgroundColor: 'rgba(0,0,0,0.0)',
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: 'gray',
    },
  },
};

function MyApp({ Component, pageProps, router }: AppProps) {
  const [opened, setOpened] = useState(false);
  

  return (
    <ChakraProvider>
      <AuthenticationProvider>
        {/* @ts-ignore */}
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={router.route}
            animate={router.route.includes("rooms") || router.route.includes("settings") || router.route.includes("login") ? undefined : {
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

const StyledApp = injectSheet(useStyles)(MyApp);

export default injectSheet(useStyles)(MyApp);
