import React, { useState, useEffect } from 'react';
import { Image, View, Text, Pressable, Button, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import serviceAccessToken from '../../globals/query/AccessToken';
import api from '../../globals/query/API';
import ButtonTouchable from '../../globals/components/ButtonTouchable';
import FloatingCard from '../../globals/components/FloatingCard';
import TextTitle from '../../globals/components/TextTitle';
import Logo from '../../Asset/logo.png';
import * as Animatable from 'react-native-animatable';

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
          <Text style={styles.title}>Paramètres</Text>
        </View>
      </View>
      {/* CONTENT */}
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 0.8 }}>
          <View style={{ height: 100, width: '90%', marginLeft: '5%' }}>
            <ButtonTouchable
              title={
                userData && userData.firstName && userData.lastName
                  ? userData.firstName + ' ' + userData.lastName
                  : 'Accéder au profil'
              }
              subtext="Accéder aux informations du profil"
              image={[Logo, 50]}
              onPress={() => navigation.navigate('Profile')}
            />
          </View>
          <Pressable style={{ height: 250 }} onPress={() => navigation.navigate('RegisterStation')}>
            <FloatingCard>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                  <TextTitle
                    title="Louez votre borne"
                    style={{
                      marginVertical: 0,
                      marginHorizontal: 10,
                      fontSize: 20
                    }}
                  />
                  <Text style={{ color: 'grey', marginHorizontal: 10, marginTop: 10 }}>
                    Rentabilisez votre borne et contribuez a l'ecologie en louant votre borne dans
                    le réseau Pulsive !
                  </Text>
                </View>
                <Animatable.Image animation="pulse" easing="ease-out" iterationCount="infinite"
                  source={Logo}
                  style={{ width: '40%', height: '100%' }}
                  resizeMode="contain"
                />
              </View>
            </FloatingCard>
          </Pressable>

          {/* <View style={styles.container}> */}
          <View style={{ width: '90%', marginLeft: '5%' }}>
            <Text style={styles.sectionTitle}>Mon compte</Text>
            <ButtonTouchable
              title="Mot de passe"
              icon="fingerprint"
              onPress={() => {
                navigation.navigate('ChangePassword');
              }}
            />
            <ButtonTouchable
              title="Portefeuille"
              icon="wallet"
              onPress={() => {
                navigation.navigate('Wallet');
              }}
            />
            <ButtonTouchable
              title="Anciennes reservations"
              icon="fingerprint"
              onPress={() => {
                navigation.navigate('PastReservations');
              }}
            />
            <ButtonTouchable
              title="Liste de contact"
              icon="users"
              onPress={() => {
                navigation.navigate('ContactList');
              }}
            />
            <ButtonTouchable
              title="Notifications"
              icon="bell"
              onPress={() => {
                navigation.navigate('NotificationManagement');
              }}
            />
            <ButtonTouchable
              title="Fonctionnement"
              icon="help"
              onPress={() => {
                navigation.navigate('Fonctionnement');
              }}
            />
            <ButtonTouchable
              title="Confidentialité"
              icon="lock"
              onPress={() => {
                navigation.navigate('Confidentiality');
              }}
            />
            <Text style={styles.sectionTitle}>Mes Stations</Text>
            <ButtonTouchable
              title="Liste des stations"
              icon="battery"
              onPress={() => {
                navigation.navigate('StationList');
              }}
            />
            <ButtonTouchable
              title="Reservations"
              icon="calendar"
              onPress={() => {
                navigation.navigate('Reservations');
              }}
            />
            <View style={{ marginVertical: 5 }}></View>
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

          {/* </View> */}
          <View style={{ marginVertical: 50 }}></View>
        </ScrollView>
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
    marginLeft: '5%',
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
    height: 30,
    color: 'white',
    fontWeight: '200',
    fontSize: 18,
    marginBottom: '3%',
    marginLeft: '3%',
    marginTop: 30
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: '90%',
    marginLeft: '5%',
    marginBottom: '2%',
    borderRadius: 10,
    backgroundColor: '#6EBF34'
  },
  buttonContent: {
    height: 30,
    color: 'white',
    fontSize: 15,
    fontWeight: '500'
  },
  disconnectBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: '90%',
    left: '5%',
    borderRadius: 10,
    backgroundColor: '#1B2023'
  }
});

export default Settings;
