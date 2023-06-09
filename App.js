import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Checkbox from 'expo-checkbox';
import * as React from 'react'; 
import {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, SafeAreaView, TouchableWithoutFeedback, TouchableHighlight, Pressable, Button} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { FAB, SearchBar, Tab, TabView, Overlay} from '@rneui/themed'; 

WebBrowser.maybeCompleteAuthSession();

const Stack = createNativeStackNavigator();

function LoginScreen({navigation}) {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '16392921631-fhe9iup4mjvi73f8u4kkf7605mgfj260.apps.googleusercontent.com',
    iosClientId: '16392921631-cgm2np4r06qv86ognkuut3lenu2c17uo.apps.googleusercontent.com',
    expoClientId: '16392921631-cfto1mbb8np4lt6vjras0f4q9gsv69t4.apps.googleusercontent.com',
  });
  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
      getUserInfo();
      navigation.navigate('Home');
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      setUserInfo(user);
    } catch (error) {
      // Add your own error handler here
      alert("Sign in with Google failed. Please try again")
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 4, justifyContent: 'center', alignItems:'center'}}>
      <Image source={require('./assets/sunnyside-logo.png')} /> 
      </View>
      <View style={{flex: 1, gap: 10}}>
        <TextInput style={styles.input} placeholder="Username or Email"/>
        <TextInput style={styles.input} placeholder="Password" secureTextEntry={true}/> 
      </View>
    <View style={{flex: 1, gap: 10}}>
    <Pressable style={styles.button} onPress={()=>navigation.navigate('Home')}>
      <Text>Login</Text> 
    </Pressable>
     <Button
        title="Sign in with Google"
        disabled={!request}
         onPress={() => {
          promptAsync();
        }}
      />         
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
      <FAB title="Back" color="#F9C980" size='small' titleStyle={{color: 'black', fontWeight:'normal'}} 
      style={{alignSelf: 'flex-start', marginTop: 30}} onPress={()=>navigation.goBack()}/>
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
      <View style={{flex: 1, paddingTop: 20}}>
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
      <View style={[styles.container, {flex: 4, borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: '#F9C980', 
      margin: -20, marginTop: 10,}]}>
      {/* how to make this fill the edges of the screen
      if put outside it says can only have 1 parent element */}
        <Image source={require('./assets/image-placeholder.png')} style={{alignSelf: 'center'}}/>
        <TextInput style={[styles.input, {marginTop: 40}]} placeholder="Display Name"/> 
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

function HomeScreen({navigation}) {
  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={()=>navigation.navigate('Profile')}> 
          <Image source={require('./assets/pfp.png')} style={{objectFit: 'scale-down', height: 40, marginBottom: 5, marginRight: '100%', marginLeft: -15}}/>
        </Pressable>
        <Image source={require('./assets/accessibility-icon.png')} style={{marginLeft: 'auto', marginBottom: 5, marginRight: 15}}/>
        <Image source={require('./assets/notifications-bell.png')} style={{objectFit: 'scale-down', height: 35, marginBottom: 5, marginRight: 30}}/>
      </View>

      <ScrollView style={styles.content}>
        <Text style={{fontWeight: 'bold', alignSelf:'center', fontSize: 20}}>Check on your friends!</Text>
        <View style={[styles.post, {padding: 10, flexDirection: 'row'}]}> 
          <Image source={require('./assets/other-pfp.png')} style={{marginRight: 10}}/>
          <Text style={{fontWeight:'bold'}}> Roo is feeling: {'\n'} 
          <Text style={{fontWeight: 'normal'}}> Ready for demo day!</Text></Text>
        </View>
        <View style={[styles.post, {padding: 10, flexDirection: 'row'}]}> 
          <Image source={require('./assets/other-pfp.png')} style={{marginRight: 10}}/>
          <Text style={{fontWeight:'bold'}}> Roo is feeling: {'\n'} 
          <Text style={{fontWeight: 'normal'}}> Ready for demo day!</Text></Text>
        </View>
        <View style={[styles.post, {padding: 10, flexDirection: 'row'}]}> 
          <Image source={require('./assets/other-pfp.png')} style={{marginRight: 10}}/>
          <Text style={{fontWeight:'bold'}}> Roo is feeling: {'\n'} 
          <Text style={{fontWeight: 'normal'}}> Ready for demo day!</Text></Text>
        </View>
        <View style={[styles.post, {padding: 10, flexDirection: 'row'}]}> 
          <Image source={require('./assets/other-pfp.png')} style={{marginRight: 10}}/>
          <Text style={{fontWeight:'bold'}}> Roo is feeling: {'\n'} 
          <Text style={{fontWeight: 'normal'}}> Ready for demo day!</Text></Text>
        </View>
        <View style={[styles.post, {padding: 10, flexDirection: 'row'}]}> 
          <Image source={require('./assets/other-pfp.png')} style={{marginRight: 10}}/>
          <Text style={{fontWeight:'bold'}}> Roo is feeling: {'\n'} 
          <Text style={{fontWeight: 'normal'}}> Ready for demo day!</Text></Text>
        </View>
        <View style={[styles.post, {padding: 10, flexDirection: 'row'}]}> 
          <Image source={require('./assets/other-pfp.png')} style={{marginRight: 10}}/>
          <Text style={{fontWeight:'bold'}}> Roo is feeling: {'\n'} 
          <Text style={{fontWeight: 'normal'}}> Ready for demo day!</Text></Text>
        </View>
        <View style={[styles.post, {padding: 10, flexDirection: 'row'}]}> 
          <Image source={require('./assets/other-pfp.png')} style={{marginRight: 10}}/>
          <Text style={{fontWeight:'bold'}}> Roo is feeling: {'\n'} 
          <Text style={{fontWeight: 'normal'}}> Ready for demo day!</Text></Text>
        </View>
        <View style={[styles.post, {padding: 10, flexDirection: 'row'}]}> 
          <Image source={require('./assets/other-pfp.png')} style={{marginRight: 10}}/>
          <Text style={{fontWeight:'bold'}}> Roo is feeling: {'\n'} 
          <Text style={{fontWeight: 'normal'}}> Ready for demo day!</Text></Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable onPress={()=>navigation.navigate('Home')}>
          <Image source={require('./assets/home-icon.png')}/>
        </Pressable>
        <Pressable onPress={()=>navigation.navigate('Communities')}>
          <Image source={require('./assets/communities-icon.png')}/>
        </Pressable>
        <Pressable onPress={()=>navigation.navigate('Island')}>
          <Image source={require('./assets/island-icon.png')}/>
        </Pressable>
        <Pressable onPress={()=>navigation.navigate('Messages')}>
          <Image source={require('./assets/messages-icon.png')}/>
        </Pressable>
        <Pressable onPress={()=>navigation.navigate('Events')}>
          <Image source={require('./assets/events-icon.png')}/>
        </Pressable>
        <FAB
        visible={true}
        icon={{ name: 'add', color: 'white' }}
        color="#F9C980"
        placement='right'
        size='large'
        style={{bottom: 75}}
        />
      </View>
    </SafeAreaView>
  )
}

function CommunitiesScreen ({navigation}) {
  const [index, setIndex] = React.useState(0);
  const [search, setSearch] = useState("")
  const updateSearch = (search) => {
    setSearch(search);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={()=>navigation.navigate('Profile')}> 
          <Image source={require('./assets/pfp.png')} style={{objectFit: 'scale-down', height: 40, marginBottom: 5, marginRight: '100%', marginLeft: -15}}/>
        </Pressable>
        <Image source={require('./assets/accessibility-icon.png')} style={{marginLeft: 'auto', marginBottom: 5, marginRight: 15}}/>
        <Image source={require('./assets/notifications-bell.png')} style={{objectFit: 'scale-down', height: 35, marginBottom: 5, marginRight: 30}}/>
      </View>

      <Tab value={index} onChange={(e)=> setIndex(e)} variant='primary' indicatorStyle={{height: 0}}>
        <Tab.Item title="For You" titleStyle={{color: 'black'}}
          containerStyle={(active) => ({
            backgroundColor: active ? "#A7D7B2" : "#BEF5CB",
          })}/>
        <Tab.Item title="Communities" titleStyle={{color: 'black'}}
          containerStyle={(active) => ({
            backgroundColor: active ? "#A7D7B2" : "#BEF5CB",
          })}/>
      </Tab>
      <TabView value={index} onChange={setIndex}>
        <TabView.Item style={{width: '100%'}}>
          <SearchBar
          placeholder="Search..."
          onChangeText={updateSearch}
          value={search}
          containerStyle={{backgroundColor: 'transparent', borderTopWidth: 0, borderBottomWidth: 0}}
          inputContainerStyle={{backgroundColor:'white', borderRadius: 50, height: 30, width: '90%', alignSelf: 'center'}}
          />
        </TabView.Item>
        <TabView.Item style={{width: '100%'}}>
          <Image source={require('./assets/communities-ss.png')}/>
        </TabView.Item>

      </TabView>

      <View style={styles.footer}>
        <Pressable onPress={()=>navigation.navigate('Home')}>
          <Image source={require('./assets/home-icon.png')}/>
        </Pressable>
        <Pressable onPress={()=>navigation.navigate('Communities')}>
          <Image source={require('./assets/communities-icon.png')}/>
        </Pressable>
        <Pressable onPress={()=>navigation.navigate('Island')}>
          <Image source={require('./assets/island-icon.png')}/>
        </Pressable>
        <Pressable onPress={()=>navigation.navigate('Messages')}>
          <Image source={require('./assets/messages-icon.png')}/>
        </Pressable>
        <Pressable onPress={()=>navigation.navigate('Events')}>
          <Image source={require('./assets/events-icon.png')}/>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

function IslandScreen ({navigation}){
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={()=>navigation.navigate('Profile')}> 
          <Image source={require('./assets/pfp.png')} style={{objectFit: 'scale-down', height: 40, marginBottom: 5, marginRight: '100%', marginLeft: -15}}/>
        </Pressable>
        <Image source={require('./assets/accessibility-icon.png')} style={{marginLeft: 'auto', marginBottom: 5, marginRight: 15}}/>
        <Image source={require('./assets/notifications-bell.png')} style={{objectFit: 'scale-down', height: 35, marginBottom: 5, marginRight: 30}}/>
      </View>

      <View style={[styles.content, {backgroundColor: '#B7EDF9', margin: -20}]}>
        <Image source={require('./assets/island-assets.png')}/>
      </View>

      <View style={styles.footer}>
        <Pressable onPress={()=>navigation.navigate('Home')}>
          <Image source={require('./assets/home-icon.png')}/>
        </Pressable>
        <Pressable onPress={()=>navigation.navigate('Communities')}>
          <Image source={require('./assets/communities-icon.png')}/>
        </Pressable>
        <Pressable onPress={()=>navigation.navigate('Island')}>
          <Image source={require('./assets/island-icon.png')}/>
        </Pressable>
        <Pressable onPress={()=>navigation.navigate('Messages')}>
          <Image source={require('./assets/messages-icon.png')}/>
        </Pressable>
        <Pressable onPress={()=>navigation.navigate('Events')}>
          <Image source={require('./assets/events-icon.png')}/>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

function MessagesScreen ({navigation}){
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={()=>navigation.navigate('Profile')}> 
          <Image source={require('./assets/pfp.png')} style={{objectFit: 'scale-down', height: 40, marginBottom: 5, marginRight: '100%', marginLeft: -15}}/>
        </Pressable>
        <Image source={require('./assets/accessibility-icon.png')} style={{marginLeft: 'auto', marginBottom: 5, marginRight: 15}}/>
        <Image source={require('./assets/notifications-bell.png')} style={{objectFit: 'scale-down', height: 35, marginBottom: 5, marginRight: 30}}/>
      </View>

      <View style={[styles.content, {backgroundColor: '#FFF9C1', margin: -20, alignItems: 'center', justifyContent: 'center'}]}>
        <Image source={require('./assets/messages-asset.png')}/>
      </View>

      <View style={styles.footer}>
        <Pressable onPress={()=>navigation.navigate('Home')}>
          <Image source={require('./assets/home-icon.png')}/>
        </Pressable>
        <Pressable onPress={()=>navigation.navigate('Communities')}>
          <Image source={require('./assets/communities-icon.png')}/>
        </Pressable>
        <Pressable onPress={()=>navigation.navigate('Island')}>
          <Image source={require('./assets/island-icon.png')}/>
        </Pressable>
        <Pressable onPress={()=>navigation.navigate('Messages')}>
          <Image source={require('./assets/messages-icon.png')}/>
        </Pressable>
        <Pressable onPress={()=>navigation.navigate('Events')}>
          <Image source={require('./assets/events-icon.png')}/>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

function EventsScreen ({navigation}){
  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={()=>navigation.navigate('Profile')}> 
          <Image source={require('./assets/pfp.png')} style={{objectFit: 'scale-down', height: 40, marginBottom: 5, marginRight: '100%', marginLeft: -15}}/>
        </Pressable>
        <Image source={require('./assets/accessibility-icon.png')} style={{marginLeft: 'auto', marginBottom: 5, marginRight: 15}}/>
        <Image source={require('./assets/notifications-bell.png')} style={{objectFit: 'scale-down', height: 35, marginBottom: 5, marginRight: 30}}/>
      </View>

      <View>
        <Text style={{fontSize: 20}}> Activities Near You</Text>
        <SearchBar
          placeholder="Search..."
          onChangeText={updateSearch}
          value={search}
          containerStyle={{backgroundColor: 'transparent', borderTopWidth: 0, borderBottomWidth: 0}}
          inputContainerStyle={{backgroundColor:'white', borderRadius: 50, height: 30}}
        />
        <Text style={{fontSize: 20}}>Upcoming...</Text>
      </View>
      <ScrollView style={{flex: .6}}>
        <View style={{flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-around'}}>
          <View style={[styles.post, {width: '40%', height: 150, padding: 5, alignItems: 'center', justifyContent: 'center'}]}>
            <Text>Demo Day</Text>
            <Text>Fri, 9 June 2023</Text>
          </View>
          <View style={[styles.post, {width: '40%', height: 150, padding: 5, alignItems: 'center', justifyContent: 'center'}]}>
            <Text>Demo Day</Text>
            <Text>Fri, 9 June 2023</Text>
          </View>
          <View style={[styles.post, {width: '40%', height: 150, padding: 5, alignItems: 'center', justifyContent: 'center'}]}>
            <Text>Demo Day</Text>
            <Text>Fri, 9 June 2023</Text>
          </View>
          <View style={[styles.post, {width: '40%', height: 150, padding: 5, alignItems: 'center', justifyContent: 'center'}]}>
            <Text>Demo Day</Text>
            <Text>Fri, 9 June 2023</Text>
          </View>
          <View style={[styles.post, {width: '40%', height: 150, padding: 5, alignItems: 'center', justifyContent: 'center'}]}>
            <Text>Demo Day</Text>
            <Text>Fri, 9 June 2023</Text>
          </View>
          <View style={[styles.post, {width: '40%', height: 150, padding: 5, alignItems: 'center', justifyContent: 'center'}]}>
            <Text>Demo Day</Text>
            <Text>Fri, 9 June 2023</Text>
          </View>
          <View style={[styles.post, {width: '40%', height: 150, padding: 5, alignItems: 'center', justifyContent: 'center'}]}>
            <Text>Demo Day</Text>
            <Text>Fri, 9 June 2023</Text>
          </View>
          <View style={[styles.post, {width: '40%', height: 150, padding: 5, alignItems: 'center', justifyContent: 'center'}]}>
            <Text>Demo Day</Text>
            <Text>Fri, 9 June 2023</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable onPress={()=>navigation.navigate('Home')}>
          <Image source={require('./assets/home-icon.png')}/>
        </Pressable>
        <Pressable onPress={()=>navigation.navigate('Communities')}>
          <Image source={require('./assets/communities-icon.png')}/>
        </Pressable>
        <Pressable onPress={()=>navigation.navigate('Island')}>
          <Image source={require('./assets/island-icon.png')}/>
        </Pressable>
        <Pressable onPress={()=>navigation.navigate('Messages')}>
          <Image source={require('./assets/messages-icon.png')}/>
        </Pressable>
        <Pressable onPress={()=>navigation.navigate('Events')}>
          <Image source={require('./assets/events-icon.png')}/>
        </Pressable>
        <FAB
        visible={true}
        icon={{ name: 'add', color: 'white' }}
        color="#F9C980"
        placement='right'
        size='large'
        style={{bottom: 75}}
        />
      </View>
    </SafeAreaView>
  )
}

function ProfileScreen ({navigation}){
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={()=>navigation.navigate('Profile')}> 
          <Image source={require('./assets/pfp.png')} style={{objectFit: 'scale-down', height: 40, marginBottom: 5, marginRight: '100%', marginLeft: -15}}/>
        </Pressable>
        <Image source={require('./assets/accessibility-icon.png')} style={{marginLeft: 'auto', marginBottom: 5, marginRight: 15}}/>
        <Image source={require('./assets/notifications-bell.png')} style={{objectFit: 'scale-down', height: 35, marginBottom: 5, marginRight: 30}}/>
      </View>

      <View style={[styles.content, {backgroundColor: '#FFF9C1', margin: -20, alignItems: 'center', justifyContent: 'center'}]}>
        <Image source={require('./assets/edit-profile-asset.png')}/>
      </View>

      <View style={styles.footer}>
        <Pressable onPress={()=>navigation.navigate('Home')}>
          <Image source={require('./assets/home-icon.png')}/>
        </Pressable>
        <Pressable onPress={()=>navigation.navigate('Communities')}>
          <Image source={require('./assets/communities-icon.png')}/>
        </Pressable>
        <Pressable onPress={()=>navigation.navigate('Island')}>
          <Image source={require('./assets/island-icon.png')}/>
        </Pressable>
        <Pressable onPress={()=>navigation.navigate('Messages')}>
          <Image source={require('./assets/messages-icon.png')}/>
        </Pressable>
        <Pressable onPress={()=>navigation.navigate('Events')}>
          <Image source={require('./assets/events-icon.png')}/>
        </Pressable>
      </View>
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
      <Stack.Screen name="Communities" component={CommunitiesScreen}/>
      <Stack.Screen name="Island" component={IslandScreen}/>
      <Stack.Screen name="Messages" component={MessagesScreen}/>
      <Stack.Screen name="Events" component={EventsScreen}/>
      <Stack.Screen name="Profile" component={ProfileScreen}/>

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

  header: {
    backgroundColor: '#F9C980',
    flex: .15,
    marginHorizontal: -20,
    marginTop: -20,
    paddingBottom: 10,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },

  content: {
    flex: .8,
    paddingVertical: 5,
  },

  footer: {
    backgroundColor: '#F9C980',
    flex: .12,
    marginHorizontal: -20,
    marginBottom: -20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  button: { 
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
  },

  post: {
    borderColor: '#000000',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginVertical: 10,
  }
});
