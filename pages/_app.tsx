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
import { motion } from "framer-motion";
import { vw } from "../utils/functions/getDimensions";

const allowedRoutes = ["/login", "/register"];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const windowWidth = typeof window != "undefined" && window.innerWidth;
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || colorScheme == "dark" ? "light" : "dark");
  const theme = useMantineTheme();

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
          {allowedRoutes.includes(router.pathname) ? (
            <div
              style={{
                display: "flex",
                minHeight: "100vh",
                maxWidth: "100vw",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  zIndex: -1,
                  width: "100%",
                  height: "100%",
                }}
              >
                {Array.from({length: 300}).map((index, key) => {
                  // @ts-ignore
                  const xSpread = Math.floor(Math.random() * windowWidth-3);
                  const fallSpread = Math.floor(Math.random() * 100) + 40;
                  const shadeChoice = Math.floor(Math.random() * 5) + 1;
                  return (
                    <motion.div key={key} style={{
                      position: "absolute",
                      x: xSpread,
                      y: -200,
                      zIndex: -(key),
                      width: ".5rem",
                      height: ".5rem",
                      borderRadius: "0.5rem",
                      backgroundColor: theme.colors.gray[shadeChoice],
                    }}
                    transition={{
                      y: {
                        duration: fallSpread,
                        repeat: Infinity,
                        ease: "easeOut",
                        fade: "fadeOut"
                      },
                      delay: Math.floor(Math.random() * 150) + 1,
                      repeatDelay: Math.floor(Math.random() * 10) + 1,
                      
                    }}
                    animate={{
                      y: "100vh",
                    }} />)
                })}
              </div>
              <div style={{ margin: "auto" }}>
                <Component {...pageProps} />
              </div>
            </div>
          ) : (
            <AppShell
              padding="md"
              navbar={<Nav hiddenBreakpoint="sm" hidden={!opened} />}
              navbarOffsetBreakpoint="sm"
              asideOffsetBreakpoint="sm"
              header={
                <Header
                  opened={opened}
                  onBurgerClick={() => {
                    setOpened(!opened);
                  }}
                />
              }
              styles={(theme) => ({
                main: {
                  backgroundColor:
                    theme.colorScheme == "light" ? "white" : "black",
                  color: theme.colorScheme == "light" ? "black" : "white",
                },
              })}
            >
              <ProtectedRoute>
                <Component {...pageProps} />
              </ProtectedRoute>
            </AppShell>
          )}
        </AuthenticationProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default MyApp;
