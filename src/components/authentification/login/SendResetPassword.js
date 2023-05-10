import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, TextInput, Button, StyleSheet, Linking } from 'react-native';
import api from '../../../globals/query/API';

const SendResetPassword = ({ navigation, route }) => {
  const { email } = route.params;
  const [token, setToken] = useState('');
  const handleOpenURL = (event) => {
    navigate(event.url);
  };

  useEffect(() => {
    let subscription;
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then((url) => {
        const { token } = navigate(url);
      });
    } else {
      subscription = Linking.addListener('url', handleOpenURL);
    }

    return () => {
      subscription.remove();
    };
  }, []);

  const navigate = (url) => {
    const route = url.replace(/.*?:\/\//g, '');
    console.log(route);
    const args = route.split('/');
    const routeName = args[0];
    const token = args[1];

    if (routeName === 'resetPassword') {
      setToken(token);
      setMailsent(true);
    }
  };

  const [seconduserInput, secondsetUserInput] = useState({
    email: email,
    password: '',
    password_confirmation: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);
  const [Mailsent, setMailsent] = useState(false);
  const handleChange = (text, field) => {
    if (error) setError(false);
    seconduserInput[field] = text;
    secondsetUserInput(seconduserInput);
  };

  const submit = async () => {
    try {
      // if (userInput['email'] == '') {
      //     setErrorMessage('put an email please !');
      //     setError(true);
      //     throw errorMessage;
      // }
      // console.log(userInput)
      // console.log(res.status);
      // if (res.status == 200) {
      // setMailsent(true);
      // }
      if (seconduserInput['password'] != seconduserInput['password_confirmation']) {
        setErrorMessage('Password are not identical');
        setError(true);
        throw errorMessage;
      }
      const res = await api.send(
        'post',
        '/auth/resetPassword/' + token,
        seconduserInput,
        (auth = false)
      );
      console.log(res);
      if (res.status == 200) {
        navigation.navigate('Connexion');
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
      <Text style={styles.title}>
        {!Mailsent ? 'Email sent !' : 'Perfect ! You can change your password now !'}
      </Text>
      <View style={styles.container}>
        {!Mailsent ? (
          <Text
            style={{ color: 'white', textAlign: 'center', marginBottom: 50, fontWeight: 'bold' }}
          >
            Please open the link inside the mail !
          </Text>
        ) : (
          <>
            <TextInput
              onChangeText={(text) => handleChange(text, 'password')}
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="grey"
              secureTextEntry={true}
              autoComplete="password"
            />
            <TextInput
              onChangeText={(text) => handleChange(text, 'password_confirmation')}
              style={styles.input}
              placeholder="re-enter same password"
              secureTextEntry={true}
              placeholderTextColor="grey"
              autoComplete="password"
            />
            <TouchableOpacity style={styles.updateButtonBoxWithoutBackground} onPress={submit}>
              <Text style={styles.updateButton}>{!Mailsent ? 'Reset password' : 'Change'}</Text>
            </TouchableOpacity>
          </>
        )}
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

export default SendResetPassword;
