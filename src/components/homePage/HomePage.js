import React from 'react';
import { View, Text, Button } from 'react-native';

const HomePage = ({ navigation }) => {
  return (
    <View>
      <Text>HomePage</Text>
      <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
    </View>
  );
};

export default HomePage;
