import React, { useEffect } from 'react'
import { useAuthentication } from '../../context/AuthenticationContext';
import { useRouter } from 'next/router';

/**
 * @description - This component is used to conditionally render 
 * the component based on the authentication state.
 */
const ProtectedRoute = ({children}: any) => {

    const router = useRouter();
    const { user } = useAuthentication();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, []);

  return (
    user ? children : <h1>Need to be logged in to view content.</h1>
  )
}

export default ProtectedRoute