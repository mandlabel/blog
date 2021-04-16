import { useContext } from 'react'
import axios from 'axios'
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

export const SignOut = async () => {

    const { getLoggedIn } = useContext(AuthContext);
    const history = useHistory();
    await axios.get("/api/logout")
    await getLoggedIn();
    history.push('/')
}