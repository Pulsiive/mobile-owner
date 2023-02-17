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
  TouchableHighlight,
  ScrollView
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

const ModalInformation = ({ setModal, reservationData }) => {
  return (
    <View style={styles.modal}>
      <View style={{ flexDirection: 'row', marginTop: '2%' }}>
        <Text style={{ color: 'black', fontSize: 20, fontWeight: '800', marginLeft: '3%' }}>
          Reservation informations
        </Text>
        <Pressable
          onPress={() => {
            setModal(false);
          }}
        >
          <Text style={{ color: 'red', fontSize: 20, marginLeft: '43%' }}>X</Text>
        </Pressable>
      </View>

      <View>
        <View style={{ flexDirection: 'row', height: '20%', width: '100%', marginTop: '5%' }}>
          <View
            style={{
              backgroundColor: 'grey',
              borderRadius: 50,
              width: 50,
              height: 50,
              marginLeft: '5%'
            }}
          />
          <View>
            <Text style={{ marginLeft: '5%', fontWeight: '400', fontSize: 18, color: 'black' }}>
              {reservationData.renterUsername}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Icon
                style={{ marginTop: '2%', marginLeft: '2%' }}
                name="star"
                size={25}
                color="yellow"
              />
              <Text style={{ fontWeight: '700', fontSize: 18, color: 'black' }}>5.0</Text>
            </View>
          </View>
          <Icon style={{ marginLeft: '5%' }} name="mail" size={25} color="black" />
          <Icon style={{ marginLeft: '3%' }} name="phone" size={25} color="black" />
        </View>
        <Text style={{ marginLeft: '5%', fontWeight: '400', fontSize: 18, color: 'black' }}>
          {reservationData.renterAdress}
        </Text>
        <Text
          style={{
            marginLeft: '5%',
            marginTop: '5%',
            fontWeight: '400',
            fontSize: 18,
            color: 'black'
          }}
        >
          {reservationData.renterMessages}
        </Text>
        <View
          style={{
            marginLeft: '10%',
            marginTop: '5%',
            marginBottom: '5%',
            height: '1%',
            width: '80%',
            backgroundColor: 'black'
          }}
        />
        <Text style={{ marginLeft: '25%', fontWeight: '500', fontSize: 18, color: 'black' }}>
          Station information
        </Text>
        <Text style={{ marginLeft: '2%', fontWeight: '300', fontSize: 16, color: 'black' }}>
          Reservation #1, {reservationData.startHour}-{reservationData.endHour},
          {reservationData.date}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Icon
            style={{ marginTop: '2%', marginLeft: '2%' }}
            name="star"
            size={25}
            color="yellow"
          />
          <Text style={{ marginLeft: '2%', marginTop: '2%', fontSize: 18, color: 'black' }}>
            {reservationData.valueName}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Icon
            style={{ marginTop: '2%', marginLeft: '2%' }}
            name="star"
            size={25}
            color="yellow"
          />
          <Text style={{ marginLeft: '2%', marginTop: '2%', fontSize: 18, color: 'black' }}>
            {reservationData.stationAdress}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Icon
            style={{ marginTop: '2%', marginLeft: '2%' }}
            name="star"
            size={25}
            color="yellow"
          />
          <Text style={{ marginLeft: '2%', marginTop: '2%', fontSize: 18, color: 'black' }}>
            {reservationData.inputType}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Icon
            style={{ marginTop: '2%', marginLeft: '2%' }}
            name="star"
            size={25}
            color="yellow"
          />
          <Text style={{ marginLeft: '2%', marginTop: '2%', fontSize: 18, color: 'black' }}>
            {reservationData.voltage}
          </Text>
        </View>
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
              <Text style={{ color: 'black', marginTop: '3%' }}>Accept</Text>
            </View>
          </Pressable>
        </View>
        <View style={{ width: '50%' }}>
          <Pressable
            onPress={() => {
              setModal(false);
              console.log('Should send a decline response to backend');
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
              <Text style={{ color: 'black', marginTop: '3%' }}>Decline</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const ReservationCard = ({ ReservationData, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const setModal = (event) => {
    console.log(event);
    setModalVisible(event);
  };
  return (
    <TouchableHighlight
      style={{
        backgroundColor: 'white',
        height: '20%',
        width: '90%',
        marginLeft: '5%',
        marginTop: '5%',
        borderRadius: 5
      }}
      onPress={() => {
        setModal(true);
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
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}
        >
          <ModalInformation setModal={setModal} reservationData={ReservationData} />
        </Modal>
      </View>
    </TouchableHighlight>
  );
};

const Reservations = ({ navigation }) => {
  const [ReservationData, setReservationData] = useState([
    {
      valueName: 'Station 1',
      voltage: '5V',
      inputType: 'IV-1',
      price: '1€',
      date: '16 September',
      startHour: '14h00',
      endHour: '16h00',
      stationAdress: '142 Boulevard Masséna, Paris, France',
      renterUsername: 'Marc Dupont',
      renterAdress: '11 rue Beethoven, Paris, France',
      renterMessages: 'Hello, id like to rent your station for 2 hours this saturday !'
    },
    {
      valueName: 'Station 2',
      voltage: '6V',
      inputType: 'IV-2',
      price: '2€',
      date: '16 September',
      startHour: '10h00',
      endHour: '11h00',
      stationAdress: '4 rue Saint-Anne, Paris, France',
      renterUsername: 'Thibault Decourville',
      renterAdress: '11 rue de la Paix, Paris, France',
      renterMessages: 'Hello, id like to rent your station for 5 hours this monday !'
    },
    {
      valueName: 'Station 2',
      voltage: '6V',
      inputType: 'IV-2',
      price: '2€',
      date: '16 September',
      startHour: '18h00',
      endHour: '21h00',
      stationAdress: '4 rue Saint-Anne, Paris, France',
      renterUsername: 'Tom Holland',
      renterAdress: '84 boulevard Masséna, Paris, France',
      renterMessages: 'Hello, id like to rent your station for 3 hours this Thuesday !'
    },
    {
      valueName: 'Station 2',
      voltage: '6V',
      inputType: 'IV-2',
      price: '2€',
      date: '16 September',
      startHour: '08h00',
      endHour: '16h00',
      stationAdress: '4 rue Saint-Anne, Paris, France',
      renterUsername: 'Chris Hemsworth',
      renterAdress: '4 rue Pasteur, Paris, France',
      renterMessages: 'Hello, could you call me back ?'
    },
    {
      valueName: 'Station 2',
      voltage: '6V',
      inputType: 'IV-2',
      price: '2€',
      date: '16 September',
      startHour: '12h00',
      endHour: '14h00',
      stationAdress: '4 rue Saint-Anne, Paris, France',
      renterUsername: 'Brad Pitt',
      renterAdress: 'Boulevard de la paix, Paris, France',
      renterMessages: 'Hello, how are you'
    }
  ]);

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
    height: '70%',
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    marginTop: '45%',
    marginLeft: '16%'
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
