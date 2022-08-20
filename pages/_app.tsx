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

const allowedRoutes = ["/", "/login", "/register"];

function MyApp({ Component, pageProps, router }: AppProps) {
  const [opened, setOpened] = useState(false);
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || colorScheme == "dark" ? "light" : "dark");

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
          colors: {
            blackAlpha: [
              "#0000001a",
              "#00000033",
              "#0000004d",
              "#00000066",
              "#00000080",
              "#00000099",
              "#000000b3",
              "#000000cc",
              "#000000e6",
            ],
            whiteAlpha: [
              "#ffffff1a",
              "#ffffff33",
              "#ffffff4d",
              "#ffffff66",
              "#ffffff80",
              "#ffffff99",
              "#ffffffb3",
              "#ffffffcc",
              "#ffffffe6",
            ],
          },
        }}
      >
        <AuthenticationProvider>
          {/* @ts-ignore */}
          <AnimatePresence exitBeforeEnter wait>
            {allowedRoutes.includes(router.pathname) ? (
              <motion.div
                key={router.route}
                animate={{ opacity: [0,1], transition: {
                  duration: 0.5,
                  ease: "easeInOut",
                } }}
              >
                <Component {...pageProps} key={router.route} />
              </motion.div>
            ) : (
              
                <Component {...pageProps} />
            
            )}
          </AnimatePresence>
        </AuthenticationProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default MyApp;
