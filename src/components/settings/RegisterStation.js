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

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Stepper from 'react-native-stepper-ui';
import TextFillView from '../../globals/components/TextFillView';

const InputGoogleAddress = ({ handleUserCoordinatesInputChange }) => {
  return (
    <View
      style={{
        height: '60%',
        width: '75%',
        marginLeft: '13%',
        marginTop: '5%'
      }}
    >
      <GooglePlacesAutocomplete
        GooglePlacesDetailsQuery={{ fields: 'geometry' }}
        fetchDetails={true}
        placeholder="Recherchez une adresse"
        onPress={(data, details = null) => {
          // 'data' contient les informations sur la suggestion sélectionnée
          // 'details' contient des informations supplémentaires sur l'emplacement, y compris la latitude et la longitude
          console.log('data:', data);
          console.log('details:', details);
          console.log(JSON.stringify(details?.geometry?.location));
          const location = details?.geometry?.location;
          console.log(data.structured_formatting.main_text);
          console.log(data.structured_formatting.secondary_text);

          handleUserCoordinatesInputChange(location.lat, 'lat');
          handleUserCoordinatesInputChange(location.lng, 'long');
          handleUserCoordinatesInputChange(data.structured_formatting.main_text, 'address');

          console.log(userCoordinatesInput);
        }}
        query={{
          // Utilisez le paramètre 'key' avec votre clé API Google Maps
          key: 'AIzaSyBJnNegGBOxyllMqvL5vg0bdGxXh0q3rTs',
          language: 'fr' // Définissez la langue de la recherche
        }}
      />
    </View>
  );
};

const InputUserInfo = ({ handleUserCoordinatesInputChange }) => {
  return (
    <View style={{ marginTop: 50 }}>
      <Text style={styles.inputText}>Ville:</Text>
      <TextInput
        accessibilityLabel="Ville"
        onChangeText={(text) => handleUserCoordinatesInputChange(text, 'city')}
        style={styles.inputField}
        placeholder="Ville"
        autoComplete="email"
      />
      <Text style={styles.inputText}>Code Postal:</Text>
      <TextInput
        accessibilityLabel="Code Postal"
        onChangeText={(text) => handleUserCoordinatesInputChange(text, 'postalCode')}
        style={styles.inputField}
        placeholder="Code Postal"
        autoComplete="email"
      />
      <Text style={styles.inputText}>Pays:</Text>
      <TextInput
        accessibilityLabel="Pays"
        onChangeText={(text) => handleUserCoordinatesInputChange(text, 'country')}
        style={styles.inputField}
        placeholder="Pays"
        autoComplete="email"
      />
    </View>
  );
};

const InputStationInfo = ({ handleUserPropertiesInputChange }) => {
  const [priceSelected, setpriceSelected] = useState(0);
  const [maxprice, setMaxprice] = useState(20);
  const [userPropertiesInput, setUserPropertiesInput] = useState({
    plugTypes: [1],
    maxPower: '',
    isGreenEnergy: true,
    price: 0,
    nbChargingPoints: 1,
    slots: []
  });
  // TO put in main component
  const handlePriceChange = (value) => {
    setpriceSelected(value);
    handleUserPropertiesInputChange(priceSelected, 'price');
  };

  return (
    <View style={{ marginTop: 50 }}>
      <Text style={styles.inputText}>Prix:</Text>
      <Slider
        style={{ marginLeft: '10%', width: '80%', height: 40 }}
        value={priceSelected}
        onValueChange={(value) => handlePriceChange(value)}
        minimumValue={0}
        maximumValue={maxprice}
        step={1}
        minimumTrackTintColor="white"
        maximumTrackTintColor="green"
      />
      <Text style={{ marginLeft: '70%', marginBottom: '6%', color: 'grey', fontSize: 11 }}>
        {priceSelected}€ / 15 min
      </Text>
      <Text style={styles.inputText}>Puissance maximale:</Text>
      <TextInput
        accessibilityLabel="maxPower"
        onChangeText={(text) => handleUserPropertiesInputChange(text, 'maxPower')}
        style={styles.inputField}
        placeholder="Puissance Maximale"
        autoComplete="email"
      />
      <Text style={styles.inputText}>Plug de la station:</Text>
      <View style={{ height: '20%', width: '75%', marginLeft: '12%' }}>
        <Dropdown
          placeholder="Choissisez une option..."
          dropdownHelperTextStyle={{ color: 'grey' }}
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
    </View>
  );
};

const ValidateInformation = ({ userCoordinatesInput, userPropertiesInput }) => {
  const displayUserCoordinatesData = [
    { title: 'Latitude :', subtext: userCoordinatesInput.lat.toFixed(3) },
    { title: 'Longitude :', subtext: userCoordinatesInput.long.toFixed(3) },
    { title: 'Pays :', subtext: userCoordinatesInput.country },
    // { title: 'Code Pays :', subtext: userCoordinatesInput.countryCode },
    { title: 'Code Postal :', subtext: userCoordinatesInput.postalCode },
    { title: 'Ville :', subtext: userCoordinatesInput.city },
    { title: 'Adresse :', subtext: userCoordinatesInput.address }
  ];
  const displayUserPropertiesData = [
    { title: 'Type prise :', subtext: userPropertiesInput.plugTypes },
    { title: 'Puis.max :', subtext: userPropertiesInput.maxPower },
    // { title: 'Energie verte :', subtext: userPropertiesInput.isGreenEnergy },
    { title: 'Prix :', subtext: userPropertiesInput.price },
    { title: 'Nb prise :', subtext: userPropertiesInput.nbChargingPoints }
  ];

  return (
    <View style={{ marginTop: 50, height: 380 }}>
      <View>
        <Text style={{ color: 'white', fontWeight: '500', fontSize: 16, marginLeft: 20 }}>
          Verifiez vos informations avant d'enregistrer !
        </Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: '5%' }}>
        <View style={{ marginLeft: -10, width: '49%', alignItems: 'center' }}>
          <Text style={{ color: 'grey', fontWeight: '200' }}>Coordonnées</Text>
          {displayUserCoordinatesData.map((data, index) => (
            <TextFillView key={index} title={data.title} subtext={data.subtext} />
          ))}
        </View>
        <View style={{ marginLeft: 5, width: '49%', alignItems: 'center' }}>
          <Text style={{ color: 'grey', fontWeight: '200' }}>Propriétés</Text>
          {displayUserPropertiesData.map((data, index) => (
            <TextFillView key={index} title={data.title} subtext={data.subtext} />
          ))}
        </View>
      </View>
    </View>
  );
};

const RegisterStation = ({ navigation }) => {
  const [userCoordinatesInput, setUserInput] = useState({
    lat: 0,
    long: 0,
    address: '',
    city: '',
    country: '',
    countryCode: 'FR',
    postalCode: 12345
  });
  const [userPropertiesInput, setUserPropertiesInput] = useState({
    plugTypes: [1],
    maxPower: '',
    isGreenEnergy: true,
    price: 0,
    nbChargingPoints: 1,
    slots: []
  });
  const [active, setActive] = useState(0);

  const handleUserCoordinatesInputChange = (text, field) => {
    console.log(field);
    userCoordinatesInput[field] = text;
    if (field == 'postalCode') userCoordinatesInput[field] = Number(text);
    setUserInput(userCoordinatesInput);
  };
  const handleUserPropertiesInputChange = (text, field) => {
    console.log(field);
    if (field == 'plugTypes') userPropertiesInput[field] = [text];
    else userPropertiesInput[field] = text;
    setUserPropertiesInput(userPropertiesInput);
  };

  // first content is an empty element due to a problem with googleAutocomplete FlatList component cannot be rendered inside the VirtualizedList of Stepper
  const content = [
    <></>,
    <InputUserInfo handleUserCoordinatesInputChange={handleUserCoordinatesInputChange} />,
    <InputStationInfo handleUserPropertiesInputChange={handleUserPropertiesInputChange} />,
    <ValidateInformation
      userCoordinatesInput={userCoordinatesInput}
      userPropertiesInput={userPropertiesInput}
    />
  ];

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
        alert(`Votre station a ${data.station.coordinates.address} bien été crée.`);
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
          Nouvelle Station
        </Text>
      </View>
      <View style={{ marginVertical: 35, marginHorizontal: 20 }}>
        <Stepper
          active={active}
          content={content}
          onBack={() => setActive((p) => p - 1)}
          onFinish={() => alert('Êtes vous sûr que les informations sont correctes ?')}
          onNext={() => setActive((p) => p + 1)}
          stepStyle={{
            backgroundColor: '#1EAE8D',
            width: 30,
            height: 30,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          buttonStyle={{
            marginTop: 10,
            marginLeft: '15%',
            marginRight: 10,
            borderRadius: 4,
            width: 100,
            alignItems: 'center',
            backgroundColor: active == content.length - 1 ? '#6EBF34' : '#1EAE8D'
          }}
          wrapperStyle={{ height: active == 0 ? 50 : '88%' }}
        />
      </View>
      {active == 0 ? (
        <InputGoogleAddress handleUserCoordinatesInputChange={handleUserCoordinatesInputChange} />
      ) : (
        <></>
      )}

      {/* <Pressable
        onPress={() => {
          handleUserPropertiesInputChange(priceSelected, 'price');
          submit();
          // navigation.navigate('Settings');
        }}
      >
      </Pressable> */}

      <View></View>
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
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
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
    marginBottom: 35,
    width: '74%',
    backgroundColor: 'white',
    borderRadius: 10
  }
});

export default RegisterStation;
