import React from 'react'
import { useAuthentication } from '../../context/AuthenticationContext';

/**
 * @description - This component is used to conditionally render 
 * the component based on the authentication state.
 */
const ProtectedRoute = ({children}: any) => {

    const { user } = useAuthentication();

  return (
    user ? children : <h1>Need to be logged in to view content.</h1>
  )
}

export default ProtectedRoute