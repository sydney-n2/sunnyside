//import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, SafeAreaView, TouchableWithoutFeedback, TouchableHighlight, Button, Pressable } from 'react-native';

const Stack = createNativeStackNavigator();

function LoginScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
    <Text>Sunnyside</Text>
    <Image
      source={require('./assets/sunnyside-logo.png')} 
      //style={{width: 300, height: 200}}
        //network images require dimensions bc it doesn't know, for assets use require and it knows the metadata
    />

    <Button title='Login' onPress={()=>navigation.navigate('Home')}></Button>
    <Text style={styles.text}>Don't have an account? <Text style={{textDecorationLine: 'underline'}} onPress={()=>navigation.navigate('Register')}>Register here!</Text>
    </Text>
  </SafeAreaView>
  )
}

function RegisterScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text> Email</Text>
    </SafeAreaView>
  )
}

function HomeScreen() {
  return(
    <SafeAreaView style={styles.container}>
      <Text>Posts</Text>
    </SafeAreaView>
  )
}

export default function App() {
  return (
    <NavigationContainer> 
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen}/>
      <Stack.Screen name="Home" component={HomeScreen}/> 

    </Stack.Navigator>
    </NavigationContainer> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAECA6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  text: {
    flexDirection: 'row', //this is supposed to go on the container not the text i think
  },

  image: {
    marginBottom: 40
  }
});
