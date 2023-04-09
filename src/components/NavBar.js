import React from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons"
import { ChatPage } from "../pages/ChatPage";
import { MarketPage } from "../pages/MarketPage";
import { SettingPage } from "../pages/SettingPage";

  
  const Tab = createBottomTabNavigator();
  
  export function MyTabs() {
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
          tabBarActiveTintColor: "green",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Settings" component={SettingPage} />
        <Tab.Screen name="Market" component={MarketPage} />
        <Tab.Screen name="Chats" component={ChatPage} />
      </Tab.Navigator>
    );
  }