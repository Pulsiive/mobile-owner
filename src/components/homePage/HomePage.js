import React from 'react';
import { View, Text, Button } from 'react-native';
import DisconnectComponent from '../../globals/components/disconnect';

const HomePage = ({ navigation }) => {
  return (
    <View>
      <Text>HomePage</Text>
      <DisconnectComponent navigation={navigation} />
      <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
    </View>
  );
};

export default HomePage;