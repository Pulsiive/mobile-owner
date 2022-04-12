import React, { useState } from 'react';
import { Image, View, Text, TextInput, Button, StyleSheet } from 'react-native';

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
      // const userObject = await axios.post(`${config.API_URL}/api/auth/login`, {
      //   ...userInput,
      // });
      // const jwt = userObject.data.data.user.accessToken;
      // await AsyncStorage.setItem("accessToken", jwt);
      navigation.navigate('HomePage');
    } catch (e) {
      if (e.response) {
        const code = e.response.status;
        if (code === 401) setErrorMessage('Incorrect password');
        else if (code === 404) setErrorMessage('User not found');
        else setErrorMessage('Internal error');
        setError(true);
      } else {
        setErrorMessage('Internal error');
        setError(true);
      }
    }
  };

  return (
    <View>
      <Image style={styles.tinyLogo} source={require('../../../images/logo_pulsive.png')} />
      <Text style={styles.title}>Login</Text>
      <View style={styles.container}>
        <TextInput
          onChangeText={(text) => handleChange(text, 'email')}
          style={styles.input}
          placeholder="Email address"
          autoComplete="email"
        />
        <TextInput
          onChangeText={(text) => handleChange(text, 'password')}
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          autoComplete="password"
        />
        <Button title="login" accessibilityLabel="Login to your account" onPress={submit} />
        <Button
          title="Create an account"
          accessibilityLabel="Click here if you don't have an account"
          onPress={() => navigation.navigate('Register')}
          color="grey"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 50
  },
  tinyLogo: {
    width: 400,
    height: 210
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

export default Login;
