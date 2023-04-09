import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

// const [tokenState, setTokenState] = useState("");

const AuthContext = createContext({
  token: "",
  login: (token) => {},
  logout: () => {},
  isLoggedIn: false,
});

const retrieveStoredToken = async () => {
  const storedToken = await AsyncStorage.getItem("token");

  return {
    token: storedToken,
  };
};

export const AuthContextProvider = ({ children }) => {
  const tokenData = retrieveStoredToken();

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = async () => {
    setToken(null);
    await AsyncStorage.removeItem("token");
  };

  const loginHandler = async (token) => {
    console.log("here");
    setToken(token);
    await AsyncStorage.setItem("token", token);
  };

  useEffect(() => {
    retrieveStoredToken();
  }, []);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
  )

};

export default AuthContext;