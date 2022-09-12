import React, { Component, useState } from 'react';
import { Image, View, Text, TextInput, Pressable, StyleSheet, Modal } from 'react-native';

const Stations = ({ stationData, navigation }) => {
  return (
    <View
      style={{
        backgroundColor: '#494949',
        height: '20%',
        width: '90%',
        marginLeft: '5%',
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
          <Text style={styles.informationType}>Name</Text>
          <Text style={styles.informationValue}>{stationData.valueName}</Text>
          <Text style={styles.informationType}>Voltage</Text>
          <Text style={styles.informationValue}>{stationData.voltage}</Text>
          <Text style={styles.informationType}>Input</Text>
          <Text style={styles.informationValue}>{stationData.inputType}</Text>
          <Text style={styles.informationType}>Price</Text>
          <Text style={styles.informationValue}>{stationData.price}</Text>
        </View>
        <Pressable style={styles.modifyButton} onPress={() => navigation.navigate('Settings')}>
          <Text style={{ color: 'white' }}>Modify</Text>
        </Pressable>
      </View>
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
    setModalVisible(true);
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
          My stations
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
      {StationData.map((StationData, index) => (
        <Stations stationData={StationData} navigation={navigation} />
      ))}
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
    fontSize: 20
  },
  modifyButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
    marginLeft: '0%',
    height: '40%',
    width: '30%',
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
  }
});

export default MyStations;
