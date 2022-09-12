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
import Wallet from './src/components/settings/Wallet.js';
import Deposit from './src/components/settings/Deposit.js';
import AddCard from './src/components/settings/AddCard.js';
import Withdraw from './src/components/settings/Withdraw.js';
import AccountTransaction from './src/components/settings/AccountTransaction.js';
import LegalMentions from './src/components/settings/LegalMentions.js';
import Tutorial from './src/components/settings/Tutorial.js';
import Messages from './src/components/messages/Message.js';
import PrivateMessages from './src/components/messages/PrivateMessages.js';

import BorneMap from './src/components/borneProcess/BorneMap.js';
import RegisterStation from './src/components/settings/RegisterStation.js';
import MyStations from './src/components/settings/MyStationsList.js';
import Reservations from './src/components/settings/Reservations.js';

const Stack = createNativeStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} /> */}
          <Stack.Screen name="HomePage" component={HomePage} />
          {/* <Stack.Screen name="HomePage" component={BorneMap} /> */}
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Wallet" component={Wallet} />
          <Stack.Screen name="Deposit" component={Deposit} />
          <Stack.Screen name="AddCard" component={AddCard} />
          <Stack.Screen name="Withdraw" component={Withdraw} />
          <Stack.Screen name="RegisterStation" component={RegisterStation} />
          <Stack.Screen name="StationList" component={MyStations} />
          <Stack.Screen name="Reservations" component={Reservations} />

          <Stack.Screen name="AccountTransaction" component={AccountTransaction} />
          <Stack.Screen name="LegalMentions" component={LegalMentions} />
          <Stack.Screen name="Tutorial" component={Tutorial} />
          <Stack.Screen name="Messages" component={Messages} />
          <Stack.Screen name="PrivateMessages" component={PrivateMessages} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
