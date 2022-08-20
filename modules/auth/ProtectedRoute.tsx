import React, { useEffect } from "react";
import { useAuthentication } from "../../context/AuthenticationContext";
import { useRouter } from "next/router";

/**
 * @description - This component is used to conditionally render
 * the component based on the authentication state.
 * 
 * @note - This component is deprecated and may be removed in the future.
 * Pages are now authenticated on the server.
 */
const ProtectedRoute = ({ children }: any) => {
  const router = useRouter();
  const { user } = useAuthentication();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, []);

  return user ? children : <h1>Need to be logged in to view content.</h1>;
};

export default ProtectedRoute;
