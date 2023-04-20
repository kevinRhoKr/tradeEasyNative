import { StatusBar } from "expo-status-bar";
import React, { useContext, useState, useEffect } from "react";
// import { useFonts, Jost_500Medium } from "@expo-google-fonts/jost";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Button,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
// import AuthContext from '../store/AuthContext';
import { AuthContext } from "../store/AuthContextNew";
// import AppLoading from "expo-app-loading";
// import GetLocation from 'react-native-get-location'
import * as Location from "expo-location";


const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [proximity, setProximity] = useState("");
  const [authState, setAuthState] = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [doneSignUp, setDoneSignUp] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [isLoadingVisible, setIsLoadingVisible] = useState(false);

  console.log(longitude);
  console.log(latitude);

  const loadingScreen = () => {
    setIsLoadingVisible(true);

    setTimeout(() => {
        setIsLoadingVisible(false);
    }, 10000);
  };

  useEffect(() => {
    if (firstRender) {
      loadingScreen();

      setFirstRender(false);
      console.log(firstRender);
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
        // console.log(location.coords.longitude);
        // console.log(location.coords.latitude);
      })();
    }
  }, [firstRender]);

  //   let [fontsLoaded] = useFonts({ Jost_500Medium });

  // const getDataUsingGet = () => {
  //     //GET request
  //     fetch('https://trade-easy.herokuapp.com/api/v1/hello', {
  //       method: 'GET',
  //       //Request Type
  //     })
  //       .then((response) => response.json())
  //       //If response is in json then in success
  //       .then((responseJson) => {
  //         //Success
  //         alert(JSON.stringify(responseJson));
  //         console.log(responseJson);
  //       })
  //       //If response is not in json then in error
  //       .catch((error) => {
  //         //Error
  //         alert(JSON.stringify(error));
  //         console.error(error);
  //       });
  //   };

  const changeModeHandler = () => {
    setSignUp(!signUp);
    setError(false);
    setDoneSignUp(false);
    setEmail("");
    setPassword("");
    setFName("");
    setLName("");
    setProximity("");
  };

  const signUpFunc = () => {

    const register_details =  {
      email: email,
      password: password,
      fname: fName,
      lname: lName,
      latitude: latitude,
      longitude: longitude,
      proximity: proximity,
    }

    console.log(register_details);


    fetch("https://trade-easy.herokuapp.com/auth/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        register_details: {
          email: email,
          password: password,
          fname: fName,
          lname: lName,
          latitude: latitude,
          longitude: longitude,
          proximity: proximity,
        },
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Showing response message coming from server

        if (typeof responseJson.email !== "undefined") {
          // console.log("we got the token");
          // authCtx.login(responseJson.access_token);
          // console.log("authCtx.isLoggedIn:", authCtx.isLoggedIn);
          setDoneSignUp(!doneSignUp);
          Alert.alert(
            "Successful signup! Please log in using your credentials!"
          );
          changeModeHandler();
        } else {
          Alert.alert("Already existing email. Please try again. ");
          setEmail("");
          setPassword("");
          setFName("");
          setLName("");
          setLatitude("");
          setLongitude("");
          setProximity("");
        }

      })
      .catch((error) => {
        //display error message
        console.log("ERRORRRRRRRR");
        console.warn(error);
      });
  };

  const logIn = () => {
    console.log(email);
    console.log(password);
    setError(false);
    fetch("https://trade-easy.herokuapp.com/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        inputObj: {
          email: email,
          password: password,
        },
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Showing response message coming from server

        if (typeof responseJson.access_token !== "undefined") {
          // console.log("we got the token");
          // authCtx.login(responseJson.access_token);
          // console.log("authCtx.isLoggedIn:", authCtx.isLoggedIn);
          setAuthState({
            token: responseJson.access_token,
            isLoggedIn: true,
          });
          setError(false);
        } else {
          setError(true);
        }

      })
      .catch((error) => {
        //display error message
        console.log("ERRORRRRRRRR");
        console.warn(error);
      });
  };

  //   if (!fontsLoaded) {
  //     return <AppLoading></AppLoading>;
  //   } else {
  return (
    <ScrollView
      style={styles.auth}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
      {isLoadingVisible && <Text style={styles.load}>Loading.... {"\n"}Please wait until it loads..</Text>}
      {!isLoadingVisible && (
        <View>
          {error && <Text style={styles.text2}>TradeEasy</Text>}
          {!error && signUp && <Text style={styles.text3}>TradeEasy</Text>}
          {!error && !signUp && <Text style={styles.text}>TradeEasy</Text>}

          {/* <Text style={!error ? styles.text : !signUp ? styles.text3 : styles.text2}>TradeEasy</Text> */}
          {error && (
            <Text style={styles.error}>
              Wrong credential. Please try loggin in again.
            </Text>
          )}
          {doneSignUp && (
            <Text style={styles.successMsg}>
              {"\n"}
              Successfully signed up! {"\n"}
              Please log in using your credentials
            </Text>
          )}
          <View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#a9a9a9"
              onChangeText={setEmail}
              value={email}
            ></TextInput>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#a9a9a9"
              onChangeText={setPassword}
              value={password}
              secureTextEntry={true}
            ></TextInput>
          </View>

          {signUp && (
            <View>
              <TextInput
                style={styles.input}
                placeholder="First Name"
                placeholderTextColor="#a9a9a9"
                onChangeText={setFName}
                value={fName}
              ></TextInput>

              <TextInput
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor="#a9a9a9"
                onChangeText={setLName}
                value={lName}
              ></TextInput>

              <TextInput
                style={styles.input}
                placeholder="Proximity"
                placeholderTextColor="#a9a9a9"
                onChangeText={setProximity}
                value={proximity}
              ></TextInput>
            </View>
          )}

          {!signUp ? (
            <View>
              <Button
                title="Login"
                onPress={logIn}
                style={{ textStyle: "AppleSDGothicNeo-SemiBold" }}
              ></Button>
              <Button
                title="Don't have an account? Sign up today!"
                style={{ textStyle: "AppleSDGothicNeo-SemiBold" }}
                onPress={changeModeHandler}
              ></Button>
            </View>
          ) : (
            <View>
              <Button
                title="Sign up"
                onPress={signUpFunc}
                style={{ textStyle: "AppleSDGothicNeo-SemiBold" }}
              ></Button>
              <Button
                title="Go back to log in"
                onPress={changeModeHandler}
              ></Button>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );

  //}
};

const styles = StyleSheet.create({
  auth: {
    width: "100%",
    height: "100%",
    margin: "auto",
  },

  error: {
    textAlign: "center",
    color: "#D0312D",
    padding: 10,
    margin: 10,
  },

  text: {
    textAlign: "center",
    position: "absolute",
    top: -100,
    left: 85,
    padding: 20,
    fontSize: 40,
    fontFamily: "AppleSDGothicNeo-SemiBold",
  },

  text2: {
    textAlign: "center",
    position: "absolute",
    top: 240,
    left: 85,
    padding: 20,
    fontSize: 40,
    fontFamily: "AppleSDGothicNeo-SemiBold",
  },

  input: {
    alignSelf: "center",
    borderColor: "gray",
    width: "60%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    fontFamily: "AppleSDGothicNeo-SemiBold",
  },

  text3: {
    textAlign: "center",
    position: "absolute",
    top: -80,
    left: 85,
    padding: 20,
    fontSize: 40,
    fontFamily: "AppleSDGothicNeo-SemiBold",
  },

  successMsg: {
    textAlign: "center",
    color: "#228B22",
    padding: 10,
    margin: 10,
    fontFamily: "AppleSDGothicNeo-SemiBold",
  },

  load: {
    textAlign: "center",
    fontFamily: "AppleSDGothicNeo-SemiBold",
    fontSize: 20
  }
});

export default Auth;
