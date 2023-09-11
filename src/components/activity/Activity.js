import React, { useState, useEffect } from 'react';
import { Image, View, Text, Pressable, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon5 from 'react-native-vector-icons/dist/FontAwesome5';

import serviceAccessToken from '../../globals/query/AccessToken';
import api from '../../globals/query/API';

const Activity = ({ navigation }) => {
  const [reservationData, setReservationData] = useState([
    {
      station: 'Station 2',
      date: '29 May 2023',
      time: '20:41',
      price: '8.89',
      address: '11 rue Beethoven, 94400 Vitry sur seine'
    },
    {
      station: 'Station 1',
      date: '01 June 2023',
      time: '21:30',
      price: '7.50',
      address: '84 Boulevard Massena, 75013 Paris'
    }
  ]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const res = await api.send('GET', '/api/v1/profile', (auth = true));
  //       if (res.status == 200) {
  //         setUserData({ firstName: res.data.firstName, lastName: res.data.lastName });
  //       } else {
  //         throw res;
  //       }
  //     } catch (e) {
  //       const code = e.status;
  //       alert('Error');
  //     }
  //   }
  //   fetchData();
  // }, []);

  return (
    <View style={styles.viewTemplate}>
      {/* HEADER */}
      <View style={styles.headWalletInformation}>
        <View style={{ width: '100%', flexDirection: 'row' }}>
          <Text style={styles.title}>Activity</Text>

          <View style={{ width: '100%' }}>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: '60%',
                width: '23%',
                borderRadius: 30,
                marginLeft: '42%',
                backgroundColor: 'grey'
              }}
              onPress={() => navigation.navigate('ActivityHistory')}
            >
              <Icon style={{ marginLeft: '8%' }} name="clock-o" size={25} color="black" />
              <Text style={styles.rating}> History</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <Text
        style={{
          color: 'white',
          fontWeight: '400',
          fontSize: 18,
          marginBottom: '5%',
          marginLeft: '6%'
        }}
      >
        {' '}
        Recent
      </Text>
      {/* CONTENT */}
      <View style={styles.container}>
        {reservationData.map((elem) => (
          <Pressable
            style={{ height: '12%', width: '100%' }}
            onPress={() =>
              navigation.navigate('ActivityDetails', {
                date: elem.date,
                time: elem.time,
                address: elem.address
              })
            }
          >
            <View
              style={{
                flexDirection: 'row',
                height: '100%',
                backgroundColor: '#0f0f0f',
                borderRadius: 15,
                marginTop: '2%'
              }}
            >
              {/* ROW1 */}
              <View style={{ width: '15%', height: '100%', marginTop: '1%' }}>
                <Icon5
                  style={{ marginLeft: '25%', marginTop: '25%' }}
                  name="charging-station"
                  size={35}
                  color="lightgreen"
                />
              </View>
              {/* ROW2 */}
              <View style={{ width: '70%', height: '100%', marginTop: '3%' }}>
                <Text style={{ color: 'white', fontWeight: '300', fontSize: 18 }}>
                  {elem.station}
                </Text>
                <Text style={{ color: 'grey', fontSize: 12 }}>
                  {elem.date}, {elem.time}
                </Text>
              </View>
              {/* ROW3 */}
              <View style={{ height: '100%', marginTop: '3%' }}>
                <Text style={{ color: 'white', fontWeight: '300', fontSize: 18 }}>
                  {elem.price}€
                </Text>
              </View>
            </View>
          </Pressable>
        ))}

        <View style={{ width: '100%' }}>
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: '20%',
              width: '30%',
              borderRadius: 30,
              marginLeft: '35%',
              marginTop: '10%'
            }}
            onPress={() => navigation.navigate('ActivityHistory')}
          >
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '600',
                fontSize: 14,
                color: 'blue',
                marginLeft: '5%'
              }}
            >
              View History
            </Text>
            <View
              style={{
                marginLeft: '5%',
                backgroundColor: 'blue',
                height: 20,
                width: 20,
                borderRadius: 30
              }}
            >
              <Icon
                style={{ marginLeft: '30%', marginTop: '25%' }}
                name="arrow-right"
                size={10}
                color="white"
              />
            </View>
          </Pressable>
        </View>
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
    marginTop: '5%',
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
    marginLeft: '5%',
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
    marginLeft: '7%'
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

export default Activity;
