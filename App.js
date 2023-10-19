/**
 * Main Pulsive
 * Router
 */

import React, { Component } from 'react';
import { Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Login from './src/components/authentification/login/Login.js';
import Register from './src/components/authentification/register/Register.js';
import HomePage from './src/components/homePage/HomePage.js';
import HomeScreen2 from './src/components/authentification/Home-2.js';
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
import RequestResetPassword from './src/components/authentification/login/ForgetPassword.js';

import BorneMap from './src/components/borneProcess/BorneMap.js';
import RegisterStation from './src/components/settings/RegisterStation.js';
import MyStations from './src/components/settings/MyStationsList.js';
import Reservations from './src/components/settings/Reservations.js';
import PastReservations from './src/components/settings/PastReservations.js';

import Planning from './src/components/homePage/Planning.js';
import AddSlot from './src/components/homePage/AddStationSlot.js';

import ContactList from './src/components/Contacts/ContactList.js';
import AddContact from './src/components/Contacts/AddContact.js';
import ChangePassword from './src/components/settings/ChangePassword.js';
import PaymentsUICustomScreen from './src/components/settings/PaymentUICustomScreen.js';
import Activity from './src/components/activity/Activity.js';
import ActivityHistory from './src/components/activity/ActivityHistory.js';
import ActivityDetails from './src/components/activity/ActivityDetails.js';
import NotificationManagement from './src/components/settings/NotificationManagement.js';
import Confidentiality from './src/components/Confidentiality/Confidentiality.js';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen2" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen2" component={HomeScreen2} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="RequestResetPassword" component={RequestResetPassword} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="HomePage" component={HomePage} />
    </Stack.Navigator>
  );
};

const ActivityStack = () => {
  return (
    <Stack.Navigator initialRouteName="Activity" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Activity" component={Activity} />
      <Stack.Screen name="ActivityHistory" component={ActivityHistory} />
      <Stack.Screen name="ActivityDetails" component={ActivityDetails} />
    </Stack.Navigator>
  );
};

const SettingsStack = () => {
  return (
    <Stack.Navigator initialRouteName="Settings" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="PaymentUICustomScreen" component={PaymentsUICustomScreen} />
      <Stack.Screen name="Deposit" component={Deposit} />
      <Stack.Screen name="AddCard" component={AddCard} />
      <Stack.Screen name="Withdraw" component={Withdraw} />
      <Stack.Screen name="RegisterStation" component={RegisterStation} />
      <Stack.Screen name="StationList" component={MyStations} />
      <Stack.Screen name="Reservations" component={Reservations} />
      <Stack.Screen name="PastReservations" component={PastReservations} />
      <Stack.Screen name="ContactList" component={ContactList} />
      <Stack.Screen name="AddContact" component={AddContact} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="NotificationManagement" component={NotificationManagement} />
      <Stack.Screen name="Confidentiality" component={Confidentiality} />

      <Stack.Screen name="AccountTransaction" component={AccountTransaction} />
      <Stack.Screen name="LegalMentions" component={LegalMentions} />
      <Stack.Screen name="Tutorial" component={Tutorial} />
    </Stack.Navigator>
  );
};

const MessageStack = () => {
  return (
    <Stack.Navigator initialRouteName="Messages" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="PrivateMessages" component={PrivateMessages} />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomePage" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="Planning" component={Planning} />
      <Stack.Screen name="AddSlot" component={AddSlot} />
    </Stack.Navigator>
  );
};

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#00AF54',
        headerTitleAlign: 'center',
        headerTitle: () => (
          <Image
            style={{ width: 20, height: 20, zIndex: 999 }}
            source={require('./src/images/HomePageAsset/logo.png')}
            resizeMode="contain"
          />
        ),
        tabBarStyle: {
          height: 40,
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: 'rgba(34,36,40,1)',
          position: 'absolute',
          borderTopWidth: 0
        },
        headerStyle: {
          backgroundColor: 'black'
        },
        headerTitleStyle: {
          color: 'green'
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={AppStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Activity"
        component={ActivityStack}
        options={{
          tabBarLabel: 'Activity',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book" color={color} size={size} />
          )
        }}
      />
      {/* <Tab.Screen
        name="Map"
        component={BorneMap}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map" color={color} size={size} />
          )
        }}
      /> */}
      <Tab.Screen
        name="Message"
        component={MessageStack}
        options={{
          tabBarLabel: 'Message',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="comment-text" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingsStack}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog-outline" color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

const RootNavigator = () => (
  <Stack.Navigator initialRouteName="App" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LoginScreen" component={LoginStack} />
    <Stack.Screen name="Tab" component={BottomTab} />
  </Stack.Navigator>
);

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    );
  }
}

export default App;
