import React from 'react';
import { View, Text, Button } from 'react-native';

const Login = ({ navigation }) => {
  return (
    <View>
      <Text>Login</Text>
      <Button
        title="Create an account"
        accessibilityLabel="Click here if you don't have an account"
        onPress={() => navigation.navigate('Register')}
        color="grey"
      />
    </View>
  );
};

export default Login;
