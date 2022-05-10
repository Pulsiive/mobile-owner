import React, { useState } from 'react';
import { Image, View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Profile = ({ navigation }) => {
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
    firstName: 'default',
    lastName: 'default',
    dateOfBirth: '2001-07-15',
    timeZone: 'UTC+2',
    username: '',
    adress: ''
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
      // Waiting for server to be hosted through a public IP
      // const userObject = await axios.post(`${config.API_URL}/api/v1/`, {
      //   userInput
      // });
      // const jwt = userObject.data.data.user.accessToken;
      // await AsyncStorage.setItem('accessToken', jwt);
      navigation.navigate('Settings');
    } catch (e) {
      if (e.response) {
        setErrorMessage('Internal error');
        setError(true);
      }
    }
  };

  return (
    <View>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.container}>
        <Text>First name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleChange(text, 'firstName')}
          placeholder="firstName"
          autoComplete="username"
        >
          John
        </TextInput>
        <Text>Last name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleChange(text, 'lastName')}
          placeholder="lastName"
          autoComplete="username"
        >
          Doe
        </TextInput>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleChange(text, 'email')}
          placeholder="email"
          autoComplete="username"
        >
          John@Doe.fr
        </TextInput>
        <Text>Date of birth</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleChange(text, 'dateOfBirth')}
          placeholder="dateOfBirth"
          autoComplete="birthdate-full"
        >
          07/05/01
        </TextInput>
        <Text>Adress</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleChange(text, 'adress')}
          placeholder="adress"
          autoComplete="username"
        >
          11 baker streets
        </TextInput>
        <Text>Timezone</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleChange(text, 'timeZone')}
          placeholder="timezone"
          autoComplete="username"
        >
          UTC+2
        </TextInput>
        <Button
          title="Save"
          accessibilityLabel="save"
          onPress={() => navigation.navigate('Settings')}
          color="green"
        />
        <Button
          title="Back"
          accessibilityLabel="Profile to your account"
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 50
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
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'black'
  }
});

export default Profile;
