import React from 'react';
import { Button } from 'react-native';

/**
 *  Reusable Button component to navigate back to login
 */
const DisconnectComponent = ({ navigation }) => {
  return (
    <Button
      title="Disconnect"
      accessibilityLabel="Click here to disconnect"
      onPress={() => navigation.navigate('Login')}
      color="grey"
    />
  );
};

export default DisconnectComponent;
