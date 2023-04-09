import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import Auth from "./src/components/Auth";
// import AuthContext from "./src/store/AuthContext";
import { AuthContext } from "./src/store/AuthContextNew";
// import { AuthContextProvider } from "./src/store/AuthContext";
import AuthPage from "./src/pages/AuthPage";
import HomePage from "./src/pages/HomePage";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons"

const image = {
  uri: "https://www.setaswall.com/wp-content/uploads/2021/06/Gradient-Phone-Wallpaper-009.jpg",
};

function MarketScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Market!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

function ChatsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Chats!</Text>
    </View>
  )
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Market") {
            iconName = focused
              ? "appstore1"
              : "appstore-o";

              return <AntDesign name={iconName} size={size} color={color} />;

          } else if (route.name === "Settings") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          } else if (route.name === "Chats") {
            iconName = focused ? "chatbox-ellipses-sharp" : "chatbox-ellipses-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Market" component={MarketScreen} />
      <Tab.Screen name="Chats" component={ChatsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  // const authCtx = useContext(AuthContext);
  /*
 token: "",
        isLoggedIn: false
  */
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
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
