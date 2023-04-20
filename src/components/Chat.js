import React from "react";
import { Text, View, Button } from "react-native";

export function Chat(props) {

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Chats!</Text>
      <Button onPress={() => {
        props.navigation.navigate('ChatList');
      }} title="Go Back"></Button>
    </View>
  );
}