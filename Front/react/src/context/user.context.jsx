import {createContext, useState } from "react";

export const AuthContext = createContext({
    refreshToken: null,
    setAuth: () => null
})

export const AuthProvider = ({children}) => {
        const [refreshToken, setAuth] = useState(null)
        const value = [refreshToken, setAuth]
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

