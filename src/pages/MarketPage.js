import React, { useState } from "react";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Platform,
  Image,
  Button,
  Modal,
} from "react-native";
import TinderSwipe from "../components/TinderSwipe";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
// import { S3 } from "aws-sdk";
// import RNFetchBlob from "rn-fetch-blob";
// import { v4 as uuidv4 } from "uuid";
// import * as config from "../../keys.json";

// const s3options = {
//   bucket: config.bucket,
//   region: config.region,
//   accessKey: config.accessKeyId,
//   secretKey: config.secretAccessKey,
//   successActionStatus: config.successActionStatus,
// };

export function MarketPage() {
  const iconName = "plussquare";
  const [isPressed, setIsPressed] = useState(false);
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  console.log("image uri:", image);

  const pressed = () => {
    setIsPressed(!isPressed);
    setModalVisible(true);
  };

  const uploadFileToS3 = async (fileUri) => {
    // const uuid = uuidv4();
    // const fileType = fileUri.substr(fileUri.lastIndexOf(".") + 1);
    // const fileName = `${uuid}.${fileType}`;
    // const contentType = `image/${fileType}`;

    // const s3url = `https://${s3options.bucket}.s3.${s3options.region}.amazonaws.com/${fileName}`;

    // const file = await RNFetchBlob.fs.readFile(fileUri, "base64");
    // const data = `data:${contentType};base64,${file}`;

    // const response = await RNFetchBlob.config({
    //   trusty: true,
    //   timeout: 60000,
    //   appendExt: fileType,
    // }).fetch(
    //   "PUT",
    //   s3url,
    //   {
    //     "Content-Type": contentType,
    //     "x-amz-acl": "public-read",
    //     "x-amz-date": new Date().toISOString(),
    //     Authorization: `AWS ${s3options.accessKey}:${s3options.secretKey}`,
    //   },
    //   data
    // );

    // console.log(response);

    // return response;
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
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
            <View style={styles.modalView}>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Button
                  title="Pick an image from camera roll"
                  onPress={pickImage}
                />
                {image && (
                  <Image
                    source={{ uri: image }}
                    style={{ width: 200, height: 200 }}
                  />
                )}
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Exit</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => uploadFileToS3(image)}
              >
                <Text style={styles.textStyle}>Upload</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <AntDesign
          name={iconName}
          size={50}
          color={isPressed ? "#62CA62" : "green"}
          onPress={pressed}
          style={styles.button2}
        />
      </View>

      <TinderSwipe></TinderSwipe>
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
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
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
});
