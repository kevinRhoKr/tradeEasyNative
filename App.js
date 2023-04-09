import { StatusBar } from "expo-status-bar";
import React, { useContext, useState} from "react";
import { StyleSheet, Text, View, Button, Alert, TextInput } from "react-native";
import Auth from "./src/components/Auth";
// import AuthContext from "./src/store/AuthContext";
import { AuthContext } from "./src/store/AuthContextNew";
// import { AuthContextProvider } from "./src/store/AuthContext";


export default function App() {
  // const authCtx = useContext(AuthContext);
  /*
 token: "",
        isLoggedIn: false
  */
  const [authState, setAuthState] = useState({
    token:"",
    isLoggedIn: false
  })


  return (
    <AuthContext.Provider value={[authState, setAuthState]}>
      <View style={styles.container}>
        
        {authState.isLoggedIn?
        <Text>Logged iN!! {authState.token} </Text> :
        <Auth></Auth>
        }
        
      </View>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
