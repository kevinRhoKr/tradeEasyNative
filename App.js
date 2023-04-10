import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, ImageBackground, ScrollView } from "react-native";
import Auth from "./src/components/Auth";
// import AuthContext from "./src/store/AuthContext";
import { AuthContext } from "./src/store/AuthContextNew";
// import { AuthContextProvider } from "./src/store/AuthContext";
import AuthPage from "./src/pages/AuthPage";
import { NavigationContainer } from "@react-navigation/native";
import { MyTabs } from "./src/components/NavBar";

const image = {
  uri: "https://www.setaswall.com/wp-content/uploads/2021/06/Gradient-Phone-Wallpaper-009.jpg",
};

export default function App() {
  const [authState, setAuthState] = useState({
    token: "",
    isLoggedIn: false,
  });

  return (
    // <ImageBackground source={image} style={styles.image}>
    <AuthContext.Provider value={[authState, setAuthState]}>
      <NavigationContainer options={{ headerShown: false }}>
        <View style={styles.container}>
          {authState.isLoggedIn ? <MyTabs /> : <AuthPage></AuthPage>}
        </View>
      </NavigationContainer>
    </AuthContext.Provider>
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C7F5E8",
    fontFamily: "AppleSDGothicNeo-SemiBold",

  },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
