import React, { useState, useEffect } from 'react';
import { Image, View, Text, Pressable, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import serviceAccessToken from '../../globals/query/AccessToken';
import api from '../../globals/query/API';

const Settings = ({ navigation }) => {
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe'
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.send('GET', '/api/v1/profile', (auth = true));
        if (res.status == 200) {
          setUserData({ firstName: res.data.firstName, lastName: res.data.lastName });
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

  return (
    <View style={styles.viewTemplate}>
      {/* HEADER */}
      <View style={styles.headWalletInformation}>
        <View style={{ width: '100%' }}>
          <Text style={styles.title}>
            {userData.firstName} {userData.lastName}
          </Text>
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
        <Pressable style={styles.button} onPress={() => navigation.navigate('ChangePassword')}>
          <Text style={styles.buttonContent}>Change Password</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Wallet')}>
          <Text style={styles.buttonContent}>Wallet</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('PastReservations')}>
          <Text style={styles.buttonContent}>Past Reservations</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('ContactList')}>
          <Text style={styles.buttonContent}>Contact List</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('NotificationManagement')}
        >
          <Text style={styles.buttonContent}>Notifications</Text>
        </Pressable>

        <Text style={styles.sectionTitle}>My Station</Text>
        <Pressable style={styles.button} onPress={() => navigation.navigate('RegisterStation')}>
          <Text style={styles.buttonContent}>Register station</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('StationList')}>
          <Text style={styles.buttonContent}>My station list</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Reservations')}>
          <Text style={styles.buttonContent}>Reservations</Text>
        </Pressable>

        {/* <Text style={styles.sectionTitle}>Other</Text>
        <Pressable style={styles.button} onPress={() => navigation.navigate('LegalMentions')}>
          <Text style={styles.buttonContent}>Legal mentions</Text>
        </Pressable> */}
        {/* <Pressable style={styles.button} onPress={() => navigation.navigate('Tutorial')}>
          <Text style={styles.buttonContent}>Tutorial</Text>
        </Pressable> */}
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
    marginTop: '3%',
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
    bottom: '17%',
    left: '5%',
    borderRadius: 10,
    backgroundColor: '#1B2023'
  }
});

export default Settings;
