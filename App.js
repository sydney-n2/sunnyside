//import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, SafeAreaView, TouchableWithoutFeedback, TouchableHighlight, Pressable} from 'react-native';

const Stack = createNativeStackNavigator();

function LoginScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
    <Image
      source={require('./assets/sunnyside-logo.png')} 
      //style={{width: 300, height: 200}}
        //network images require dimensions bc it doesn't know, for assets use require and it knows the metadata
    />
    <TextInput style={styles.input} placeholder="Username or Email"/>
    <TextInput style={styles.input} placeholder="Password" secureTextEntry={true}/>
    {/* <Button style={styles.button} title='Login' onPress={()=>navigation.navigate('Home')}></Button>
    buttons have very limited styling, do not use  */}
    <Pressable style={styles.button} onPress={()=>navigation.navigate('Home')}>
      <Text>Login</Text> 
    </Pressable>
    <Text style={styles.text}>Don't have an account? <Text style={{textDecorationLine: 'underline'}} onPress={()=>navigation.navigate('Register')}>Register here!</Text>
    </Text>
  </SafeAreaView>
  )
}

function RegisterScreen() {
  return (
    <SafeAreaView style={styles.container}>
          <Image source={require('./assets/sunnyside-logo.png')}    />

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
{/* need to make the navigator bar thing disappear later */}
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
    gap: 10
  },
  
  text: {
    flexDirection: 'row', //this is supposed to go on the container not the text i think
  },

  image: {
    marginBottom: 40
  },

  button: {
    backgroundColor: '#F9C980',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },

  input: {
    backgroundColor: '#FFFFFF',
    padding: 5
  }
});
