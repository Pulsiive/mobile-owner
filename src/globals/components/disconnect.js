import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

/**
 *  Reusable Button component to navigate back to login
 */


const DisconnectComponent = ({ navigation }) => {
  return (
    <Pressable style={styles.disconnect} onPress={() => {
      navigation.navigate('Login');
    }}>
      <Text style={styles.disconnectContent}>Disconnect</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  disconnect: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '10%',
    width: '90%',
    marginLeft: '5%',
    marginBottom: '2%',
    borderRadius: 10,
    backgroundColor: 'black'
  },
  disconnectContent: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500'
  }
});

export default DisconnectComponent;
