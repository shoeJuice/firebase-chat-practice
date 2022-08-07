import {useState} from 'react';
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthenticationProvider } from "../context/AuthenticationContext";
import { useRouter } from "next/router";
import { MantineProvider } from "@mantine/core";
import ProtectedRoute from "../modules/auth/ProtectedRoute";
import { AppShell, Navbar } from "@mantine/core";
import Nav from "../modules/nav/Nav";
import Header from "../modules/layout/Header";

const allowedRoutes = ["/", "/login", "/register"];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [opened, setOpened] = useState(false);

  return (
    <MantineProvider>
      <AuthenticationProvider>
        <AppShell
          padding="md"
          navbar={<Nav hiddenBreakpoint="sm" hidden={!opened}/>}
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          header={<Header opened={opened} onBurgerClick={() => {setOpened(!opened)}} />}
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
  );
}

export default MyApp;
