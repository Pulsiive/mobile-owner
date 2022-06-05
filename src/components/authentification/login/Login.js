import React, { useState } from 'react';
import { Image, View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import config from '../../../globals/utils/config';

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
      // const userObject = await axios.post(`${config.API_URL}/`, {
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
    <View style={styles.viewTemplate}>
      <Image
        style={styles.topLeftLeaf}
        source={require('../../../images/login_topleft_corner.png')}
      />
      <Text style={styles.title}>Login</Text>
      <View style={styles.container}>
        <TextInput
          onChangeText={(text) => handleChange(text, 'email')}
          style={styles.input}
          placeholder="Email address or phone number"
          autoComplete="email"
        />
        <TextInput
          onChangeText={(text) => handleChange(text, 'password')}
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          autoComplete="password"
        />
        <TouchableOpacity style={styles.loginButtonBoxWithoutBackground} onPress={submit}>
          <Text style={styles.loginButton}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.forgetPasswordButtonBoxWithoutBackground}
          onPress={() => navigation.navigate('ForgetPassword')}
        >
          <Text style={styles.forgetPasswordButton}>Forget password ?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerButtonBoxWithoutBackground}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerButton}>Register</Text>
        </TouchableOpacity>
      </View>
      <Image
        style={styles.bottomRightLeaf}
        source={require('../../../images/login_bottomright_corner.png')}
      />
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
    borderRadius: 10
  },
  // BUTTON BOX
  loginButtonBoxWithoutBackground: {
    backgroundColor: '#6EBF34',
    borderRadius: 10,
    width: '100%'
  },
  forgetPasswordButtonBoxWithoutBackground: {
    width: '40%',
    marginLeft: '30%'
  },
  registerButtonBoxWithoutBackground: {
    width: '30%',
    marginLeft: '35%',
    marginTop: '10%'
  },
  // BUTTON
  loginButton: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '900',
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
  },

  // ERROR
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
