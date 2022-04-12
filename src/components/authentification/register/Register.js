import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Text, Button } from 'react-native';

const Register = ({ navigation }) => {
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
    username: ''
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
      //   const userObject = await axios.post(`${config.API_URL}/api/auth/register`, {
      //     ...userInput
      //   });
      //   const jwt = userObject.data.data.user.accessToken;
      //   await AsyncStorage.setItem('accessToken', jwt);
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
    <View style={styles.container}>
      <Text style={styles.title}>Welcome !</Text>
      <Text style={styles.title}>Create your account</Text>
      <TextInput
        onChangeText={(text) => handleChange(text, 'email')}
        style={styles.input}
        placeholder="Email address"
        autoComplete="email"
      />
      <TextInput
        onChangeText={(text) => handleChange(text, 'username')}
        style={styles.input}
        placeholder="Username"
        autoComplete="username"
      />
      <TextInput
        onChangeText={(text) => handleChange(text, 'password')}
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        autoComplete="password"
      />
      <Button
        style={styles.loginButton}
        title="Register"
        accessibilityLabel="Create a new account"
        onPress={submit}
      />
      <View style={{ marginTop: 20 }}>
        <Button
          title="I have an account"
          accessibilityLabel="Click here if you already have an account"
          onPress={() => navigation.navigate('Login')}
          color="grey"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40
  },
  input: {
    borderWidth: 0.2,
    marginBottom: 20
  },
  title: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 30,
    color: 'black',
    marginBottom: 50,
    marginTop: 30
  },
  loginButton: {
    borderRadius: 40
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
