import React from "react";
import { Text, View, Image } from "react-native";

export function ChatPage() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Chats!</Text>
      <Image
        style={{ width: "100%", height: "50%" }}
        source={{
          uri: "https://tradeeasy.s3.amazonaws.com/1681361960542-C446006A-553C-45E6-8918-ECA68B8EF62D.jpg",
        }}
      ></Image>
    </View>
  );
}
