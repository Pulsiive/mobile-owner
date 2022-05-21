import React, { useState } from 'react';
import { Image, View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Tutorial = ({ navigation }) => {
  return (
    <View>
      <Text style={styles.title}>Tutorial</Text>
      <View style={styles.container}>
        <Button
          title="Back"
          accessibilityLabel="Profile to your account"
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 50
  },
  title: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 30,
    color: 'black',
    marginBottom: 0,
    marginTop: 10
  },
  input: {
    borderWidth: 0.2,
    marginBottom: 20
  }
});

export default Tutorial;
