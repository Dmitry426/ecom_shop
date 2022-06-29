import {createContext, useState} from "react";

export const UserContext = createContext({
    auth: null,
    setAuth: () => null
})

export const UserProvider = ({children}) => {
        const [auth, setAuth] = useState(null)
        const value = [auth, setAuth]
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

