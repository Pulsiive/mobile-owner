import React, { useState } from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import api from '../../../globals/query/API';
import serviceAccessToken from '../../../globals/query/AccessToken';

import Logo2 from './../../../Asset/logo-2.png';

const Login = ({ navigation }) => {
  const [userInput, setUserInput] = useState({
    email: '',
    password: ''
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
      console.log('submit login');
      if (userInput.email == '' || userInput.password == '')
        throw { data: 'email or password has not been defined', status: '404' };
      const res = await api.send('POST', '/api/v1/auth/login', userInput, (auth = false));
      console.log(res);
      if (res.status == 200) {
        serviceAccessToken.set(res.data.accessToken);
        setErrorMessage('');
        <ActivityIndicator />;
        navigation.navigate('Tab');
      } else {
        throw res;
      }
    } catch (e) {
      if (e.data) {
        setErrorMessage(e.data.message);
        const code = e.status;
        if (code === 401) setErrorMessage('Incorrect password');
        else if (code === 404) setErrorMessage('User not found');
        setError(true);
      } else {
        setErrorMessage('Internal error: ', e);
        setError(true);
      }
    }
  };

  return (
    <View style={styles.viewTemplate}>
      <Image
        source={Logo2}
        style={{ left: '45%', top: '12%', position: 'absolute', width: 50, height: 50 }}
      ></Image>
      <Text style={styles.title}>Se connecter</Text>
      <View style={styles.container}>
        {errorMessage == undefined ? null : <Text style={{ color: 'white' }}>{errorMessage}</Text>}
        <TextInput
          accessibilityLabel="email"
          onChangeText={(text) => handleChange(text, 'email')}
          style={
            errorMessage == 'User not found' || errorMessage == 'Internal error'
              ? styles.inputOnError
              : styles.input
          }
          placeholder="Email"
          placeholderTextColor="grey"
          autoComplete="email"
          value={userInput.name}
        />
        <TextInput
          accessibilityLabel="password"
          onChangeText={(text) => handleChange(text, 'password')}
          style={
            errorMessage == 'Incorrect password' || errorMessage == 'Internal error'
              ? styles.inputOnError
              : styles.input
          }
          placeholder="Mot de passe"
          placeholderTextColor="grey"
          secureTextEntry={true}
          autoComplete="password"
        />
        <TouchableOpacity
          testID="LoginButton"
          style={styles.loginButtonBoxWithoutBackground}
          onPress={submit}
        >
          <Text style={styles.loginButton}>Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.forgetPasswordButtonBoxWithoutBackground}
          onPress={() => navigation.navigate('RequestResetPassword')}
        >
          <Text style={styles.forgetPasswordButton}>Mot de passe oublié</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerButtonBoxWithoutBackground}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.loginButton}>S'inscrire</Text>
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

  topLeftLeaf: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: '-16%'
  },
  bottomRightLeaf: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: '90%',
    right: '-5%'
  },

  container: {
    padding: 50
  },
  title: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 30,
    color: '#F2F2F2',
    marginBottom: 0,
    marginTop: '45%'
  },
  input: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    height: 40,
    margin: 12,
    left: -12,
    width: 100 + '%',
    borderWidth: 1,
    padding: 10
  },
  inputOnError: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    height: 40,
    margin: 12,
    left: -12,
    width: 100 + '%',
    borderWidth: 1,
    padding: 10,
    borderColor: 'red'
  },

  // BUTTON BOX
  loginButtonBoxWithoutBackground: {
    backgroundColor: '#6EBF34',
    borderRadius: 10,
    width: '100%'
  },
  forgetPasswordButtonBoxWithoutBackground: {
    width: '57%',
    marginLeft: '22%'
  },
  registerButtonBoxWithoutBackground: {
    width: '32%',
    marginLeft: '35%',
    marginTop: '10%'
  },
  // BUTTON
  loginButton: {
    color: 'white',
    textAlign: 'center',
    paddingTop: '4%',
    paddingBottom: '4%'
  },
  forgetPasswordButton: {
    fontWeight: '300',
    textAlign: 'center',
    marginTop: '5%',
    color: 'grey'
  },
  registerButton: {
    fontWeight: '400',
    fontSize: 17,
    textAlign: 'center',
    marginTop: '15%',
    color: 'white'
  }
});

export default Login;
