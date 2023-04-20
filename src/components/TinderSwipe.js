import React, { useState, useEffect, useContext } from "react";
import {Pressable, Text, View, StyleSheet, Image, Modal} from "react-native";
import TinderCard from "react-tinder-card";
import { AuthContext } from "../store/AuthContextNew";


const TinderSwipe = (props) => {
  const [lastDirection, setLastDirection] = useState();
  const [authState, setAuthState] = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [item_idx, setItem_idx] = useState(0);
  const [visible, setVisible] = useState(false);
  const [fName, setFName] = useState("N/A");
  const [lName, setLName] = useState("N/A");
  // const [refresh, setRefresh] = useState(false);

  console.log("index: ", item_idx);

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
    setItem_idx(item_formatted.length - 1);
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
          item_id: id,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("Success: ", responseJson);
          //end of email
        })
        .catch((error) => {
          //display error message
          console.log("ERRORRRRRRRR");
          console.warn(error);
        });
    }
    setLastDirection(direction);
    setItem_idx((prevState) => prevState - 1);
  };

  const handleReportItem = async (item_id) => {
    console.log("im inside reporter");
    console.log("here", item_id, item_idx);
    //this will be reported item_id
    fetch("https://trade-easy.herokuapp.com/api/v1/reportItem", {
      method: "PUT",
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
        alert("Item reported successfully!");
      })
      .catch((error) => {
        //display error message
        console.log("Report item error");
        console.warn(error);
      });
  };

  const viewProfile = () => {
    console.log(items[item_idx].user);
    fetch("https://trade-easy.herokuapp.com/api/v1/profile", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`,
      },
      body: JSON.stringify({
        email: items[item_idx].user,
      }),
    })
      .then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
        //Success
        setFName(responseJson.firstName);
        setLName(responseJson.lastName);
        console.log(responseJson);
      })
      //If response is not in json then in error
      .catch((error) => {
        //Error
        alert(JSON.stringify(error));
        console.error(error);
      });

    setVisible(true);

  };


  return (

      <View style={styles.container}>
      <View style={styles.cardContainer}>
        {items.map((item) => (
          <TinderCard
            preventSwipe={["up", "down"]} //so can only move left/right
            key={item.item_id}
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
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#ED5F5F" : "#FF0000",
          },
          styles.button,
        ]}
        onPress={() => handleReportItem(items[item_idx].item_id)}
      >
        <Text style={styles.text}>Report Item</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#73BFF3" : "#2FA5F6",
          },
          styles.profileButton,
        ]}
        onPress={viewProfile}
      >
        <Text style={styles.text}>View profile</Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={() => {
          setVisible((prev) => !prev);
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.cardTitle}>Profile</Text>
          <Text style={styles.cardDesc}>
            Name: {fName} {lName}
          </Text>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#ED5F5F" : "#FF0000",
              }, styles.closeProfilebButton
            ]}
            onPress={() => setVisible((prev) => !prev)}
          >
            <Text style={styles.text}>Close</Text>
          </Pressable>
        </View>
      </Modal>
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
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontWeight: "bold",
    fontSize: 20,
    fontFamily: "AppleSDGothicNeo-SemiBold",
  },
  cardDesc: {
    color: "black",
    paddingHorizontal: 10,
    paddingTop: 0,
    paddingVertical: 0,
    fontFamily: "AppleSDGothicNeo-SemiBold",
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
  profileButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    alignItems: "center",
    marginVertical: 10,
    position: "absolute",
    bottom: -200,
    right: 15,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    alignItems: "center",
    marginVertical: 10,
    position: "absolute",
    bottom: -200,
    left: 15,
  },
  closeProfilebButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    alignItems: "center",
    marginVertical: 10,
  },
});

export default TinderSwipe;
