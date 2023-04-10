import React from "react";
import { Text, View, Pressable, StyleSheet, ScrollView } from "react-native";

export function SettingPage() {
  return (
    <ScrollView style={{ flex: 1, padding: 50 }}>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#ED5F5F" : "#FF0000",
          },
          styles.button,
        ]}
      >
        <Text style={styles.text}>Log out</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
