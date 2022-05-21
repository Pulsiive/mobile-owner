import React, { useState } from 'react';
import { Image, View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Settings = ({ navigation }) => {
  //   const [userInput, setUserInput] = useState({
  //     email: '',
  //     password: ''
  //   });
  //   const [errorMessage, setErrorMessage] = useState('');
  //   const [error, setError] = useState(false);

  //   const handleChange = (text, field) => {
  //     if (error) setError(false);
  //     userInput[field] = text;
  //     setUserInput(userInput);
  //   };

  return (
    <View>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.container}>
        <Button
          title="Profile"
          accessibilityLabel="Profile"
          onPress={() => navigation.navigate('Profile')}
        />
        <Button
          title="Wallet"
          accessibilityLabel="Wallet"
          onPress={() => navigation.navigate('Wallet')}
        />
        <Button
          title="Legal mentions"
          accessibilityLabel="Legal mentions"
          onPress={() => navigation.navigate('LegalMentions')}
        />
        <Button
          title="Tutorial"
          accessibilityLabel="tutorial"
          onPress={() => navigation.navigate('Tutorial')}
        />
        <Button
          title="Back"
          accessibilityLabel="Profile to your account"
          onPress={() => navigation.navigate('HomePage')}
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

export default Settings;
