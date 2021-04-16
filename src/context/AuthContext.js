import React, { createContext, useEffect, useState } from "react";
import axios from "axios"

export const AuthContext = createContext()

function AuthContextProvider(props) {
    const [loggedIn, setLoggedIn] = useState(undefined)
    const getLoggedIn = async () => {
        const logged = await axios.get("/api/loggedIn");
        setLoggedIn(logged.data);
    }
    useEffect(() => {
        getLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ 
            loggedIn, getLoggedIn
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}
export { AuthContextProvider }

