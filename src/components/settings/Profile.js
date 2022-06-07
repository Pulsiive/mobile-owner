import React, { useState, useEffect } from 'react';
import { Pressable, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import api from '../../globals/query/API';

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
  // const [dbInfo, setDbInfo] = useState({});

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const asyncResponse = await api.send('GET', '/api/v1/profile', null, (auth = true));
  //       setDbInfo(asyncResponse.data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  //   fetchData();
  // }, [userInput]);

  const handleChange = (text, field) => {
    if (error) setError(false);
    userInput[field] = text;
    setUserInput(userInput);
  };

  const submit = async () => {
    try {
      console.log(dbInfo);
      navigation.navigate('Settings');
    } catch (e) {
      if (e.response) {
        setErrorMessage('Internal error');
        setError(true);
      }
    }
  };

  return (
    <View style={styles.viewTemplate}>
      {/* HEADER */}
      <View style={styles.headInformation}>
        <Pressable style={styles.backButton} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.backButtonContent}>{'<'}</Text>
        </Pressable>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>First name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleChange(text, 'firstName')}
          placeholder="firstName"
          autoComplete="username"
        >
          John
        </TextInput>
        <Text style={styles.label}>Last name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleChange(text, 'lastName')}
          placeholder="lastName"
          autoComplete="username"
        >
          Doe
        </TextInput>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleChange(text, 'email')}
          placeholder="email"
          autoComplete="username"
        >
          John@Doe.fr
        </TextInput>
        <Text style={styles.label}>Date of birth</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleChange(text, 'dateOfBirth')}
          placeholder="dateOfBirth"
          autoComplete="birthdate-full"
        >
          07/05/01
        </TextInput>
        <Text style={styles.label}>Adress</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleChange(text, 'adress')}
          placeholder="adress"
          autoComplete="username"
        >
          11 baker streets
        </TextInput>
        <Text style={styles.label}>Timezone</Text>
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
          color="#6EBF34"
        />
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

  //HEADER
  headInformation: {
    flexDirection: 'row',
    padding: 10,
    marginTop: '8%',
    width: '100%',
    height: '10%'
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
    width: '10%',
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#6EBF34'
  },
  backButtonContent: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800'
  },

  //CONTENT
  container: {
    padding: 50
  },
  title: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 25,
    color: 'white',
    marginLeft: '30%'
  },
  label: {
    color: 'grey'
  },
  input: {
    borderWidth: 0.3,
    borderRadius: 5,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'white',
    borderColor: 'grey'
  }
});

export default Profile;
