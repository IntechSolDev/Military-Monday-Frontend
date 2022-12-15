// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from '../Screens/Authscreens/Signupscreen'
import Login from '../Screens/Authscreens/Loginscreen'
import Forgetscreen1 from '../Screens/Authscreens/Forgetscreen1';
import Forgetscreen2 from '../Screens/Authscreens/Forgotscreen2';
import Forgetscreen3 from '../Screens/Authscreens/Forgetscreen3';

const Stack = createNativeStackNavigator();

function AuthNav() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
        <Stack.Screen name="Signup" component={Signup} options={{headerShown:false}}/>
        <Stack.Screen name="Forgetscreen1" component={Forgetscreen1} options={{ title:'Forgot Password',headerTitleAlign:'center',headerBackTitle:''}}/>
        <Stack.Screen name="Forgetscreen2" component={Forgetscreen2} options={{ title:'Forgot Password',headerTitleAlign:'center',headerBackTitle:''}}/>
        <Stack.Screen name="Forgetscreen3" component={Forgetscreen3} options={{ title:'Forgot Password',headerTitleAlign:'center',headerBackTitle:''}}/>

      </Stack.Navigator>
  );
}

export default AuthNav;