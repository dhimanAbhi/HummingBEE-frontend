import { useState } from "react";
import { Children, createContext, useContext } from "react";
import axios from "axios"
const AuthContext = createContext()

export const Authprovider = ({children}) => {
    const [loggedUser, setloggedUser] = useState(null)


    const logIn = (user) => {
        setloggedUser(user)
    }

    const logOut = () => {
        setloggedUser(null)
    }

    return (
        <AuthContext.Provider value={{loggedUser, logIn, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}