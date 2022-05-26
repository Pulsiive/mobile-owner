import React, { useState } from 'react';
import { TouchableOpacity, View, Text, TextInput, Button, StyleSheet } from 'react-native';
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
      // const userObject = await axios.post(`${config.API_URL}/api/v1/password`, {
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
    <View style={styles.viewTemplate}>
      <Text style={styles.title}>Reset Password</Text>
      <View style={styles.container}>
        <TextInput
          onChangeText={(text) => handleChange(text, 'email')}
          style={styles.input}
          placeholder="Email address"
          autoComplete="email"
        />
        {/* <TextInput
          onChangeText={(text) => handleChange(text, 'oldpassword')}
          style={styles.input}
          placeholder="Old Password"
          secureTextEntry={true}
          autoComplete="password"
        /> */}
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
        <TouchableOpacity style={styles.updateButtonBoxWithoutBackground} onPress={submit}>
          <Text style={styles.updateButton}>Update password</Text>
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
    borderRadius: 10
  },

  // BUTTON BOX
  updateButtonBoxWithoutBackground: {
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
  updateButton: {
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

export default ResetPassword;
