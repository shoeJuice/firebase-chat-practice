import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthenticationProvider } from "../context/AuthenticationContext";
import {useRouter} from 'next/router'
import ProtectedRoute from "../modules/auth/ProtectedRoute";
import Navbar from "../modules/nav/Navbar";

const allowedRoutes = ["/", "/login", "/register"];

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();


  return (
    <AuthenticationProvider>
      <Navbar />
      {allowedRoutes.includes(router.pathname) ? <Component {...pageProps} /> : <ProtectedRoute><Component {...pageProps} /></ProtectedRoute>}
    </AuthenticationProvider>
  );
}

export default MyApp;
