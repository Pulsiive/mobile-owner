import React from 'react';
import { View, Text, Button } from 'react-native';

const Register = ({ navigation }) => {
  return (
    <View>
      <Text>Register</Text>
      <Button
        title="I have an account"
        accessibilityLabel="Click here if you already have an account"
        onPress={() => navigation.navigate('Login')}
        color="grey"
      />
    </View>
  );
};

export default Register;
