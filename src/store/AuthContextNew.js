import React, { createContext, useContext } from "react";


export const AuthContext = createContext({
    authState: {
        token: "",
        isLoggedIn: false
    }
})

