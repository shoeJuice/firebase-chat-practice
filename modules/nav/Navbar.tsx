import React from 'react'
import { useAuthentication } from '../../context/AuthenticationContext'
import NextLink from 'next/link';


const Navbar = () => {

    const {login, user, logout} = useAuthentication();
    const handleLogin = () => {
        if (!user) {
            login();
        } else {
            logout();
        }
    }
  return (
    <div>
        Navbar
        <ul>
            <li><NextLink href={'/'}>Home</NextLink></li>
            <li>About</li>
            <li>Contact</li>
            {user && <li><NextLink href={'/rooms'}>Rooms</NextLink></li>}
            <li><button onClick={handleLogin}>{user ? "Logout" : "Login"}</button></li>
        </ul>
    </div>
  )
}

export default Navbar