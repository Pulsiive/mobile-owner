import React, { useEffect, useState } from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator, TouchableHighlight
} from 'react-native';
import api from '../../../globals/query/API';
import serviceAccessToken from '../../../globals/query/AccessToken';
import Error from '../../../globals/components/Error';
import Logo2 from './../../../Asset/logo-2.png';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Backend from '../../../globals/query/Backend';

const Login = ({ navigation }) => {
  const [userInput, setUserInput] = useState({
    email: '',
    password: ''
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

  const handleChange = (text, field) => {
    if (error) setError(false);
    userInput[field] = text;
    setUserInput(userInput);
  };

  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      await GoogleSignin.revokeAccess();
    }
  };

  async function GoogleLogin(navigation) {
    try {
      await isSignedIn();
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // Get the users ID token
      const user = await GoogleSignin.signIn();

      const response = await Backend.login(user.idToken);
      console.log(response)
      // console.log(response);

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

  const submit = async () => {
    try {
      console.log('submit login');
      if (userInput.email == '' || userInput.password == '')
        throw { data: 'email or password has not been defined', status: '404' };
      const res = await api.send('POST', '/api/v1/auth/login', userInput, (auth = false));
      // console.log(res);
      if (res.status === 200) {
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
        if (code === 401) {
          setErrorMessage('Incorrect password');
          Error('401: Incorrect password');
        } else if (code === 404) {
          setErrorMessage('User not found');
          Error('404: User not found');
        }
        setError(true);
      } else {
        Error(e, ': Internal error');
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
        <View style={{display: 'flex', alignItems: 'center', width: '100%', marginVertical: 20}}>
          <Text style={{color:'white'}}>Ou</Text>
        </View>
        <TouchableHighlight style={styles.border} onPress={() => GoogleLogin(navigation)}>
          <View>
            <Text style={styles.TextFB}>Se connecter avec Google</Text>
          </View>
        </TouchableHighlight>

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

export default Login;
