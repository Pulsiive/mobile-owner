import React, { useState, useEffect } from 'react';
import { Pressable, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import api from '../../globals/query/API';

const Profile = ({ navigation }) => {
  const [userInput, setUserInput] = useState({
    email: '',
    firstName: 'default',
    lastName: 'default',
    dateOfBirth: '2001-07-15'
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.send('GET', '/api/v1/profile', (auth = true));
        if (res.status == 200) {
          setUserInput({
            email: res.data.email,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            dateOfBirth: res.data.dateOfBirth
          });
        } else {
          throw res;
        }
      } catch (e) {
        const code = e.status;
        alert('Error');
      }
    }
    fetchData();
  }, []);

  const handleChange = (text, field) => {
    userInput[field] = text;
    setUserInput(userInput);
  };

  const submit = async () => {
    try {
      const res = await api.send('PATCH', '/api/v1/profile', userInput, (auth = true));
      if (res.status == 200) navigation.navigate('Settings');
      else throw res;
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
          {userInput.firstName}
        </TextInput>
        <Text style={styles.label}>Last name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleChange(text, 'lastName')}
          placeholder="lastName"
          autoComplete="username"
        >
          {userInput.lastName}
        </TextInput>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleChange(text, 'email')}
          placeholder="email"
          autoComplete="username"
        >
          {userInput.email}
        </TextInput>
        <Text style={styles.label}>Date of birth</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => handleChange(text, 'dateOfBirth')}
          placeholder="dateOfBirth"
          autoComplete="birthdate-full"
        >
          {userInput.dateOfBirth}
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
        <Button title="Save" accessibilityLabel="save" onPress={submit} color="#6EBF34" />
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
