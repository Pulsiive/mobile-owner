import React, { useState } from 'react';
import { Image, View, Text, Pressable, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import serviceAccessToken from '../../globals/query/AccessToken';

const Settings = ({ navigation }) => {
  //   const [userInput, setUserInput] = useState({
  //     email: '',
  //     password: ''
  //   });
  //   const [errorMessage, setErrorMessage] = useState('');
  //   const [error, setError] = useState(false);

  //   const handleChange = (text, field) => {
  //     if (error) setError(false);
  //     userInput[field] = text;
  //     setUserInput(userInput);
  //   };

  return (
    <View style={styles.viewTemplate}>
      {/* HEADER */}
      <View style={styles.headWalletInformation}>
        <Pressable style={styles.backButton} onPress={() => navigation.navigate('HomePage')}>
          <Text style={styles.backButtonContent}>{'<'}</Text>
        </Pressable>
        <View style={{ width: '80%' }}>
          <Text style={styles.title}>John Doe</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '22%',
              borderRadius: 20,
              marginLeft: '42%',
              backgroundColor: 'grey'
            }}
          >
            <Icon style={{ marginLeft: '8%' }} name="star" size={15} color="gold" />
            <Text style={styles.rating}>5.00</Text>
          </View>
        </View>
      </View>
      {/* CONTENT */}
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>My account</Text>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.buttonContent}>Profile</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Wallet')}>
          <Text style={styles.buttonContent}>Wallet</Text>
        </Pressable>
        <Text style={styles.sectionTitle}>Other</Text>
        <Pressable style={styles.button} onPress={() => navigation.navigate('LegalMentions')}>
          <Text style={styles.buttonContent}>Legal mentions</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Tutorial')}>
          <Text style={styles.buttonContent}>Tutorial</Text>
        </Pressable>
        <Pressable
          style={styles.disconnectBox}
          onPress={() => {
            serviceAccessToken.remove();
            navigation.navigate('Login');
          }}
        >
          <Text style={{ color: '#DA4450' }}>Disconnect</Text>
        </Pressable>
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
  headWalletInformation: {
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
  title: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 25,
    color: 'white'
  },
  rating: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
    color: 'white'
  },

  //CONTENT
  container: {
    marginTop: '20%',
    height: '90%'
  },
  sectionTitle: {
    color: 'white',
    fontWeight: '200',
    fontSize: 18,
    marginBottom: '3%',
    marginLeft: '3%'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '6%',
    width: '90%',
    marginLeft: '5%',
    marginBottom: '2%',
    borderRadius: 10,
    backgroundColor: '#6EBF34'
  },
  buttonContent: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500'
  },
  disconnectBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '6%',
    width: '90%',
    position: 'absolute',
    bottom: '20%',
    left: '5%',
    borderRadius: 10,
    backgroundColor: '#1B2023'
  }
});

export default Settings;
