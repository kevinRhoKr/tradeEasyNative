import React, { useContext, useEffect, useState } from "react";
import { Text, View, Pressable, StyleSheet, ScrollView } from "react-native";
import Slider from "@react-native-community/slider";
import { AuthContext } from "../store/AuthContextNew";

export function SettingPage() {
  const [authState, setAuthState] = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [proximity, setProximity] = useState(5);
  const [fname, setName] = useState("");
  const [curProximity, setCurProximity] = useState("");


  useEffect(() => {
    fetch("https://trade-easy.herokuapp.com/api/v1/getuserdetails", {
        method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // logout successful
        setName(data.f_name);
        setCurProximity(data.proximity);
        setProximity(data.proximity);
      })
      .catch((error) => {
        console.log("Get user details error");
      });
  }, []);
  const handleLogout = async () => {
    fetch("https://trade-easy.herokuapp.com/auth/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.msg); // logout successful
        setAuthState({
          token: null,
          isLoggedIn: false,
        });
      })
      .catch((error) => {
        //display error message
        console.log("Logout error");
        console.warn(error);
      });
  };

  const handleReportUser = async () => {
    //this will be reported user email
    const email = "heroku@gmail.com";
    fetch("https://trade-easy.herokuapp.com/api/v1/reportUser", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`,
      },
      body: JSON.stringify({ email: email }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("User reported successfully!");
      })
      .catch((error) => {
        //display error message
        console.log("Report user error");
        console.warn(error);
      });
  };

  const handleProximityChange = (value) => {
    setProximity(value);
  };

  const handleApplyChanges = async () => {
    fetch("https://trade-easy.herokuapp.com/api/v1/changeProximity", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`,
      },
      body: JSON.stringify({ proximity: proximity }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Proximity sucessfully changed to " + proximity + " miles");
        setCurProximity(proximity);
      })
      .catch((error) => {
        //display error message
        console.log("Change proximity error");
        console.warn(error);
      });
  };


  return (
    <ScrollView style={{ flex: 1, padding: 50 }}>
      {/*  need api call to get name and current proximity*/}
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Hello {fname}
      </Text>

      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#00FFFF" : "#008080",
          },
          styles.button,
        ]}
        onPress={handleReportUser}
      >
        <Text style={styles.text}>Report User</Text>
      </Pressable>

      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 16 }}>Location Proximity</Text>
        <Text>Current Proximity: {curProximity} miles</Text>

        <Slider
          minimumValue={1}
          maximumValue={15}
          step={1}
          value={curProximity}
          onValueChange={handleProximityChange}
        />
        <Text>{proximity} miles</Text>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#00FFFF" : "#008080",
            },
            styles.button,
          ]}
          onPress={handleApplyChanges}
        >
          <Text style={styles.text}>Change Proximity</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#ED5F5F" : "#FF0000",
            },
            styles.button,
          ]}
          onPress={handleLogout}
        >
          <Text style={styles.text}>Log out</Text>
        </Pressable>
      </View>
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
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
