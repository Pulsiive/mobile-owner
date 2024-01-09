import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import TextTitle from '../../globals/components/TextTitle';
import FloatingCard from '../../globals/components/FloatingCard';
import { useFocusEffect } from '@react-navigation/native';

import Logo from '../../Asset/logo.png';

import Icon from 'react-native-vector-icons/Entypo';
import { default as FontAwesomeIcon } from 'react-native-vector-icons/FontAwesome5';
import api from '../../globals/query/API';
// import MapboxGL from '@rnmapbox/maps';
import Carousel from 'react-native-snap-carousel';

import PlanningPNG from './Asset/Planning.png';
import serviceStation from '../../globals/service/StationService';

// MapboxGL.setAccessToken(
//   'pk.eyJ1Ijoic2h5bGsiLCJhIjoiY2w0cmhncHdwMDZydTNjcDhkbTVmZm8xZCJ9.uxYLeAuZdY5VMx4EUBaw_A'
// );
// MapboxGL.setConnected(true);

const ProfileHeaderComponent = () => {
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
        alert({ code } + 'Error User Profile could not get fetch');
      }
    }
    fetchData();
  }, []);

  return (
    <View style={styles.profileHeader}>
      <View style={{ flexDirection: 'row' }}>
        <Icon style={styles.userProfile} name="user" size={50} color="white" />
        <View style={{ height: '100%', marginTop: '5%', marginLeft: '5%' }}>
          <Text style={{ color: 'lightgrey' }}>
            {userData.firstName} {userData.lastName}
          </Text>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>120$</Text>
        </View>
        <View style={{ flexDirection: 'row', position: 'absolute', right: '5%', top: '30%' }}>
          <Icon name="star" size={30} color="yellow" />
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>4.32</Text>
        </View>
      </View>
    </View>
  );
};

const PlanningSectionComponent = ({ navigation }) => {
  return (
    <View style={styles.planningSection}>
      <Text
        style={{
          color: 'white',
          marginLeft: '3%',
          marginTop: '2%',
          fontSize: 20,
          fontWeight: '700'
        }}
      >
        Planning
      </Text>
      <Pressable onPress={() => navigation.navigate('Planning')}>
        <View
          style={{
            width: '90%',
            height: '70%',
            marginLeft: '5%',
            marginTop: '2%',
            borderRadius: 15,
            backgroundColor: 'green'
          }}
        >
          <Image
            source={PlanningPNG}
            style={{
              borderRadius: 15,
              height: '100%',
              width: '100%',
              resizeMode: 'cover'
            }}
          />
        </View>
      </Pressable>
    </View>
  );
};

const DashboardSection = ({ navigation }) => {
  const [reservations, setReservations] = useState(null);
  const [stationData, setStationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const showErrorMessage = (message) => {
    showMessage({
      message: message,
      type: 'danger'
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      api.send('GET', '/api/v1/owner/reservations/requests').then((res) => {
        if (res.status !== 200) {
          showErrorMessage('Failed to fetch reservations requests');
        } else {
          setReservations(
            res.data.filter((res) => {
              const today = new Date();
              const slotStartsAt = new Date(res.slot.opensAt);
              return today.getTime() < slotStartsAt.getTime(); // get incoming date only
            })
          );
        }
        setIsLoading(false);
      });
    }, [])
  );

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
              price: res.data.stations[i].properties.price,
              station: res.data.stations[i].coordinates.id.substring(0, 15),
              recette: i === 0 ? '150$' : '15$',
              isUsed: i === 0 ? true : false
            });
          }
          console.log('tmp list: ', tmpContactList);
          console.log('Option: ', tmpOptionList);

          setStationData(tmpContactList);
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

  const renderItem = ({ item, station }) => {
    console.log('', item);
    return (
      <View style={{ height: '90%', marginTop: '5%', marginLeft: 20 }}>
        <View style={{ height: '30%', width: '70%', marginLeft: '12%', backgroundColor: 'white' }}>
          <Image
            style={{ width: '100%', height: '100%' }}
            source={{
              uri: 'https://mobilygreen.fr/wp-content/uploads/2018/10/borne-recharge-electrique.jpg'
            }}
          />
        </View>
        <Text style={{ color: 'white', marginLeft: '27%', marginTop: '10%', fontSize: 20 }}>
          {item.station}
        </Text>
        <Text style={{ color: 'white', marginLeft: '5%', marginTop: '10%', fontSize: 20 }}>
          Recettes:
        </Text>
        <Text style={{ color: 'white', marginLeft: '5%', marginTop: '5%', fontSize: 30 }}>
          {item.recette}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: 'white', marginLeft: '5%', marginTop: '5%', fontSize: 20 }}>
            En cours d'utilisation:
          </Text>
          <View
            style={{
              backgroundColor: item.isUsed ? 'green' : 'red',
              height: 25,
              width: 25,
              marginTop: '5%',
              marginLeft: '5%',
              borderRadius: 100
            }}
          />
        </View>
        <View>
          <View
            style={{
              width: '90%',
              height: '15%',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: 'grey',
              marginTop: '5%'
            }}
          >
            <Pressable onPress={() => navigation.navigate('Planning')}>
              <Text style={{ color: 'white', marginLeft: '15%', marginTop: '0%', fontSize: 20 }}>
                reservations a venir
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              width: '90%',
              height: '25%',
              backgroundColor: 'green',
              borderRadius: 12,
              marginTop: '5%'
            }}
          >
            <Pressable onPress={() => navigation.navigate('ReservationRequests')}>
              <Text style={{ color: 'white', marginLeft: '15%', marginTop: '5%', fontSize: 20 }}>
                {reservations ? reservations.length : 0} reservations en attente
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        height: '70%',
        width: '90%',
        marginLeft: '5%',
        marginTop: '10%',
        marginVertical: '2%',
        backgroundColor: '#1F1F1F',
        borderRadius: 20,
        borderWidth: 3,
        borderColor: 'green'
      }}
    >
      <Carousel
        data={stationData}
        renderItem={renderItem}
        sliderWidth={380}
        itemWidth={380}
        layout="default"
      />
    </View>
  );
};

const OtherSectionComponent = ({ navigation }) => {
  return (
    <View style={styles.otherSection}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Pressable
          style={styles.easyAccessButton}
          onPress={() => navigation.navigate('ReservationRequests')}
        >
          <FontAwesomeIcon name="clipboard-list" color="white" size={30} />
          <Text style={styles.easyAccessButtonText}>Mes demandes</Text>
        </Pressable>
        <Pressable
          style={styles.easyAccessButton}
          onPress={() => navigation.navigate('StationList')}
        >
          <FontAwesomeIcon name="charging-station" color="white" size={30} />
          <Text style={styles.easyAccessButtonText}>Mes stations</Text>
        </Pressable>
        <Pressable
          style={styles.easyAccessButton}
          onPress={() => navigation.navigate('RegisterStation')}
        >
          <FontAwesomeIcon name="plus" color="white" size={30} />
          <Text style={styles.easyAccessButtonText}>Nouvelle station</Text>
        </Pressable>
      </View>
    </View>
  );
};

const CreateStationCard = ({ navigation }) => {
  return (
    <View style={styles.mapSection}>
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
                Rentabilisez votre borne et contribuez a l'ecologie en louant votre borne dans le
                réseau Pulsive !
              </Text>
            </View>
            <Image source={Logo} style={{ width: '40%', height: '100%' }} resizeMode="contain" />
          </View>
        </FloatingCard>
      </Pressable>
    </View>
  );
};

const HomePage = ({ navigation }) => {
  const [userStations, setUserStations] = useState([]);

  useEffect(() => {
    async function fetchStation() {
      const stations = await serviceStation.getAllStation();

      setUserStations(stations.stations);
    }

    fetchStation();
    console.log(userStations);
    console.log('userLength', userStations.length);
  }, []);

  console.log(userStations);
  console.log('UserLength', userStations.length);

  return (
    <View style={{ height: '100%', width: '100%', backgroundColor: 'black' }}>
      <ProfileHeaderComponent />
      {userStations && userStations.length == 0 ? (
        <CreateStationCard navigation={navigation} />
      ) : (
        <DashboardSection navigation={navigation} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  easyAccessButton: {
    width: '30%',
    borderRadius: 15,
    backgroundColor: '#47821a',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10
  },
  easyAccessButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 3
  },
  profileHeader: {
    height: '10%',
    width: '90%',
    marginTop: '5%',
    marginLeft: '5%',
    backgroundColor: '#1F1F1F',
    borderRadius: 10
  },
  userProfile: {
    marginTop: '3.5%',
    marginLeft: '3%'
  },
  filter: {
    flexDirection: 'row',
    width: '90%',
    height: '10%',
    marginTop: '5%',
    marginLeft: '5%',
    justifyContent: 'space-around'
  },
  selectedColor: {
    color: 'green',
    fontWeight: '900',
    backgroundColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 2
  },
  neutralColor: {
    color: 'grey',
    fontWeight: '300'
  },
  planningSection: {
    height: '20%',
    width: '100%',
    marginTop: '5%',
    backgroundColor: '#1F1F1F',
    borderRadius: 10
  },

  mapSection: {
    height: '40%',
    width: '100%',
    marginTop: '2%',
    backgroundColor: '#1F1F1F',
    borderRadius: 10
  },

  otherSection: {
    height: '27%',
    width: '100%',
    marginTop: '2%',
    backgroundColor: '#1F1F1F',
    borderRadius: 10
  },

  AccesRapideOtherSection: {
    height: '100%',
    width: '25%',
    marginLeft: '6.5%',
    backgroundColor: 'green',
    borderRadius: 10
  },
  AccesRapideImage: {
    borderRadius: 15,
    height: '100%',
    width: '100%',
    resizeMode: 'cover'
  }
});

export default HomePage;
