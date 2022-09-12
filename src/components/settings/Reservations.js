import React, { Component, useState } from 'react';
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

const ReservationCard = ({ ReservationData, navigation }) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: '20%',
        width: '90%',
        marginLeft: '5%',
        marginTop: '5%',
        borderRadius: 5
      }}
    >
      <View style={{ flexDirection: 'row', height: '100%', width: '100%' }}>
        <View
          style={{
            backgroundColor: 'grey',
            marginTop: '5%',
            marginLeft: '5%',
            borderRadius: 50,
            height: 50,
            width: 50
          }}
        />
        <View style={{ width: '70%' }}>
          <Text style={{ color: 'black', marginLeft: '10%', marginTop: '15%' }}>
            {ReservationData.renterUsername}
          </Text>
          <Text style={{ color: 'black', marginTop: '10%', marginLeft: '-20%' }}>
            {ReservationData.valueName}
          </Text>
          <Text style={{ color: 'grey', marginTop: '5%', marginLeft: '-20%' }}>
            Reservation #431, {ReservationData.startHour} - {ReservationData.endHour}
          </Text>
        </View>
      </View>
    </View>
  );
};

const Reservations = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [ReservationData, setReservationData] = useState([
    {
      valueName: 'Station 1',
      voltage: '5V',
      inputType: 'IV-1',
      price: '1€',
      date: '16 September',
      startHour: '14h00',
      endHour: '16h00',
      renterUsername: 'Marc Dupont'
    },
    {
      valueName: 'Station 2',
      voltage: '6V',
      inputType: 'IV-2',
      price: '2€',
      date: '16 September',
      startHour: '10h00',
      endHour: '11h00',
      renterUsername: 'Thibault Decourville'
    },
    {
      valueName: 'Station 2',
      voltage: '6V',
      inputType: 'IV-2',
      price: '2€',
      date: '16 September',
      startHour: '18h00',
      endHour: '21h00',
      renterUsername: 'Tom Holland'
    },
    {
      valueName: 'Station 2',
      voltage: '6V',
      inputType: 'IV-2',
      price: '2€',
      date: '16 September',
      startHour: '08h00',
      endHour: '16h00',
      renterUsername: 'Chris Hemsworth'
    },
    {
      valueName: 'Station 2',
      voltage: '6V',
      inputType: 'IV-2',
      price: '2€',
      date: '16 September',
      startHour: '12h00',
      endHour: '14h00',
      renterUsername: 'Brad Pitt'
    }
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
          Reservations
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
      <Text
        style={{
          color: 'white',
          width: '100%',
          fontSize: 25,
          fontWeight: '700',
          marginTop: '10%',
          marginLeft: '15%'
        }}
      >
        Timeline
      </Text>
      <View style={{ width: '100%', height: '78%' }}>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  width: '15%',
                  height: '100%',
                  alignItems: 'center'
                }}
              >
                {ReservationData.map((ReservationData, index) => (
                  <View
                    style={{
                      height: '23%',
                      width: '35%',
                      alignItems: 'center'
                    }}
                  >
                    <View style={styles.postCircle} />
                    <View style={styles.whiteBar} />
                  </View>
                ))}
              </View>
              <View style={{ width: '85%' }}>
                {ReservationData.map((ReservationData, index) => (
                  <ReservationCard ReservationData={ReservationData} navigation={navigation} />
                ))}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
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
  whiteBar: { backgroundColor: 'white', width: '5%', height: '100%' },
  postCircle: {
    backgroundColor: 'green',
    borderRadius: 50,
    height: 20,
    width: 20
  }
});

export default Reservations;
