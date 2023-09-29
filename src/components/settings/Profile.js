import React, { useState, useEffect } from 'react';
import {
  Pressable,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import api from '../../globals/query/API';
import FloatingCard from '../../globals/components/FloatingCard';
import TextTitle from '../../globals/components/TextTitle';

const Profile = ({ navigation }) => {
  const [userInput, setUserInput] = useState({
    email: '',
    firstName: 'John',
    lastName: 'Doe',
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
        <Text style={styles.title}>Profil</Text>
      </View>
      <ScrollView>
        <FloatingCard>
          <View style={styles.profilePicture}>
            {userInput.firstName && (
              <Image
                style={{ width: 100, height: 100, borderRadius: 70 }}
                source={{
                  uri: `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png`
                }}
              />
            )}
          </View>
          <TextTitle
            title={userInput.firstName + ' ' + userInput.lastName}
            style={{ marginBottom: 0, marginTop: 5 }}
          />
          <Text style={{ color: 'grey' }}>Owner</Text>
        </FloatingCard>
        <View style={styles.container}>
          <Text style={styles.label}>Prenom</Text>
          <View>
            <Icon name={'user'} size={24} color={'grey'} />
            <TextInput
              style={styles.input}
              onChangeText={(text) => handleChange(text, 'firstName')}
              placeholder="firstName"
              autoComplete="username"
            >
              {userInput.firstName}
            </TextInput>
          </View>
          <Text style={styles.label}>Nom</Text>
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
            keyboardType="email-address"
            onChangeText={(text) => handleChange(text, 'email')}
            placeholder="email"
            autoComplete="username"
          >
            {userInput.email}
          </TextInput>
          <Text style={styles.label}>Date de naissance</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleChange(text, 'dateOfBirth')}
            placeholder="dateOfBirth"
            autoComplete="birthdate-full"
          >
            {userInput.dateOfBirth}
          </TextInput>
          <Text style={styles.label}>Adresse</Text>
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
          <Pressable style={styles.saveBox} onPress={submit}>
            <Text style={{ color: 'white' }}>Enregistrer</Text>
          </Pressable>
        </View>
      </ScrollView>
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
    marginLeft: '5%'
  },
  label: {
    color: 'grey',
    marginBottom: 10
  },
  input: {
    borderWidth: 0.3,
    borderRadius: 5,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'white',
    borderColor: 'grey'
  },
  saveBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: '90%',
    left: '5%',
    top: 1,
    borderRadius: 10,
    backgroundColor: '#6EBF34'
  }
});

export default Profile;
