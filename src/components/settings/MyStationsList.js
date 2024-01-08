import React, { Component, useState, useEffect } from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Modal,
  SafeAreaView,
  ScrollView
} from 'react-native';

import Dropdown from 'react-native-input-select';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Entypo';
import api from '../../globals/query/API';

const ModalInformation = ({ setModal, stationData }) => {
  const [userCoordinatesInput, setUserInput] = useState({
    lat: 0,
    long: 0,
    address: '',
    city: '',
    country: '',
    countryCode: 'FR'
  });
  const [userPropertiesInput, setUserPropertiesInput] = useState({
    // name: '',
    plugTypes: [],
    maxPower: '',
    isGreenEnergy: true,
    price: 0,
    hours: {
      day: 7,
      openTime: '00:00',
      closeTime: '00:00'
    }
  });
  const [priceSelected, setpriceSelected] = useState(0);
  const [maxprice, setMaxprice] = useState(20);

  const handleUserCoordinatesInputChange = (text, field) => {
    userCoordinatesInput[field] = text;
    setUserInput(userCoordinatesInput);
  };
  const handleUserPropertiesInputChange = (text, field) => {
    userPropertiesInput[field] = text;
    setUserPropertiesInput(userPropertiesInput);
  };

  return (
    <View style={styles.modal}>
      <View style={{ flexDirection: 'row', marginTop: '2%' }}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: '800', marginLeft: '35%' }}>
          Station Edit
        </Text>
        <Pressable
          onPress={() => {
            setModal(false);
          }}
        >
          <Text style={{ color: 'red', fontSize: 20, marginLeft: '50%' }}>X</Text>
        </Pressable>
      </View>

      <View style={{ height: '80%', width: '100%' }}>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={{ height: '100%', width: '100%' }}>
            <Text style={styles.inputText}>Latitude:</Text>
            <TextInput
              accessibilityLabel="Latitude"
              onChangeText={(text) => handleUserCoordinatesInputChange(text, 'lat')}
              style={styles.inputField}
              placeholder="latitude"
              autoComplete="email"
            />
            <Text style={styles.inputText}>Longitude:</Text>
            <TextInput
              accessibilityLabel="Longitude"
              onChangeText={(text) => handleUserCoordinatesInputChange(text, 'long')}
              style={styles.inputField}
              placeholder="longitude"
              autoComplete="email"
            />
            <Text style={styles.inputText}>Address:</Text>
            <TextInput
              accessibilityLabel="address"
              onChangeText={(text) => handleUserCoordinatesInputChange(text, 'address')}
              style={styles.inputField}
              placeholder="address"
              autoComplete="email"
            />
            <Text style={styles.inputText}>City:</Text>
            <TextInput
              accessibilityLabel="City"
              onChangeText={(text) => handleUserCoordinatesInputChange(text, 'city')}
              style={styles.inputField}
              placeholder="City"
              autoComplete="email"
            />
            <Text style={styles.inputText}>Country:</Text>
            <TextInput
              accessibilityLabel="Country"
              onChangeText={(text) => handleUserCoordinatesInputChange(text, 'country')}
              style={styles.inputField}
              placeholder="Country"
              autoComplete="email"
            />
            <Text style={styles.inputText}>price:</Text>
            <Slider
              style={{ marginLeft: '10%', width: '80%', height: 40 }}
              value={priceSelected}
              onValueChange={(value) => setpriceSelected(value)}
              minimumValue={0}
              maximumValue={maxprice}
              step={1}
              minimumTrackTintColor="white"
              maximumTrackTintColor="green"
            />
            <Text style={{ marginLeft: '72%', color: 'grey', fontSize: 10 }}>
              {priceSelected}€ / 15 min
            </Text>
            <Text style={styles.inputText}>maxPower:</Text>
            <TextInput
              accessibilityLabel="maxPower"
              onChangeText={(text) => handleUserPropertiesInputChange(text, 'maxPower')}
              style={styles.inputField}
              placeholder="maxPower"
              autoComplete="email"
            />
            <Text style={styles.inputText}>Station Plug Types:</Text>
            <View style={{ height: '20%', width: '75%', marginLeft: '12%' }}>
              <Dropdown
                placeholder="Select an option..."
                options={[
                  { name: 'TYPE1', code: 0 },
                  { name: 'TYPE2', code: 1 },
                  { name: 'TYPE3', code: 2 },
                  { name: 'CCS', code: 3 },
                  { name: 'CHADEMO', code: 4 },
                  { name: 'GREENUP', code: 5 },
                  { name: 'EF', code: 6 }
                ]}
                optionLabel={'name'}
                optionValue={'code'}
                selectedValue={userPropertiesInput.input}
                onValueChange={(text) => handleUserPropertiesInputChange(text, 'plugTypes')}
                primaryColor={'green'}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
      <View style={{ flexDirection: 'row', height: '15%' }}>
        {/* Add a margin top when it will be finished */}
        <View style={{ width: '50%' }}>
          <Pressable
            onPress={() => {
              setModal(false);
              console.log('Should send an accept response to backend');
            }}
          >
            <View
              style={{
                width: '90%',
                alignItems: 'center',
                height: '50%',
                marginTop: '10%',
                marginLeft: '5%',
                borderRadius: 15,
                backgroundColor: '#6EBF34'
              }}
            >
              <Text style={{ color: 'black', marginTop: '3%' }}>Sauvegarder</Text>
            </View>
          </Pressable>
        </View>
        <View style={{ width: '50%' }}>
          <Pressable
            onPress={() => {
              setModal(false);
            }}
          >
            <View
              style={{
                width: '90%',
                alignItems: 'center',
                height: '50%',
                marginTop: '10%',
                marginLeft: '5%',
                borderRadius: 15,
                backgroundColor: '#F66565'
              }}
            >
              <Text style={{ color: 'black', marginTop: '3%' }}>Annuler</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const Stations = ({ stationData, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const setModal = (event) => {
    console.log(event);
    setModalVisible(event);
  };
  return (
    <View
      style={{
        backgroundColor: '#494949',
        height: 160,
        width: '95%',
        marginLeft: '2.5%',
        marginTop: '5%',
        borderRadius: 5
      }}
    >
      <View style={{ flexDirection: 'row', height: '100%', width: '100%' }}>
        <Image
          style={{ width: 100, height: 100, position: 'absolute', top: '15%', left: '2%' }}
          source={require('../../images/charging_station.png')}
        />
        <View style={{ marginRight: '-10%' }}>
          <Text style={styles.informationType}>Nom</Text>
          <Text style={styles.informationValue}>{stationData.valueName}</Text>
          <Text style={styles.informationType}>Voltage</Text>
          <Text style={styles.informationValue}>{stationData.voltage}</Text>
          <Text style={styles.informationType}>Prise</Text>
          <Text style={styles.informationValue}>{stationData.inputType}</Text>
          <Text style={styles.informationType}>Prix</Text>
          <Text style={styles.informationValue}>{stationData.price}</Text>
        </View>
        <Pressable style={styles.modifyButton} onPress={() => setModal(true)}>
          <Text style={{ color: 'white' }}>Modifier</Text>
        </Pressable>
      </View>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}
      >
        <ModalInformation setModal={setModal} stationData={stationData} />
      </Modal>
    </View>
  );
};

const MyStations = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [StationData, setStationData] = useState([
    {
      valueName: 'Station 1',
      voltage: '5V',
      inputType: 'IV-1',
      price: '1€'
    },
    { valueName: 'Station 2', voltage: '6V', inputType: 'IV-2', price: '2€' }
  ]);

  const setModal = (event) => {
    console.log(event);
    setModalVisible(event);
  };

  useEffect(() => {
    async function fetchStations() {
      try {
        console.log('fetching stations');
        const res = await api.send('GET', '/api/v1/profile/stations', true);
        console.log('data: ', res.data);
        console.log('length: ', res.data.stations.length);

        if (res.status == 200) {
          const tmpContactList = [];
          for (let i = 0; i < res.data.stations.length; i++) {
            console.log(i);
            console.log(res.data.stations[i]);
            tmpContactList.push({
              valueName: res.data.stations[i].coordinates.id.substring(0, 15),
              voltage: res.data.stations[i].properties.maxPower,
              inputType: res.data.stations[i].properties.plugTypes,
              price: res.data.stations[i].properties.price
            });
          }
          console.log('tmp list: ', tmpContactList);
          setStationData(tmpContactList);
          //          setUserData({ firstName: res.data.firstName, lastName: res.data.lastName });
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

  return (
    <View style={styles.viewTemplate}>
      <View style={{ width: '100%', height: '2%' }} />
      <View style={styles.headWalletInformation}>
        <Pressable style={styles.backButton} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.backButtonContent}>{'<'}</Text>
        </Pressable>
        <Text
          style={{
            color: 'white',
            width: '100%',
            fontSize: 35,
            fontWeight: '700',
            marginLeft: '3%'
          }}
        >
          Mes stations
        </Text>
      </View>
      <View
        style={{
          borderBottomColor: 'white',
          width: '80%',
          height: 1,
          borderWidth: 2,
          marginLeft: '10%'
        }}
      />
      <SafeAreaView style={{ flex: 1, marginTop: '10%' }}>
        <ScrollView style={{ height: '100%', width: '100%' }}>
          {StationData.map((StationData, index) => (
            <Stations stationData={StationData} navigation={navigation} />
          ))}
        </ScrollView>
      </SafeAreaView>
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
  headWalletInformation: {
    flexDirection: 'row',
    padding: 10,
    width: '100%',
    height: '10%',
    // backgroundColor: '#266400',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  container: {
    flex: 1
  },
  scrollView: {
    marginHorizontal: 20
  },
  modal: {
    backgroundColor: '#404040',
    height: '83%',
    width: '85%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: '30%',
    marginLeft: '8%'
  },
  selectedCard: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: '5%',
    backgroundColor: '#CDCDCD'
  },
  nonSelectedCard: {
    flexDirection: 'row',
    marginBottom: '5%',
    backgroundColor: 'white'
  },
  inputText: {
    marginLeft: '13%',
    color: 'white',
    fontSize: 20
  },
  modifyButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15%',
    marginLeft: '2.5%',
    height: '35%',
    width: '25%',
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#6EBF34'
  },
  informationType: {
    color: 'green',
    marginLeft: '47%'
  },
  informationValue: {
    color: 'white',
    marginLeft: '47%'
  },
  inputField: {
    marginLeft: '13%',
    marginTop: '2%',
    marginBottom: '5%',
    width: '74%',
    backgroundColor: 'grey',
    borderRadius: 10
  }
});

export default MyStations;
