import React, { useEffect, useState } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Image,
  Text,
  Button,
  TouchableOpacity,
  ActivityIndicator, TouchableHighlight
} from 'react-native';
import api from '../../../globals/query/API';
import messaging from '@react-native-firebase/messaging';
import serviceAccessToken from '../../../globals/query/AccessToken';

import Logo2 from './../../../Asset/logo-2.png';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Backend from '../../../globals/query/Backend';
import API from '../../../globals/query/API';

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

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: '812570876185-c1dr04tgo8hon7ciaukbdjtu9srkjlcb.apps.googleusercontent.com', // only for iOS
      webClientId: '812570876185-b6j070v7obu11b3j0dce4dtmuuhfu609.apps.googleusercontent.com',
      offlineAccess: true
    });
  }, [])


  async function GoogleRegister(navigation) {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // Get the users ID token
      const user = await GoogleSignin.signIn();
      const fcmToken = await messaging().getToken();

      const response = await API.send('POST', '/api/v1/oauth/google/register', {credential:user.idToken, fcmToken},  false);

      if (response.status === 200) {
        serviceAccessToken.set(response.data.accessToken);
        navigation.navigate('Tab');
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('cancel')

        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('progress')
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('not available')
        // play services not available or outdated
      } else {
        console.log('what ??')
        // some other error happened
      }
    }
  }


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
      const fcmToken = await messaging().getToken();
      const res = await api.send(
        'POST',
        '/api/v1/auth/register',
        { ...userInput, fcmToken },
        false
      );
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
        <View style={{display: 'flex', alignItems: 'center', width: '100%', marginVertical: 20}}>
          <Text style={{color:'white'}}>Ou</Text>
        </View>
        <TouchableHighlight style={styles.border} onPress={() => GoogleRegister(navigation)}>
          <View>
            <Text style={styles.TextFB}>S'inscrire avec Google</Text>
          </View>
        </TouchableHighlight>
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
  },
  border: {
    minWidth: 300,
    height: 44,
    borderRadius: 9,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'white',
    left: 0,
    // position: 'absolute',
    // top: 55.34 + '%',
    // display: 'flex',
    // alignItems: 'flex-start',
    backgroundColor: '#ffffff1a',
    paddingBottom: 36.7,
    ...padding(9.9, 36.7)
  },
  logoFB: {
    width: 24,
    height: 24,
    resizeMode: 'cover'
  },
  TextFB: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold'
  },
});

function padding(a, b, c, d) {
  return {
    paddingTop: a,
    paddingRight: b ? b : a,
    paddingBottom: c ? c : a,
    paddingLeft: d ? d : b ? b : a
  };
}

export default Register;
