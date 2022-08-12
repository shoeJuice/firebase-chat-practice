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
} from "@mantine/core";
import ProtectedRoute from "../modules/auth/ProtectedRoute";
import Nav from "../modules/nav/Nav";
import Header from "../modules/layout/Header";

const allowedRoutes = ["/", "/login", "/register"];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || colorScheme == "dark" ? "light" : "dark");

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{colorScheme}}>
        <AuthenticationProvider>
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
                backgroundColor: theme.colorScheme == "light" ? "white" : "black",
                color: theme.colorScheme == "light" ? "black" : "white",
              }
            })}
          >
            {allowedRoutes.includes(router.pathname) ? (
              <Component {...pageProps} />
            ) : (
              <ProtectedRoute>
                <Component {...pageProps} />
              </ProtectedRoute>
            )}
          </AppShell>
        </AuthenticationProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default MyApp;
