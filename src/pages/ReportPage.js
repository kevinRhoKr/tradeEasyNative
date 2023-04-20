import React, { useEffect, useState, useContext } from "react";
import { Text, View, ScrollView, StyleSheet, Image, Pressable } from "react-native";
import { AuthContext } from "../store/AuthContextNew";
import { AntDesign } from "@expo/vector-icons";

export function ReportPage() {
  const [authState, setAuthState] = useContext(AuthContext);
  const [userReports, setUserReports] = useState([]);
  const [itemReports, setItemReports] = useState([]);
  const [reload, setReload] = useState(false);

  console.log("users: ", userReports);
  console.log("items: ", itemReports);

  useEffect(() => {
    fetch("https://trade-easy.herokuapp.com/admin/getReports", {
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
        setUserReports(data.reported_users);
        setItemReports(data.reported_items);
      })
      .catch((error) => {
        //display error message
        console.log("Report user error");
        console.warn(error);
      });
  }, [reload]);

  const removeUser = (userEmail) => {
    fetch("https://trade-easy.herokuapp.com/admin/removeUser", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`,
      },
      body: JSON.stringify({ email: userEmail }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("User deleted successfully!");
      })
      .catch((error) => {
        //display error message
        console.log("Delete user error");
        console.warn(error);
      });
  }

  const removeItem = (item_id) => {
    fetch("https://trade-easy.herokuapp.com/admin/removeItem", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`,
      },
      body: JSON.stringify({ item_id: item_id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Item deleted successfully!");
      })
      .catch((error) => {
        //display error message
        console.log("Delete item error");
        console.warn(error);
      });
  }

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center" }}>
      <AntDesign
        name={"download"}
        size={50}
        color="#62CA62"
        onPress={() => {
          setReload(prev => !prev);
        }}
        style={styles.refresh}
      />

        <Text style={styles.title}>Users</Text>
        {userReports.length == 0 && <Text style={styles.nameText}>None</Text>}
        {userReports.map((user) => (
          <View style={styles.card} key={user.email}>
            <Text style={styles.nameText}>
              {user.first_name} {user.last_name}
            </Text>
            <Text>{user.email}</Text>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#EA7070" : "#E21F1F",
                },
                
                styles.button,
              ]}
              onPress={() => removeUser(user.email)}
            >
              <Text style={styles.textStyle}>Remove user</Text>
            </Pressable>
          </View>
        ))}
        <Text style={styles.title}>Items</Text>
        {itemReports.length == 0 && <Text style={styles.nameText}>None</Text>}
        {itemReports.map((item) => (
          <View style={styles.itemCard} key={item.item_id}>
            <Text style={styles.nameText}>
              {item.name} (Item ID: {item.item_id})
            </Text>
            <Image
              source={{ uri: item.image }}
              style={{ width: 200, height: 200, alignSelf: "center" }}
            />
            <Text style={styles.desc}>Description: {item.description} </Text>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#EA7070" : "#E21F1F",
                },
                styles.button,
              ]}
              onPress={() => removeItem(item.item_id)}
            >
              <Text style={styles.textStyle}>Remove Item</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    alignSelf: "center",
    padding: 20,
    fontWeight: "bold",
    fontSize: 30,
  },
  card: {
    backgroundColor: "rgba(118, 255, 198, 0.8)",
    height: 130,
    width: "80%",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  itemCard: {
    backgroundColor: "rgba(118, 255, 198, 0.8)",
    height: 420,
    width: "80%",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  nameText: {
    fontWeight: "bold",
    fontSize: 15,
    paddingBottom: 20,
  },
  desc: {
    margin: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    margin: 10,
    elevation: 2,
    width: 150,
    alignItems: "center"
  },
  textStyle: {
    color: "white"
  },
  refresh: {
    paddingTop: 30
  }
});
