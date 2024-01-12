import React, { useState, useEffect } from 'react';
import {
  Image,
  View,
  Text,
  Pressable,
  Button,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon5 from 'react-native-vector-icons/dist/FontAwesome5';
import Dropdown from 'react-native-input-select';
const axios = require('axios');

import serviceAccessToken from '../../globals/query/AccessToken';
import api from '../../globals/query/API';

const ActivityHistory = ({ navigation }) => {
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
  const [filterSelected, setFilterSelected] = useState(1);
  const [stationSelected, setStationSelected] = useState('');
  const [stationData, setStationData] = useState([]);
  const [FilterStationOptionData, setFilterStationOptionData] = useState([]);

  useEffect(() => {
    async function fetchStations() {
      try {
        console.log('fetching stations');
        const res = await api.send('GET', '/api/v1/profile/stations', true);
        console.log('data: ', res.data);
        console.log('length: ', res.data.stations.length);

        if (res.status == 200) {
          const tmpContactList = [];
          const tmpOptionList = [{ name: 'All', code: 0 }];
          for (let i = 0; i < res.data.stations.length; i++) {
            console.log(i);
            console.log(res.data.stations[i]);
            tmpContactList.push({
              valueName: res.data.stations[i].coordinates.id.substring(0, 15),
              voltage: res.data.stations[i].properties.maxPower,
              inputType: res.data.stations[i].properties.plugTypes,
              price: res.data.stations[i].properties.price
            });
            tmpOptionList.push({
              name: res.data.stations[i].coordinates.id.substring(0, 15),
              code: i + 1
            });
          }
          console.log('tmp list: ', tmpContactList);
          console.log('Option: ', tmpOptionList);

          setStationData(tmpContactList);
          setFilterStationOptionData(tmpOptionList);
          //   console.log('Option: ', filterStationOptionData);
        } else {
          throw res;
        }
      } catch (e) {
        const code = e.status;
        alert('Error: Stations could not be fetched', e.message, code);
      }
    }
    fetchStations();
  }, []);

  useEffect(() => {
    async function fetchReservations() {
      try {
        console.log('fetching reservations');
        api.getAccessToken().then((token) => {
          axios
            .request({
              method: 'get',
              maxBodyLength: Infinity,
              url: ' http://ec2-52-15-202-92.us-east-2.compute.amazonaws.com:3000/api/v1/reservation',
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            .then((res) => {
              console.log('reservations data: ', JSON.stringify(res.data));
              const tmpReservationList = [];
              for (let i = 0; i < res.data.length; i++) {
                console.log('index: ', i);
                console.log('data index: ', res.data[i]);
                tmpReservationList.push({
                  station: `Station ${res.data[i].id.slice(0, 5)}`,
                  date: res.data[i].opensAt.slice(0, 10),
                  time: `${res.data[i].opensAt.slice(11, 16)}h`,
                  price: res.data[i].stationProperties.price,
                  address: res.data[i].stationProperties.station.coordinates.address
                });
              }
              console.log('Reservation parsed tmp list: ', tmpReservationList);
              setReservationData(tmpReservationList);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      } catch (e) {
        const code = e.status;
        alert('Error: Reservations could not be fetched', e.message, code);
      }
    }
    fetchReservations();
  }, []);

  return (
    <View style={styles.viewTemplate}>
      {/* HEADER */}
      <View style={styles.headWalletInformation}>
        <View style={{ width: '100%', flexDirection: 'row' }}>
          <Pressable
            style={{ width: '10%', height: '100%' }}
            onPress={() => navigation.navigate('Activity')}
          >
            <Icon
              style={{ marginLeft: '30%', marginTop: '10%' }}
              name="arrow-left"
              size={25}
              color="white"
            />
          </Pressable>
          <Text style={styles.title}>Historique d'activité</Text>

          <View style={{ width: '100%' }}></View>
        </View>
      </View>
      {/* FILTER */}
      <View style={styles.filter}>
        <TouchableWithoutFeedback onPress={() => setFilterSelected(1)}>
          <Text style={filterSelected == 1 ? styles.selectedColor : styles.neutralColor}>
            Filtre station
          </Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setFilterSelected(2)}>
          <View style={{ width: '60%', height: '100%' }}>
            <Dropdown
              placeholder="Select an option..."
              dropdownHelperTextStyle={{ color: 'grey' }}
              options={FilterStationOptionData}
              optionLabel={'name'}
              optionValue={'code'}
              selectedValue={stationSelected}
              onValueChange={(text) => setStationSelected(text)}
              primaryColor={'green'}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {/* CONTENT */}
      <View style={styles.container}>
        {reservationData.map((elem) => (
          <View
            style={{
              flexDirection: 'row',
              height: '10%',
              marginTop: '3%',
              backgroundColor: '#1F1F1F',
              borderColor: 'green',
              borderWidth: 0.5,
              marginHorizontal: 10,
              borderRadius: 15
            }}
          >
            <Pressable
              style={{ height: '100%', width: '100%', flexDirection: 'row' }}
              onPress={() =>
                navigation.navigate('ActivityDetails', {
                  date: elem.date,
                  time: elem.time,
                  address: elem.address
                })
              }
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
            </Pressable>
          </View>
        ))}
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
  },
  filter: {
    flexDirection: 'row',
    width: '90%',
    height: '10%',
    marginLeft: '5%',
    justifyContent: 'space-around'
  },
  selectedColor: {
    color: '#04BF7B',
    fontWeight: '900',
    marginTop: '5%',
    fontSize: 15
  },
  neutralColor: {
    color: 'grey',
    fontWeight: '300'
  }
});

export default ActivityHistory;
