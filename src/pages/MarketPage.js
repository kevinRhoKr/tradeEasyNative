import React, { useState } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import TinderSwipe from "../components/TinderSwipe";
import { AntDesign } from "@expo/vector-icons";

export function MarketPage() {

  const iconName = "plussquare";
  const [isPressed, setIsPressed] = useState(false);

  const pressed = () => {
    setIsPressed(!isPressed);
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <AntDesign name={iconName} size={50} color={ isPressed ? "#62CA62" : "green"} onPress={pressed} style= {styles.button}/>
      <TinderSwipe></TinderSwipe>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    alignItems: "center",
    position: "absolute",
    bottom: 60,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});