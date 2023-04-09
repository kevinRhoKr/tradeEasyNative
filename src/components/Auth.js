import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, Button, Alert, TextInput } from 'react-native';
// import AuthContext from '../store/AuthContext';
import { AuthContext } from '../store/AuthContextNew';

const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authState, setAuthState] = useContext(AuthContext);

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

    const logIn = () => {
        console.log(email);
        console.log(password);
        fetch('https://trade-easy.herokuapp.com/auth/login', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
    
            body: JSON.stringify({
                "inputObj": {
                    "email": email,
                    "password": password
                }
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
                    isLoggedIn: true
                })
              }
              console.warn(responseJson);
            })
            .catch((error) => {
            //display error message
            console.log("ERRORRRRRRRR");
             console.warn(error);
            });
      };

    return (
        <View style={styles.auth}>
            <Text style={styles.text}>
                TradeEasy
            </Text>
            <View>
                <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#a9a9a9"
                onChangeText={setEmail}
                value={email}
                >
                </TextInput>
                <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#a9a9a9"
                onChangeText={setPassword}
                value={password}
                >
                </TextInput>
            </View>
            <Button title="Login" onPress={logIn}></Button>
        </View>
    )
}

const styles = StyleSheet.create({

    auth: {
        width: "100%",
        height: "100%",
        margin: "auto",
        justifyContent: 'center',
        backgroundColor: '#D1D4E4',
    },

    text: {
        textAlign: "center",
        position: "absolute",
        top: 250,
        left: 85,
        padding: 20,
        fontSize: 40
    },

    input: {
        alignSelf: "center",
        borderColor: "gray",
        width: "60%",
        borderWidth: 1,
        borderRadius: 10, 
        padding:10,
        margin: 10,
    }
})


export default Auth;