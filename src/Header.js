// Fejléc, navigáció
import React, { useContext } from 'react'
import {Link} from 'react-router-dom';
import { AuthContext } from "./context/AuthContext";
export const Header = () => {

    const { loggedIn } = useContext(AuthContext)
    return (
        <nav className="navbar bg-light navbar-expand-lg navbar-light">
            <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
                <Link to="/" className="nav-link">Posts</Link>
            </li>
            {loggedIn === true && (
                <>
                    <li>
                        <Link to="/create" className="p-2 btn btn-primary">Create Post</Link>
                    </li>
                </>
            )}
            </ul>
            <ul className="navbar-nav mr-right">
            {loggedIn === false && (
                <>
                    <li className="navbar-item">
                        <Link to="/login" className="nav-link">Sign In</Link>
                    </li>
                </>
            )}
            {loggedIn === true && (
                <>
                    <li className="navbar-item">
                        <Link to="/myposts" className="nav-link">My Posts</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/signout" className="nav-link">Sign Out</Link>
                    </li>
                </>
            )}
            </ul>
        </nav>
    )
}

