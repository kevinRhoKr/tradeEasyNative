import React, { useState, useEffect, useContext } from "react";
import { ImageBackground, Text, View, StyleSheet, Image } from "react-native";
import TinderCard from "react-tinder-card";
import { AuthContext } from "../store/AuthContextNew";

const TinderSwipe = (props) => {
  const [lastDirection, setLastDirection] = useState();
  const [authState, setAuthState] = useContext(AuthContext);
  const [items, setItems] = useState([]);
  // const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    //GET request
    fetch("https://trade-easy.herokuapp.com/api/v1/getItems", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`,
      },
      //Request Type
    })
      .then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
        //Success
        console.log(responseJson);

        getItems(responseJson.items);
      })
      //If response is not in json then in error
      .catch((error) => {
        //Error
        alert(JSON.stringify(error));
        console.error(error);
      });
  }, [props.refresh]);

  const getItems = (items) => {
    let item_formatted = [];
    for (let i = 0; i < items.length; i++) {
      const desc = items[i].description;
      const name = items[i].name;
      const image_uri = items[i].image;
      const id = items[i].item_id;
      const user = items[i].email;

      item_formatted.push({
        name: name,
        description: desc,
        url: { uri: image_uri },
        item_id: id,
        user: user,
      });
    }
    setItems(item_formatted);
  };

  const swiped = (direction, id) => {
    // console.log("removing: " + nameToDelete);
    console.log(direction, id);
    if (direction == "right") {
      fetch("https://trade-easy.herokuapp.com/api/v1/like", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },

        body: JSON.stringify({
         item_id: id
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("Success: ", responseJson);
        })
        .catch((error) => {
          //display error message
          console.log("ERRORRRRRRRR");
          console.warn(error);
        });
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {items.map((item) => (
          <TinderCard
            key={item.name}
            onSwipe={(dir) => swiped(dir, item.item_id)}
            // onCardLeftScreen={() => outOfFrame(item.name)}
          >
            <View style={styles.card}>
              <Image style={styles.image} source={item.url}></Image>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardDesc}>{item.description}</Text>
            </View>
          </TinderCard>
        ))}
      </View>
      {/* {lastDirection ? (
        <Text style={styles.infoText}>You swiped {lastDirection}</Text>
      ) : (
        <Text style={styles.infoText} />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  header: {
    color: "#000",
    fontSize: 30,
    marginBottom: 30,
  },
  cardContainer: {
    width: "90%",
    maxWidth: 260,
    height: 300,
  },
  card: {
    position: "absolute",
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: 260,
    height: 400,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 20,
    borderRadius: 20,
    resizeMode: "cover",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 20,
    alignItems: "center",
  },
  cardTitle: {
    color: "black",
    padding: 10,
    fontWeight: "bold",
  },
  cardDesc: {
    color: "black",
    padding: 10,
  },
  infoText: {
    height: 28,
    justifyContent: "center",
    display: "flex",
    zIndex: -100,
  },
  image: {
    width: "100%",
    height: "70%",
    overflow: "hidden",
    borderRadius: 20,
    alignItems: "center",
  },
});

export default TinderSwipe;
