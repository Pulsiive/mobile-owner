import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../../../globals/utils/config';

const Register = ({ navigation }) => {
  const [userInput, setUserInput] = useState({
    email: 'default',
    password: 'default',
    firstName: 'default',
    lastName: 'default',
    dateOfBirth: '2001-07-15'
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (text, field) => {
    if (error) setError(false);
    userInput[field] = text;
    setUserInput(userInput);
  };

  const submit = async () => {
    try {
      console.log(JSON.stringify(userInput));
      const userObject = await axios.post(
        'http://13.88.201.19:3000/api/v1/auth/register',
        JSON.stringify(userInput),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      // (
      //   'http://13.88.201.19:3000/api/v1/auth/register',
      //   userInput, {
      //     headers: {
      //       // Overwrite Axios's automatically set Content-Type
      //       'Content-Type': 'application/json'
      //     })
      // );
      console.log('after query');
      console.log(userObject);
      const jwt = userObject.data.data.user.accessToken;
      await AsyncStorage.setItem('accessToken', jwt);
      navigation.navigate('HomePage');
    } catch (e) {
      if (e.response) {
        if (e.response.status === 404) setErrorMessage('User already registered');
        else setErrorMessage('Internal error');
        setError(true);
      } else {
        setErrorMessage('Internal error');
        setError(true);
      }
    }
  };

  return (
    <View style={styles.viewTemplate}>
      <View style={styles.container}>
        <Text style={styles.title}>Create your account</Text>
        <TextInput
          onChangeText={(text) => handleChange(text, 'email')}
          style={errorMessage == '' ? styles.input : styles.inputOnError}
          placeholder="Email address"
          autoComplete="email"
        />
        <TextInput
          onChangeText={(text) => handleChange(text, 'firstName')}
          style={styles.input}
          placeholder="First name"
          autoComplete="username"
        />
        <TextInput
          onChangeText={(text) => handleChange(text, 'lastName')}
          style={styles.input}
          placeholder="Last name"
          autoComplete="username"
        />
        <TextInput
          onChangeText={(text) => handleChange(text, 'password')}
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          autoComplete="password"
        />
        <TouchableOpacity style={styles.registerButtonBoxWithoutBackground} onPress={submit}>
          <Text style={styles.registerButton}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.accountButtonBoxWithoutBackground}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.accountButton}>I have an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewTemplate: {
    backgroundColor: '#0D0D0D',
    width: '100%',
    height: '100%'
  },

  container: {
    padding: 40
  },
  input: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10
  },
  title: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 30,
    color: '#F2F2F2',
    marginBottom: '10%',
    marginTop: '40%'
  },
  // BUTTON BOX
  registerButtonBoxWithoutBackground: {
    backgroundColor: '#6EBF34',
    borderRadius: 10,
    width: '100%'
  },
  accountButtonBoxWithoutBackground: {
    width: '40%',
    marginLeft: '30%',
    marginTop: '30%'
  },

  // BUTTON
  registerButton: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '900',
    paddingTop: '4%',
    paddingBottom: '4%'
  },
  accountButton: {
    fontWeight: '500',
    textAlign: 'center',
    marginTop: '5%',
    color: 'grey'
  },

  errorContainer: {
    color: 'red',
    marginBottom: 30,
    backgroundColor: '#ff3333',
    borderRadius: 5
  },
  errorText: {
    textAlign: 'center',
    color: 'white'
  }
});

export default Register;
