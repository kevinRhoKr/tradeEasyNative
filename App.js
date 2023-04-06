import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import Auth from './src/components/Auth';

const MyButton = () => {
  return (
    <View>
      <Button title="Press me" onPress={() => Alert.alert("Button pressed!")} />
    </View>
  ) 
}

const TextField = () => {

  const [text, onChangeText] = React.useState("")

  return (
    <TextInput 
    onChangeText={onChangeText} 
    value={text} 
    placeholder="Username or Email"/>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <TextField></TextField>
      <MyButton></MyButton> */}
      <Auth></Auth>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
