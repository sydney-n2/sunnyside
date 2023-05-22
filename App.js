//import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Checkbox from 'expo-checkbox';
import * as React from 'react'; //wtf does this do if i have to import useState below??? 
import {useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, SafeAreaView, TouchableWithoutFeedback, TouchableHighlight, Pressable} from 'react-native';

const Stack = createNativeStackNavigator();

function LoginScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 4, justifyContent: 'center', alignItems:'center'}}>
      <Image
      source={require('./assets/sunnyside-logo.png')} 
        //network images require dimensions bc it doesn't know, for assets use require and it knows the metadata
      /> 
      </View>
      <View style={{flex: 1, gap: 10}}>
        <TextInput style={styles.input} placeholder="Username or Email"/>
        <TextInput style={styles.input} placeholder="Password" secureTextEntry={true}/> 
      </View>
    {/* <Button style={styles.button} title='Login' onPress={()=>navigation.navigate('Home')}></Button>
    buttons have very limited styling, do not use  */}
    <View style={{flex: 1, gap: 10}}>
    <Pressable style={styles.button} onPress={()=>navigation.navigate('Home')}>
      <Text>Login</Text> 
    </Pressable>
    <Text style={{alignSelf: 'center'}}>New user? <Text style={{textDecorationLine: 'underline'}} onPress={()=>navigation.navigate('Register')}>Register here!</Text>
    </Text> 
    </View> 
  </SafeAreaView>
  )
}

function RegisterScreen({navigation}) {
  const [isChecked, setChecked] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={require('./assets/sunnyside-logo.png')}/>
      </View>
      <View style={{flex: 3, gap: 5}}>
        <TextInput style={styles.input} placeholder="First Name"/> 
        <TextInput style={styles.input} placeholder="Last Name"/>
        <TextInput style={styles.input} placeholder="Birthday"/>
        <TextInput style={styles.input} placeholder="Phone Number"/>
        <TextInput style={styles.input} placeholder="Email"/>
        <TextInput style={styles.input} placeholder="Parent Email"/>
        <TextInput style={styles.input} placeholder="Password" secureTextEntry={true}/>
        <Checkbox value={isChecked} onValueChange={setChecked} /> 
        <Text>By registering, you agree to Sunnyside's {'\n'}Terms of Service and Privacy Policy.</Text>
      </View>
      <View style={{flex: 1}}>
        <Pressable style={styles.button} onPress={()=>navigation.navigate('Onboarding')}>
          <Text>Next</Text> 
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

function OnboardingScreen({navigation}) {
  const [isChecked, setChecked] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <Text> Please take a moment to view our community guidelines: </Text>
      <Image source={require('./assets/video-placeholder.png')} style={{alignSelf: 'center'}}/>
      <Checkbox value={isChecked} onValueChange={setChecked} /> 
      <Text>I agree to follow Sunnyside's community guidelines</Text>
      <Pressable style={styles.button} onPress={()=>navigation.navigate('CreateProfile')}>
        <Text>Register</Text> 
      </Pressable>
    </SafeAreaView>
  )
}

function CreateProfileScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <Image source={require('./assets/create-profile-sun.png')}/>
      </View>
      <View style={[styles.container, {flex: 4, borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: '#F9C980'}]}>
      {/* how to make this fill the edges of the screen
      if put outside it says can only have 1 parent element */}
        <Image source={require('./assets/image-placeholder.png')} style={{alignSelf: 'center'}}/>
        <TextInput style={styles.input} placeholder="Display Name"/> 
        <TextInput style={styles.input} placeholder="Pronouns"/>
        <TextInput style={styles.input} placeholder="Location"/>
        <TextInput style={styles.input} placeholder="Condition(s)"/>
        <TextInput style={styles.input} placeholder="Hospital Name"/>
        <TextInput style={styles.input} placeholder="Interests/Hobbies"/>
        <Pressable style={styles.buttonAlt} onPress={()=>navigation.navigate('Home')}>
        <Text style={{fontWeight: 'bold'}}>Get Started!</Text> 
      </Pressable>
      </View>
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
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'fade'}}> 
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen}/> 
      <Stack.Screen name="Register" component={RegisterScreen}/>
      <Stack.Screen name="Onboarding" component={OnboardingScreen}/> 
      <Stack.Screen name="CreateProfile" component={CreateProfileScreen}/> 

{/* extra: can do animations for specific screens*/}
    </Stack.Navigator>
    </NavigationContainer> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9C1',
    alignItems: 'stretch',
    justifyContent: 'center',
    gap: 10,
    padding: 20
  },

  button: { //view style props
    //shadows need a workaround/install something apparently (or include code for both android and ios)
    backgroundColor: '#F9C980',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginHorizontal: 25
  },

  input: { 
    backgroundColor: '#FFFFFF',
    padding: 5,
    borderRadius: 10,
    textAlign: 'center',
    borderColor: '#F9C980',
    borderWidth: 1
  },

  buttonAlt: {
    backgroundColor: '#D1FFC6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginHorizontal: 50
  }
});
