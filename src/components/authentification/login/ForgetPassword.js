import React, { useState } from 'react';
import { Image, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import config from '../../../globals/utils/config';

const ResetPassword = ({ navigation }) => {
  const [userInput, setUserInput] = useState({
    email: '',
    oldpassword: '',
    password: '',
    repassword: ''
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
      if (userInput['password'] != userInput['repassword']) {
        setErrorMessage('Password are not identical');
        setError(true);
        throw errorMessage;
      }
      // const userObject = await axios.post(`${config.API_URL}/`, {
      //   ...userInput,
      // });
      // const jwt = userObject.data.data.user.accessToken;
      // await AsyncStorage.setItem("accessToken", jwt);
      navigation.navigate('Login');
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
      {/* <Image style={styles.tinyLogo} source={require('../../../images/logo_pulsive.png')} /> */}
      <Text style={styles.title}>Reset Password</Text>
      <View style={styles.container}>
        <TextInput
          onChangeText={(text) => handleChange(text, 'email')}
          style={styles.input}
          placeholder="Email address"
          autoComplete="email"
        />
        <TextInput
          onChangeText={(text) => handleChange(text, 'oldpassword')}
          style={styles.input}
          placeholder="Old Password"
          secureTextEntry={true}
          autoComplete="password"
        />
        <TextInput
          onChangeText={(text) => handleChange(text, 'password')}
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          autoComplete="password"
        />
        <TextInput
          onChangeText={(text) => handleChange(text, 'repassword')}
          style={styles.input}
          placeholder="re-enter same password"
          secureTextEntry={true}
          autoComplete="password"
        />
        <Button title="Update password" accessibilityLabel="Update password" onPress={submit} />
        <Button
          title="Back"
          accessibilityLabel="Back"
          onPress={() => navigation.navigate('HomePage')}
          color="darkblue"
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

export default ResetPassword;
