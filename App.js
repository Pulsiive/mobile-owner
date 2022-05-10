/**
 * Main Pulsive
 * Router
 */

import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/components/authentification/login/Login.js';
import Register from './src/components/authentification/register/Register.js';
import HomePage from './src/components/homePage/HomePage.js';
import ForgetPassword from './src/components/authentification/login/ForgetPassword.js';
import Settings from './src/components/settings/Settings.js';
import Profile from './src/components/settings/Profile.js';

const Stack = createNativeStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
