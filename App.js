/**
 * Main Pulsive
 * Router
 */

import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/components/authentification/login/Login.js';

const Stack = createNativeStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          {/* <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="HomePage" component={HomePage} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
