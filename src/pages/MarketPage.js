import React, { useState, useContext } from "react";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Platform,
  Image,
  Button,
  Modal,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import TinderSwipe from "../components/TinderSwipe";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { S3 } from "aws-sdk/dist/aws-sdk-react-native";
import * as config from "../../keys.json";
import { AuthContext } from "../store/AuthContextNew";

const accessKeyId = config.accessKeyId;
const secretAccessKey = config.secretAccessKey;
const region = config.region;

const s3 = new S3({
  accessKeyId,
  secretAccessKey,
  region,
});

export function MarketPage() {
  const iconName = "plussquare";
  const [isPressed, setIsPressed] = useState(false);
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [authState, setAuthState] = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);

  const pressed = () => {
    setIsPressed(!isPressed);
    setModalVisible(true);
  };

  const exit = () => {
    setIsPressed(!isPressed);
    setModalVisible(false);
    setName("");
    setDesc("");
    setImage(null);
  };

  const uploadFileToS3 = async (fileUri) => {
    const fileExtension = fileUri.split(".").pop();

    const fileName = `${new Date().getTime()}.${fileExtension}`;

    Platform.OS === "ios" ? fileUri.replace("file://", "") : fileUri;

    let link = "";

    try {
      const res = await fetch(fileUri);
      const blob = await res.blob();

      const params = {
        Bucket: config.bucket,
        Key: fileName,
        Body: blob,
      };

      const response = await s3.upload(params).promise();
      console.log("File uploaded successfully:", response.Location);
      link = response.Location;
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    console.log("Now sending data to our flask backend...");

    fetch("https://trade-easy.herokuapp.com/api/v1/newPost", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authState.token}`,
      },

      body: JSON.stringify({
        name: name,
        description: desc,
        image: link,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        Alert.alert("Item successfully uploaded!");
        setModalVisible(!modalVisible);
      })
      .catch((error) => {
        //display error message
        console.log("ERRORRRRRRRR");
        console.warn(error);
      });

    setName("");
    setDesc("");
    setImage(null);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      //console.log(result.assets[0].uri.split('/').pop(), Date.now())
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <AntDesign
        name={iconName}
        size={50}
        color={isPressed ? "#62CA62" : "green"}
        onPress={pressed}
        style={styles.button2}
      />
      <AntDesign
        name={"download"}
        size={50}
        color={isPressed ? "#62CA62" : "green"}
        onPress={() => {
          setRefresh(!refresh);
        }}
        style={styles.refresh}
      />
      <TinderSwipe refresh={refresh}></TinderSwipe>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss();
              }}
            >
              <View style={styles.modalView}>
                <View
                  style={{
                    alignItems: "stretch",
                  }}
                >
                  <Text style={styles.title}>
                    Upload new item to the market
                  </Text>
                  <Pressable
                    style={({ pressed }) => [
                      {
                        backgroundColor: pressed ? "#73BFF3" : "#2FA5F6",
                      },
                      styles.imageUpload,
                    ]}
                    onPress={pickImage}
                  >
                    <Text style={styles.text}>Attach an image</Text>
                  </Pressable>
                  {image && (
                    <Image
                      source={{ uri: image }}
                      style={{ width: 200, height: 200, alignSelf: "center" }}
                    />
                  )}
                  <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor="#a9a9a9"
                    onChangeText={setName}
                    value={name}
                  ></TextInput>
                  <TextInput
                    editable
                    multiline
                    numberOfLines={5}
                    style={styles.input}
                    placeholder="Description"
                    placeholderTextColor="#a9a9a9"
                    onChangeText={setDesc}
                    value={desc}
                  ></TextInput>
                </View>

                <Pressable
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#75EA98" : "#24E05D",
                    },
                    styles.button,
                  ]}
                  onPress={() => uploadFileToS3(image)}
                >
                  <Text style={styles.textStyle}>Upload new item</Text>
                </Pressable>
                <Pressable
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? "#EA7070" : "#E21F1F",
                    },
                    styles.button,
                  ]}
                  onPress={exit}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  button2: {
    paddingVertical: 40,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    margin: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontFamily: "AppleSDGothicNeo-SemiBold",
  },
  title: {
    fontFamily: "AppleSDGothicNeo-SemiBold",
    fontWeight: "bold",
    color: "black",
    fontSize: 20,
  },
  refresh: {
    paddingVertical: 50,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  imageUpload: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    alignItems: "center",
    marginVertical: 10,
  },
});
