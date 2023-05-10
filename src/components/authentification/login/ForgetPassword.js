import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, TextInput, Button, StyleSheet, Linking } from 'react-native';
import api from '../../../globals/query/API';

const RequestResetPassword = ({ navigation }) => {
  const [userInput, setUserInput] = useState({
    email: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);
  const [Mailsent, setMailsent] = useState(false);
  const handleChange = (text, field) => {
    if (error) setError(false);
    userInput[field] = text;
    setUserInput(userInput);
  };

  const submit = async () => {
    try {
      if (userInput['email'] == '') {
        setErrorMessage('put an email please !');
        setError(true);
        throw errorMessage;
      }
      const res = await api.send(
        'post',
        '/api/v1/auth/requestPasswordReset',
        userInput,
        (auth = false)
      );
      console.log(userInput);
      console.log(res.status);
      if (res.status == 200) {
        setMailsent(true);
        navigation.navigate('MDP2', userInput);
      }
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
        {!Mailsent && (
          <TextInput
            onChangeText={(text) => handleChange(text, 'email')}
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor="grey"
            color="grey"
            autoComplete="email"
          />
        )}
        {/* <TextInput
          onChangeText={(text) => handleChange(text, 'oldpassword')}
          style={styles.input}
          placeholder="Old Password"
          secureTextEntry={true}
          autoComplete="password"
        /> */}
        {Mailsent && (
          <>
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
          </>
        )}

        <TouchableOpacity style={styles.updateButtonBoxWithoutBackground} onPress={submit}>
          <Text style={styles.updateButton}>Reset password</Text>
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

export default RequestResetPassword;
