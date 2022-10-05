import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Settings from '../settings/Settings';

const HomePage = ({ navigation }) => {
  return (
    <View>
      <Text>HomePage</Text>
      <Button title="Messages" onPress={() => navigation.navigate('Messages')} />
      <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
    </View>
  );
};

export default HomePage;
