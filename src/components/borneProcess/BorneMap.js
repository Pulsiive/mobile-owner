import React, { useState, Component, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  PermissionsAndroid
} from 'react-native';
import Button from 'react-native-button';
import Slider from '@react-native-community/slider';
import RadioGroup from 'react-native-radio-buttons-group';

import MapboxGL from '@rnmapbox/maps';
import GetLocation from 'react-native-get-location';

import Icon from 'react-native-vector-icons/Entypo';

import api from '../../globals/query/API';
import serviceAccessToken from '../../globals/query/AccessToken';
var axios = require('axios');

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
  // Filter DrawerOpener
  const [filterType, setFilterType] = useState(false);
  const [filterPrice, setFilterPrice] = useState(false);
  const [filterRange, setFilterRange] = useState(false);
  // Filter Input Data
  const [filterInputType, setFilterInputType] = useState(0);
  const [filterInputMinPrice, setFilterInputMinPrice] = useState(0);
  const [filterInputMaxPrice, setFilterInputMaxPrice] = useState(500);
  const [filterInputRange, setFilterInputRange] = useState(5000);
  const [filterInputPublic, setFilterInputPublic] = useState(0);
  const [filterPublicName, setFilterPublicName] = useState('Public ');

  const [filterSelect, setFilterSelect] = useState(0);
  const radioButtonsData = [
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: '     TYPE1  ',
      value: 'option1'
    },
    {
      id: '2',
      label: '     TYPE2  ',
      value: 'option2'
    },
    {
      id: '3',
      label: '     TYPE3  ',
      value: 'option2'
    },
    {
      id: '4',
      label: '    CCS       ',
      value: 'option2'
    },
    {
      id: '5',
      label: 'CHADEMO',
      value: 'option2'
    },
    {
      id: '6',
      label: '  GREENUP',
      value: 'option2'
    },
    {
      id: '7',
      label: '      EF         ',
      value: 'option2'
    },
    {
      id: '8',
      label: '     ALL         ',
      value: 'option2'
    }
  ];
  const clear = () => {
    setFilterSelect(0);
    setFilterInputType(0);
    setFilterInputMinPrice(0);
    setFilterInputMaxPrice(500);
    setFilterInputRange(1000);
    setFilterInputPublic('Public ');
    console.log('cleared');
  };

  const submit = async () => {
    try {
      let publicType = filterPublicName;
      if (filterPublicName == 'Public ') publicType = 0;
      else if (filterPublicName == 'Private') publicType = 1;
      else publicType = 2;
      let data = JSON.stringify({
        params: {
          minPrice: filterInputMinPrice,
          maxPrice: filterInputMaxPrice,
          plugTypes: [filterInputType],
          range: filterInputRange,
          type: publicType == 2 ? '' : publicType,
          userLat: userPosition[0],
          userLong: userPosition[1]
        }
      });
      console.log(data);
      var config = {
        method: 'post',
        url: 'http://127.0.0.1:3000/api/v1/stations',
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoiZDUxZjJhYTktMjE5Ni00NzgwLTkwZjAtZWRjZGI1ODkyYjAyIiwiZmlyc3ROYW1lIjoiQ2hyaXMiLCJsYXN0TmFtZSI6IlRlc3QiLCJlbWFpbCI6Im93bmVyQG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkS1g4Uk4wWXZPSXZvYzd4dFFyUmpDLnltZTl5Rlk2UWVxaEpQc0V1L1kvL2p6VTEyRHZ6OWkiLCJkYXRlT2ZCaXJ0aCI6IjIwMDEtMDMtMDJUMDA6MDA6MDAuMDAzWiIsImVtYWlsVmVyaWZpZWRBdCI6bnVsbCwiYmFsYW5jZSI6MCwiaXNGcm9tT0F1dGgiOmZhbHNlfSwiaWF0IjoxNjczNDMwOTYxfQ.6Gpa8yHClcBWUqDPoua_T6uuNyq03eJQVGyIfuT6rTI',
          'Content-Type': 'application/json'
        },
        data: data
      };

      console.log('getting stations');
      const res = await axios(config);
      console.log(JSON.stringify(res.data, null, '\t'));
      var stationsParsed = [];
      console.log(res.data.stations.length);
      for (var index = 0; index < res.data.stations.length; index++) {
        console.log('pushing data');
        if (publicType == 0 && !res.data.stations[index].properties.isPublic) continue;
        stationsParsed.push({
          name: 'Station ' + index,
          Type: res.data.stations[index].properties.plugTypes[0],
          Pricing: res.data.stations[index].properties.price,
          Voltage: res.data.stations[index].properties.maxPower,
          rating: res.data.stations[index].rate,
          location: [
            res.data.stations[index].coordinates.long,
            res.data.stations[index].coordinates.lat
          ]
        });
      }
      console.log(JSON.stringify(stationsParsed, null, '\t'));
      setUserStation(stationsParsed);
      console.log('User station:');
      console.log(userStation);
      if (res.status == 200) {
        console.log('OK');
      } else {
        throw res;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const FiltersComponent = () => {
    const updatePublicFilterName = () => {
      if (filterInputPublic == 0) setFilterPublicName('Public ');
      else if (filterInputPublic == 1) setFilterPublicName('Private');
      else setFilterPublicName('  Both  ');
    };

    const updatePublicFilter = () => {
      if (filterInputPublic >= 2) {
        setFilterInputPublic(0);
        updatePublicFilterName();
        return;
      }
      setFilterInputPublic(filterInputPublic + 1);
      updatePublicFilterName();
    };
    return (
      <View
        style={{
          flexDirection: 'row',
          width: '79%',
          marginLeft: '10%',
          justifyContent: 'space-around'
        }}
      >
        <Button style={styles.filter} onPress={() => setFilterSelect(1)}>
          Type
        </Button>
        <Button style={styles.filter} onPress={() => setFilterSelect(2)}>
          Price
        </Button>
        <Button style={styles.filter} onPress={() => setFilterSelect(3)}>
          Range
        </Button>
        <Button style={styles.filter} onPress={() => updatePublicFilter()}>
          {filterPublicName}
        </Button>
      </View>
    );
  };

  const TypeInput = () => {
    const [radioButtons, setRadioButtons] = useState(radioButtonsData);

    function onPressRadioButton(radioButtonsArray) {
      setRadioButtons(radioButtonsArray);
      for (let i = 0; i < radioButtonsArray.length; i++) {
        console.log(radioButtonsArray[i]);
        if (radioButtonsArray[i].selected) {
          setFilterInputType(i);
          break;
        }
      }
    }

    return (
      <View>
        <RadioGroup radioButtons={radioButtons} onPress={onPressRadioButton} />
      </View>
    );
  };

  const PriceInputSlider = () => {
    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          <Slider
            style={{ marginLeft: '0%', width: '75%', height: 40 }}
            value={filterInputMinPrice}
            onValueChange={(value) => setFilterInputMinPrice(value)}
            minimumValue={0}
            maximumValue={filterInputMaxPrice}
            step={1}
            minimumTrackTintColor="green"
            maximumTrackTintColor="black"
          />
          <Text style={{ marginTop: 10 }}>min :{filterInputMinPrice}eur</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Slider
            style={{ marginLeft: '0%', width: '75%', height: 40 }}
            value={filterInputMaxPrice}
            onValueChange={(value) => setFilterInputMaxPrice(value)}
            minimumValue={filterInputMinPrice}
            maximumValue={500}
            step={1}
            minimumTrackTintColor="green"
            maximumTrackTintColor="black"
          />
          <Text style={{ marginTop: 10 }}>min :{filterInputMaxPrice}eur</Text>
        </View>
      </View>
    );
  };
  const RangeInputSlider = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Slider
          style={{ marginLeft: '0%', width: '80%', height: 40 }}
          value={filterInputRange}
          onValueChange={(value) => setFilterInputRange(value)}
          minimumValue={0}
          maximumValue={5000}
          step={1000}
          minimumTrackTintColor="green"
          maximumTrackTintColor="black"
        />
        <Text style={{ marginTop: 10 }}>{filterInputRange}m</Text>
      </View>
    );
  };

  const FilterInputContainer = () => {
    return (
      <View
        style={
          filterSelect == 1
            ? {
                height: '40%',
                width: '90%',
                position: 'absolute',
                borderColor: 'green',
                borderWidth: 1,
                borderRadius: 5,
                top: '3%',
                left: '5%',
                backgroundColor: 'white',
                flexDirection: 'row'
              }
            : {
                height: '10%',
                width: '90%',
                position: 'absolute',
                borderColor: 'green',
                borderWidth: 1,
                borderRadius: 5,
                top: '3%',
                left: '5%',
                backgroundColor: 'white',
                flexDirection: 'row'
              }
        }
      >
        {filterSelect == 1 ? <TypeInput /> : <></>}
        {filterSelect == 2 ? <PriceInputSlider /> : <></>}
        {filterSelect == 3 ? <RangeInputSlider /> : <></>}
        <Pressable
          style={{ position: 'absolute', left: '90%', top: '10%' }}
          onPress={() => setFilterSelect(0)}
        >
          <Text style={{ color: 'red' }}>X</Text>
        </Pressable>
      </View>
    );
  };

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
          console.log(granted);
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
  }, []);

  return (
    <View style={styles.page}>
      <View>
        <Pressable
          style={
            nightMode
              ? {
                  backgroundColor: 'white',
                  width: '11%',
                  borderRadius: 5,
                  borderColor: 'black',
                  position: 'absolute',
                  left: '1%',
                  bottom: '1%'
                }
              : {
                  backgroundColor: 'black',
                  width: '11%',
                  borderRadius: 5,
                  borderColor: 'white',
                  position: 'absolute',
                  left: '1%',
                  bottom: '1%'
                }
          }
          onPress={setMode}
        >
          <Icon name="moon" size={40} color={nightMode ? 'black' : 'white'} />
        </Pressable>
        <FiltersComponent />
        <View style={{ flexDirection: 'row' }}>
          <Pressable
            style={{
              width: '25%',
              marginLeft: '14.5%',
              backgroundColor: 'grey',
              alignItems: 'center'
            }}
            onPress={clear}
          >
            <Text style={{ color: 'black' }}>Clear</Text>
          </Pressable>
          <Pressable
            style={{
              width: '60%',
              backgroundColor: 'lightblue',
              alignItems: 'center'
            }}
            onPress={submit}
          >
            <Text style={{ color: 'black' }}>Search</Text>
          </Pressable>
        </View>
      </View>
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
                <Icon name="location-pin" size={50} color="green" />
              </View>
            </MapboxGL.PointAnnotation>
          ))}
        </MapboxGL.MapView>
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
      {filterSelect != 0 ? <FilterInputContainer /> : <></>}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1
  },
  container: {
    height: '95%',
    width: '100%'
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
  },
  filter: {
    width: '233%',
    backgroundColor: 'green',
    color: 'white'
  }
});

export default BorneMap;
