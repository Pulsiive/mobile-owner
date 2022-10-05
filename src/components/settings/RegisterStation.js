import React, { Component, useState } from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from 'react-native';

import Dropdown from 'react-native-input-select';
import Slider from '@react-native-community/slider';

import api from '../../globals/query/API';
import serviceAccessToken from '../../globals/query/AccessToken';

const RegisterStation = ({ navigation }) => {
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

  const toggleSwitch = () => setIsSwitchEnabled((previousState) => !previousState);

  const handleChange = (text) => {
    setpriceInput(text);
    console.log(priceInput);
  };
  const handleUserCoordinatesInputChange = (text, field) => {
    userCoordinatesInput[field] = text;
    setUserInput(userCoordinatesInput);
  };
  const handleUserPropertiesInputChange = (text, field) => {
    userPropertiesInput[field] = text;
    setUserPropertiesInput(userPropertiesInput);
  };

  const submit = async () => {
    try {
      const data = {
        station: {
          coordinates: userCoordinatesInput,
          properties: userPropertiesInput
        }
      };
      console.log('submit request');
      console.log(data);
      console.log('sending request');
      const res = await api.send('post', '/api/v1/profile/station', data, (auth = true));
      console.log(res);
      if (res.status == 200) {
        navigation.navigate('Settings');
      } else {
        throw res;
      }
    } catch (e) {
      console.log(e);
    }
  };

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
          Register new station
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
      <View
        style={{
          marginTop: '10%',
          marginLeft: '5%',
          backgroundColor: 'green',
          width: '90%',
          height: '5%',
          borderTopLeftRadius: 200,
          borderTopRightRadius: 200
        }}
      >
        <View
          style={{
            width: '60%',
            alignItems: 'center',
            marginTop: '2%',
            marginLeft: '20%',
            borderRadius: 15
          }}
        >
          <Text style={{ color: 'white', marginTop: '0%', fontSize: 20 }}>
            Your station information
          </Text>
        </View>
      </View>
      <View style={{ backgroundColor: '#3D3D3D', height: '65%', width: '90%', marginLeft: '5%' }}>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={{ height: '100%', width: '100%' }}>
            {/* <Text style={styles.inputText}>Station Name:</Text>
            <TextInput
              accessibilityLabel="stationName"
              onChangeText={(text) => handleUserPropertiesInputChange(text, 'name')}
              style={styles.inputField}
              placeholder="Station name"
              autoComplete="email"
            /> */}
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
                  { name: 'BEV', code: 'AL' },
                  { name: 'HEV', code: 'AX' },
                  { name: 'PHEV', code: 'DZ' }
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
      <View>
        <View>
          <Pressable
            onPress={() => {
              handleUserPropertiesInputChange(priceSelected, 'price');
              submit();
              // navigation.navigate('Settings');
            }}
          >
            <View
              style={{
                width: '60%',
                alignItems: 'center',
                marginTop: '10%',
                marginLeft: '20%',
                borderRadius: 15,
                backgroundColor: '#6EBF34'
              }}
            >
              <Text style={{ color: 'white', marginTop: '0%', fontSize: 20 }}>Register</Text>
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
  modal: {
    backgroundColor: 'white',
    height: '25%',
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    marginTop: '65%',
    marginLeft: '10%'
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
    fontSize: 15
  },
  inputField: {
    marginLeft: '13%',
    marginTop: '2%',
    marginBottom: '5%',
    width: '74%',
    backgroundColor: 'white',
    borderRadius: 10
  }
});

export default RegisterStation;