import { useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthenticationProvider } from "../context/AuthenticationContext";
import { useRouter } from "next/router";
import {
  MantineProvider,
  AppShell,
  Navbar,
  ColorScheme,
  ColorSchemeProvider,
  Center,
  useMantineTheme,
} from "@mantine/core";
import ProtectedRoute from "../modules/auth/ProtectedRoute";
import Nav from "../modules/nav/Nav";
import Header from "../modules/layout/Header";
import { AnimatePresence, motion } from "framer-motion";
import { vw } from "../utils/functions/getDimensions";
import useRainbow from "../utils/functions/useRainbow";
import { Button, ChakraProvider } from "@chakra-ui/react";

const allowedRoutes = ["/", "/login", "/register"];

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
