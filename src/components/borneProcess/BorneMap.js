import React, { useState, Component, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  Modal,
  Pressable,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  PermissionsAndroid
} from 'react-native';

import MapboxGL from '@rnmapbox/maps';
import GetLocation from 'react-native-get-location';

import Icon from 'react-native-vector-icons/Entypo';

MapboxGL.setAccessToken(
  'pk.eyJ1Ijoic2h5bGsiLCJhIjoiY2w0cmhncHdwMDZydTNjcDhkbTVmZm8xZCJ9.uxYLeAuZdY5VMx4EUBaw_A'
);
MapboxGL.setConnected(true);
//PRIVATE KEY 'sk.eyJ1Ijoic2h5bGsiLCJhIjoiY2w0cmw2NXlmMDNlcDNsbGE0eDdmNm00MCJ9.KvkuZqGpipafXs5wfEdDLQ'

//MapBox Installation
// Official documentation https://github.com/rnmapbox/maps
// TOKEN DEPENDENCIES https://docs.mapbox.com/android/maps/guides/install/
// the credentials parts of mapbox has to be set in the android/build.gradle not in settings.gradle

const UserComment = (props) => {
  return (
    <View style={{ flexDirection: 'row', marginTop: '5%', height: '12%' }}>
      <Icon style={styles.userProfile} name="user" size={30} color="white" />
      <View style={{ marginLeft: '3%', marginTop: '1%' }}>
        <Text style={styles.userTransaction}>M.XXXX</Text>
        <Text style={{ color: '#686868' }}>{props.message}</Text>
      </View>
    </View>
  );
};

const BorneMap = () => {
  const [userPosition, setUserPosition] = useState([48.856614, 2.3522219]);
  const [userStation, setUserStation] = useState([
    {
      name: 'Station 1',
      Type: 'T2-EF',
      Pricing: 0.9,
      Voltage: 7,
      rating: 3,
      location: [2.362778, 48.81559]
    },
    {
      name: 'Station 2',
      Type: 'T2-EF',
      Pricing: 1.2,
      Voltage: 9,
      rating: 4,
      location: [2.372194, 48.811244]
    }
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});

  const [nightMode, setNightMode] = useState(false);

  const setMode = () => {
    setNightMode(!nightMode);
  };

  const setModal = (event) => {
    console.log(event);
    setModalVisible(true);
    setModalData({ name: event.properties.id, location: event.geometry.coordinates });
  };

  //Request permission when BorneMap component is initialized
  useEffect(() => {
    try {
      PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
        ],
        {
          title: 'Give Location Permission',
          message: 'App needs location permission to find your position.'
        }
      )
        .then(async (granted) => {
          // console.log(granted);
          GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000
          })
            .then((location) => {
              setUserPosition([location.latitude, location.longitude]);
            })
            .catch((error) => {
              const { code, message } = error;
              console.warn(code, message);
            });
        })
        .catch((err) => {
          console.warn(err);
        });
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView
          style={styles.map}
          styleURL={
            nightMode ? 'mapbox://styles/mapbox/dark-v9' : 'mapbox://styles/mapbox/light-v9'
          }
          zoomLevel={16}
          center={[userPosition]}
        >
          <MapboxGL.Camera
            zoomLevel={13}
            centerCoordinate={[userPosition[1], userPosition[0]]}
            animationMode={'flyTo'}
            animationDuration={3}
          ></MapboxGL.Camera>
          <MapboxGL.UserLocation visible={true} />
          {userStation.map((charger, index) => (
            <MapboxGL.PointAnnotation
              id={charger.name}
              coordinate={charger.location}
              onSelected={setModal}
            >
              <View>
                <Icon name="location-pin" size={24} color="green" />
              </View>
            </MapboxGL.PointAnnotation>
          ))}
        </MapboxGL.MapView>
        <Pressable
          style={
            nightMode
              ? { backgroundColor: 'white', width: '11%', borderRadius: 15, borderColor: 'black' }
              : { backgroundColor: 'black', width: '11%', borderRadius: 15, borderColor: 'white' }
          }
          onPress={setMode}
        >
          <Icon name="moon" size={40} color={nightMode ? 'black' : 'white'} />
        </Pressable>
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}
        >
          <View style={styles.modal}>
            <View>
              {/* HEADER */}
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: '5%' }}
              >
                <Icon name="lock" size={30} color="green" />
                <Text style={{ fontSize: 20, fontWeight: '800' }}>{modalData.name}</Text>
                <Pressable
                  onPress={() => {
                    setModalVisible(false);
                  }}
                >
                  <Text style={{ color: 'red', fontSize: 20 }}>X</Text>
                </Pressable>
              </View>
              <Text style={{ marginTop: '10%', marginLeft: '5%', fontSize: 20, fontWeight: '400' }}>
                {modalData.location}
              </Text>

              {/* STATION PROPERTY */}
              <View style={{ flexDirection: 'row', marginTop: '15%', marginLeft: '5%' }}>
                <Icon name="flickr-with-circle" size={30} color="grey" />
                <Text style={{ marginLeft: '8%', marginTop: '1%' }}>T2-EF</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: '8%', marginLeft: '5%' }}>
                <Icon name="credit" size={30} color="grey" />
                <Text style={{ marginLeft: '8%', marginTop: '1%' }}>0.90€/15min</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: '8%', marginLeft: '5%' }}>
                <Icon name="battery" size={30} color="grey" />
                <Text style={{ marginLeft: '8%', marginTop: '1%' }}>7kWh</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: '8%', marginLeft: '5%' }}>
                <Icon name="time-slot" size={30} color="grey" />
                <Text style={{ marginLeft: '8%', marginTop: '1%' }}>7/7-24/24</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: '8%', marginLeft: '5%' }}>
                <Icon name="star" size={30} color="grey" />
                <Text style={{ marginLeft: '8%', marginTop: '1%' }}>4/5</Text>
              </View>
            </View>
            <View>
              <SafeAreaView style={{ height: '60%', padding: '5%' }}>
                <ScrollView style={{}}>
                  <View>
                    <UserComment message={'This station does not work !'} />
                    <UserComment message={'Nice station !'} />
                    <UserComment message={'The owner is nice'} />
                    <UserComment message={'The charger is in a very good shape !'} />
                    <UserComment message={'Cheap, fast and good location'} />
                    <UserComment message={'Will reuse !'} />
                  </View>
                </ScrollView>
              </SafeAreaView>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1
  },
  container: {
    height: '100%',
    width: '100%',
    flex: 1
  },
  markerContainer: {
    alignItems: 'center',
    width: 60,
    backgroundColor: 'transparent',
    height: 70
  },
  map: {
    flex: 1
  },
  textContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    paddingHorizontal: 5,
    flex: 1
  },
  icon: {
    paddingTop: 10
  },
  buttonClose: {
    width: '80%',
    marginLeft: '10%'
  },
  modal: {
    backgroundColor: 'white',
    height: '90%',
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: '10%',
    marginLeft: '12%'
  },
  transaction: {
    width: '100%',
    height: '100%'
  },
  userProfile: {
    backgroundColor: 'black',
    borderRadius: 50,
    marginTop: '5%',
    marginBottom: '2%'
  },
  userTransaction: {
    color: 'black',
    fontWeight: '400',
    fontSize: 18
  },
  amount: {
    position: 'absolute',
    right: '3%',
    top: '30%',
    color: 'white',
    fontWeight: '500',
    fontSize: 17
  }
});

export default BorneMap;
