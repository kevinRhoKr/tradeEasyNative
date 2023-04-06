import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Alert, TextInput } from 'react-native';

const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const logIn = async () => {
        console.log("here");
        const resp = await fetch("http://127.0.0.1:5000/auth/login", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        });
        const data = await resp.json();
        Alert.alert(data);
        console.log(data);
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