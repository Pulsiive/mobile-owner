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
              <Text style={{ color: 'black', fontWeight: '700', fontSize: 18 }}>5.0</Text>
            </View>
          </View>
          <Icon style={{ marginLeft: '5%' }} name="mail" size={25} color="black" />
          <Icon style={{ marginLeft: '3%' }} name="phone" size={25} color="black" />
        </View>
        <Text style={{ color: 'black', marginLeft: '5%', fontWeight: '400', fontSize: 18 }}>
          {reservationData.renterAdress}
        </Text>
        {/* <Text style={{ marginLeft: '5%', marginTop: '5%', fontWeight: '400', fontSize: 18 }}>
          {reservationData.renterMessages}
        </Text> */}
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
        <Text style={{ color: 'black', marginLeft: '25%', fontWeight: '500', fontSize: 18 }}>
          Station information
        </Text>
        <Text style={{ color: 'black', marginLeft: '2%', fontWeight: '300', fontSize: 16 }}>
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
          <Text style={{ color: 'black', marginLeft: '2%', marginTop: '2%', fontSize: 18 }}>
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
          <Text style={{ color: 'black', marginLeft: '2%', marginTop: '2%', fontSize: 18 }}>
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
          <Text style={{ color: 'black', marginLeft: '2%', marginTop: '2%', fontSize: 18 }}>
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
          <Text style={{ color: 'black', marginLeft: '2%', marginTop: '2%', fontSize: 18 }}>
            {reservationData.voltage}
          </Text>
        </View>
      </View>
    </View>
  );
};

const ModalRate = ({ setModal, reservationData }) => {
  const [rating, setRating] = useState(0);
  const [appreciationModalVisible, setAppreciationModalVisible] = useState(false);
  const [selectedAppreciation, setSelectedAppreciation] = useState(0);

  const setAppreciationModal = (event) => {
    console.log(event);
    setAppreciationModalVisible(event);
  };
  const setAppreciation = (value) => {
    setSelectedAppreciation(value);
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        height: '20%',
        width: '80%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D4D4D4',
        marginTop: '75%',
        marginLeft: '10%'
      }}
    >
      <View style={{ flexDirection: 'row', marginTop: '2%' }}>
        <Text style={{ color: 'black', fontSize: 20, fontWeight: '800', marginLeft: '3%' }}>
          Rate the station
        </Text>
        <Pressable
          onPress={() => {
            setModal(false);
          }}
        >
          <Text style={{ color: 'red', fontSize: 20, marginLeft: '63%' }}>X</Text>
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: '10%',
          marginLeft: '26%',
          width: '100%'
        }}
      >
        <Pressable
          onPress={() => {
            setRating(1);
          }}
        >
          <Icon
            style={{ marginLeft: '2%' }}
            name="star"
            size={25}
            color={rating >= 1 ? 'yellow' : 'grey'}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            setRating(2);
          }}
        >
          <Icon
            style={{ marginLeft: '2%' }}
            name="star"
            size={25}
            color={rating >= 2 ? 'yellow' : 'grey'}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            setRating(3);
          }}
        >
          <Icon
            style={{ marginLeft: '2%' }}
            name="star"
            size={25}
            color={rating >= 3 ? 'yellow' : 'grey'}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            setRating(4);
          }}
        >
          <Icon
            style={{ marginLeft: '2%' }}
            name="star"
            size={25}
            color={rating >= 4 ? 'yellow' : 'grey'}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            setRating(5);
          }}
        >
          <Icon
            style={{ marginLeft: '2%' }}
            name="star"
            size={25}
            color={rating == 5 ? 'yellow' : 'grey'}
          />
        </Pressable>
      </View>
      <Pressable
        style={{
          marginLeft: '35%',
          marginTop: '6%'
        }}
        onPress={() => {
          console.log('Submit to backend');
          // setModal(false);
          setAppreciationModal(true);
        }}
      >
        <View
          style={{
            backgroundColor: 'green',
            height: '50%',
            width: '50%',
            alignItems: 'center',
            borderRadius: 20
          }}
        >
          <Text style={{ marginTop: '4%', color: 'black' }}>Submit</Text>
        </View>
      </Pressable>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={appreciationModalVisible}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}
      >
        <View
          style={{
            height: '28%',
            width: '95%',
            marginLeft: '2.5%',
            backgroundColor: 'white',
            marginTop: '70%',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#D4D4D4'
          }}
        >
          <View style={{ flexDirection: 'row', marginTop: '2%' }}>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: '800', marginLeft: '3%' }}>
              User Appreciation
            </Text>
            <Pressable
              onPress={() => {
                setModal(false);
              }}
            >
              <Text style={{ color: 'red', fontSize: 20, marginLeft: '73%' }}>X</Text>
            </Pressable>
          </View>
          <View style={{ flexDirection: 'row', marginTop: '5%' }}>
            <View
              style={
                selectedAppreciation == 1
                  ? styles.AppreciationSelected
                  : styles.AppreciationNonSelected
              }
            >
              <Pressable
                onPress={() => {
                  setAppreciation(1);
                }}
              >
                <Text style={{ color: 'black', marginTop: 40, marginLeft: 40 }}>Useful</Text>
              </Pressable>
            </View>
            <View
              style={
                selectedAppreciation == 2
                  ? styles.AppreciationSelected
                  : styles.AppreciationNonSelected
              }
            >
              <Pressable
                onPress={() => {
                  setAppreciation(2);
                }}
              >
                <Text style={{ color: 'black', marginTop: 40, marginLeft: 35 }}>On time</Text>
              </Pressable>
            </View>
            <View
              style={
                selectedAppreciation == 3
                  ? styles.AppreciationSelected
                  : styles.AppreciationNonSelected
              }
            >
              <Pressable
                onPress={() => {
                  setAppreciation(3);
                }}
              >
                <Text style={{ color: 'black', marginTop: 40, marginLeft: 33 }}>Kindness</Text>
              </Pressable>
            </View>
          </View>
          <Pressable
            style={{
              marginLeft: '35%',
              marginTop: '6%'
            }}
            onPress={() => {
              console.log('Submit to backend');
              setAppreciationModal(false);
              setModal(false);
            }}
          >
            <View
              style={{
                backgroundColor: 'green',
                height: '40%',
                width: '50%',
                alignItems: 'center',
                borderRadius: 20
              }}
            >
              <Text style={{ marginTop: '4%', color: 'black' }}>Submit</Text>
            </View>
          </Pressable>
        </View>
      </Modal>
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
    <View
      style={{
        backgroundColor: 'white',
        height: 150,
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
    </View>
  );
};

const PastReservations = ({ navigation }) => {
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
  const [modalVisible, setModalVisible] = useState(false);
  const [modalRateVisible, setModalRateVisible] = useState(false);

  const setModal = (event) => {
    console.log(event);
    setModalVisible(event);
  };
  const setRateModal = (event) => {
    console.log(event);
    setModalRateVisible(event);
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
          Past Reservations
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
          fontSize: 18,
          fontWeight: '400',
          marginTop: '5%',
          marginLeft: '20%'
        }}
      >
        Total reservation made: {ReservationData.length}
      </Text>
      <View style={{ width: '100%', height: '76%' }}>
        <ScrollView style={{ flex: 1 }}>
          {ReservationData.map((ReservationData, index) => (
            <View>
              <ReservationCard ReservationData={ReservationData} navigation={navigation} />
              <View style={{ flexDirection: 'row', marginTop: '1%' }}>
                <TouchableHighlight
                  style={{ marginLeft: '4%' }}
                  onPress={() => {
                    setModal(true);
                  }}
                >
                  <Text style={{ color: 'white', marginLeft: '5%' }}>More information</Text>
                </TouchableHighlight>
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
                <TouchableHighlight
                  style={{}}
                  onPress={() => {
                    setRateModal(true);
                  }}
                >
                  <Text style={{ color: 'white', marginLeft: '67%' }}>Rate</Text>
                </TouchableHighlight>
                <Modal
                  animationType={'fade'}
                  transparent={true}
                  visible={modalRateVisible}
                  onRequestClose={() => {
                    console.log('Modal has been closed.');
                  }}
                >
                  <ModalRate setModal={setRateModal} reservationData={ReservationData} />
                </Modal>
              </View>
            </View>
          ))}
        </ScrollView>
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
  container: {
    flex: 1
  },
  modal: {
    backgroundColor: 'white',
    height: '60%',
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    marginTop: '45%',
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
  AppreciationNonSelected: {
    borderColor: 'grey',
    height: 100,
    width: 118,
    marginLeft: '2%',
    borderRadius: 20,
    borderWidth: 1
  },
  AppreciationSelected: {
    borderColor: 'green',
    height: 100,
    width: 118,
    marginLeft: '2%',
    borderRadius: 20,
    borderWidth: 3
  }
});

export default PastReservations;
