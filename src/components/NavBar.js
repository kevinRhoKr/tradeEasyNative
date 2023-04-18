import React, { useState, useEffect, useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { ChatPage } from "../pages/ChatPage";
import { MarketPage } from "../pages/MarketPage";
import { SettingPage } from "../pages/SettingPage";
import { ReportPage } from "../pages/ReportPage";
import { AuthContext } from "../store/AuthContextNew";

const Tab = createBottomTabNavigator();

export function MyTabs() {
  const [authState, setAuthState] = useContext(AuthContext);
  const [isSuper, setIsSuper] = useState(false);

  useEffect(() => {
    fetch("https://trade-easy.herokuapp.com/admin/isAdmin", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsSuper(data.status);
      })
      .catch((error) => {
        //display error message
        console.warn(error);
      });
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Market"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Market") {
            iconName = focused ? "appstore1" : "appstore-o";

            return <AntDesign name={iconName} size={size} color={color} />;
          } else if (route.name == "Reports") {
            iconName = focused ? "folderopen" : "folder1";
            return <AntDesign name={iconName} size={size} color={color} />;
          } else if (route.name === "Settings") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          } else if (route.name === "Chats") {
            iconName = focused
              ? "chatbox-ellipses-sharp"
              : "chatbox-ellipses-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Settings" component={SettingPage} />
      <Tab.Screen name="Market" component={MarketPage} />
      <Tab.Screen name="Chats" component={ChatPage} />
      {isSuper && <Tab.Screen name="Reports" component={ReportPage} />}
    </Tab.Navigator>
  );
}
