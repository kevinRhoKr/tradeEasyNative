import React, { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { AuthContext } from "../store/AuthContextNew";
import { AntDesign } from "@expo/vector-icons";

export function ChatPage(props) {
  const [reload, setReload] = useState(false);
  const [authState, setAuthState] = useContext(AuthContext);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetch("https://trade-easy.herokuapp.com/api/v1/chats", {
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
        setChats(data.chats);
      })
      .catch((error) => {
        //display error message
        console.log("Chats loading error");
        console.warn(error);
      });
  }, [reload]);

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center" }}>
        {chats.length == 0 && <Text>No matches</Text>}
        {chats.map((chat) => (
          <View key={chat.chat_id} style={styles.container}>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#E0FDD7" : "#B1FA9A",
                },
                styles.card,
              ]}
              onPress={() => {
                props.navigation.navigate("Chat");
              }}
            >
              <Text style={styles.nameText}>
                {chat.name.f_name} {chat.name.l_name}
              </Text>
              <AntDesign
                name="right"
                size={50}
                color="#AAAAAA"
                // onPress={pressed}
                style={styles.slider}
              />
            </Pressable>
          </View>
        ))}

        <AntDesign
          name={"download"}
          size={50}
          color="green"
          onPress={() => {
            setReload((prev) => !prev);
          }}
          style={styles.refresh}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    alignSelf: "center",
    padding: 20,
    fontWeight: "bold",
    fontSize: 30,
  },
  card: {
    // backgroundColor: "rgba(239, 253, 238, 0.8)",
    height: 80,
    width: "90%",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  nameText: {
    fontWeight: "bold",
    fontSize: 30,
    padding: 10,
    marginLeft: 20,
  },

  slider: {
    position: "absolute",
    top: 12,
    right: 30,
  },

  refresh: {
    paddingVertical: 50,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
});
