import React, { useState } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Image,
  Text,
  Button,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import api from '../../../globals/query/API';
import serviceAccessToken from '../../../globals/query/AccessToken';

import Logo2 from './../../../Asset/logo-2.png';

const Register = ({ navigation }) => {
  const [isActive, setActive] = useState(false);
  const [userInput, setUserInput] = useState({
    email: 'default',
    password: 'default',
    firstName: 'default',
    lastName: 'default',
    dateOfBirth: '2022-03-02T18:11:29.003Z'
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (text, field) => {
    if (error) setError(false);
    userInput[field] = text;
    // console.log(userInput);
    setUserInput(userInput);
  };

  const submit = async () => {
    try {
      if (userInput.email == 'default' || userInput.password == 'default') {
        throw { data: 'Veuillez indiquer un email et un mot de passe', status: '405' };
      }
      const res = await api.send('POST', '/api/v1/auth/register', userInput, false);
      console.log(res);

      if (res.status == 200) {
        serviceAccessToken.set(res.data.accessToken);
        setErrorMessage('');
        navigation.navigate('Tab');
      } else {
        // console.log(res);
        throw res;
      }
      <ActivityIndicator />;
      navigation.navigate('Tab');
    } catch (e) {
      console.log(e);
      if (e.status == 405) {
        setErrorMessage('');
        alert('Veuillez indiquer un email et un mot de passe');
        setErrorMessage('Veuillez indiquer un email et un mot de passe');
        setError(true);
      }
      if (e.status != 405) {
        setErrorMessage('');
        alert(e.data.message);
        setErrorMessage(e.data.message);

        setError(true);
      }
      if (e.response) {
        console.log(e.response);

        if (e.response.status == 409) setErrorMessage('User already registered');
        setError(true);
      } else {
        // setErrorMessage('Internal error');
        // setError(true);
      }
    }
  };

  return (
    <View style={styles.viewTemplate}>
      <View style={styles.container}>
        <Image
          source={Logo2}
          style={{ left: '54%', top: '15%', position: 'absolute', width: 50, height: 50 }}
        ></Image>
        <Text style={styles.title}>Inscription</Text>
        {errorMessage == undefined ? null : <Text style={{ color: 'white' }}>{errorMessage}</Text>}

        <TextInput
          onChangeText={(text) => handleChange(text, 'lastName')}
          style={errorMessage.length > 0 ? styles.inputOnError : styles.input}
          placeholder="Nom"
          placeholderTextColor="grey"
          autoComplete="username"
        />
        <TextInput
          onChangeText={(text) => handleChange(text, 'firstName')}
          style={errorMessage.length > 0 ? styles.inputOnError : styles.input}
          placeholder="Prénom"
          placeholderTextColor="grey"
          autoComplete="username"
        />
        <TextInput
          onChangeText={(text) => handleChange(text, 'email')}
          style={
            errorMessage == 'User already registered' || errorMessage.length > 0
              ? styles.inputOnError
              : styles.input
          }
          placeholder="Email"
          placeholderTextColor="grey"
          autoComplete="email"
        />
        <TextInput
          onChangeText={(text) => handleChange(text, 'password')}
          style={errorMessage.length > 0 ? styles.inputOnError : styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="grey"
          secureTextEntry={true}
          autoComplete="password"
        />

        <TouchableOpacity
          testID="submitButton"
          style={styles.registerButtonBoxWithoutBackground}
          onPress={submit}
        >
          <Text style={styles.registerButton}>S'inscrire</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.accountButtonBoxWithoutBackground}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.accountButton}>Se connecter</Text>
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
    borderRadius: 10,
    height: 40,
    margin: 12,
    borderWidth: 1,
    width: 100 + '%',
    left: -12,
    padding: 10
  },
  inputOnError: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    height: 40,
    margin: 12,
    borderWidth: 1,
    width: 100 + '%',
    left: -12,
    padding: 10,
    borderColor: 'red'
  },
  title: {
    textAlign: 'center',
    // fontWeight: '400',
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
    paddingTop: '4%',
    paddingBottom: '4%'
  },
  accountButton: {
    fontWeight: '500',
    textAlign: 'center',
    marginTop: '-50%',
    color: 'white'
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
