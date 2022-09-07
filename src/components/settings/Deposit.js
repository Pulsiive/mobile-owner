import React, { Component, useState } from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Modal
} from 'react-native';

const Deposit = ({ navigation }) => {
  const [amountInput, setAmountInput] = useState('0');
  const [paymentMethod, setPaymentMethod] = useState('Carte N26');
  const [modalVisible, setModalVisible] = useState(false);
  const availablePayments = [
    { name: 'Revolut', number: '1529' },
    { name: 'Caisse Epargne', number: '6289' }
  ];

  const setModal = (event) => {
    console.log(event);
    setModalVisible(true);
  };
  const handleChange = (text) => {
    setAmountInput(text);
    console.log(amountInput);
  };
  const handleChangeCard = (data) => {
    console.log(data);
    setPaymentMethod(data);
  };
  return (
    <View style={styles.viewTemplate}>
      <View style={styles.headWalletInformation}>
        <Pressable style={styles.backButton} onPress={() => navigation.navigate('Wallet')}>
          <Text style={styles.backButtonContent}>{'<'}</Text>
        </Pressable>
        <Text
          style={{
            color: 'white',
            width: '40%',
            fontSize: 35,
            fontWeight: '700',
            marginLeft: '3%'
          }}
        >
          Deposit
        </Text>
      </View>
      <View>
        <View style={{ flexDirection: 'row', height: '30%', marginTop: '30%' }}>
          <Text
            style={{
              color: 'white',
              width: '20%',
              fontSize: 30,
              fontWeight: '400',
              marginTop: '2%',
              marginLeft: '30%'
            }}
          >
            Send
          </Text>
          <TextInput
            style={{
              color: 'grey',
              backgroundColor: 'white',
              borderRadius: 10,
              height: '35%',
              width: '20%',
              marginTop: '1%'
            }}
            onChangeText={(text) => handleChange(text)}
            placeholder="0,00"
            autoComplete="username"
          >
            {amountInput}
          </TextInput>
          <Text
            style={{
              color: 'white',
              width: '20%',
              fontSize: 30,
              fontWeight: '400',
              marginTop: '2%',
              marginLeft: '1%'
            }}
          >
            €
          </Text>
        </View>
        <View style={{ flexDirection: 'row', height: '25%', marginTop: '0%' }}>
          <Text
            style={{
              color: 'white',
              width: '20%',
              fontSize: 30,
              fontWeight: '400',
              marginTop: '2%',
              marginLeft: '30%'
            }}
          >
            With
          </Text>
          <Pressable
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <View
              style={{
                height: '40%'
              }}
            >
              <Text
                style={{
                  color: 'grey',
                  marginTop: '13%',
                  height: '70%',
                  fontSize: 20
                }}
              >
                {paymentMethod}
              </Text>
            </View>
          </Pressable>
        </View>

        {/* MODAL PAYMENT */}
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}
        >
          <View style={styles.modal}>
            <View style={{ flexDirection: 'row', marginTop: '2%' }}>
              <Text style={{ color: 'black', fontSize: 20, fontWeight: '800', marginLeft: '3%' }}>
                Payment Method
              </Text>
              <Pressable
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={{ color: 'red', fontSize: 20, marginLeft: '63%' }}>X</Text>
              </Pressable>
            </View>
            <View>
              <Text
                style={{
                  marginLeft: '5%',
                  marginTop: '10%',
                  marginBottom: '5%',
                  fontWeight: '300'
                }}
              >
                Bank card
              </Text>
              {availablePayments.map((data, index) => (
                <Pressable
                  onPress={() => {
                    handleChangeCard(data.name);
                    setModalVisible(false);
                  }}
                >
                  <View
                    style={
                      data.name == paymentMethod ? styles.selectedCard : styles.nonSelectedCard
                    }
                  >
                    <Text style={{ marginLeft: '5%', fontWeight: '700', fontSize: 18 }}>
                      {data.name}
                    </Text>
                    <Text style={{ marginLeft: '3%', marginTop: '1%' }}>{data.number}</Text>
                  </View>
                </Pressable>
              ))}
            </View>
            <View>
              <Text
                style={{
                  marginTop: '10%',
                  marginBottom: '5%',
                  marginLeft: '5%',
                  fontWeight: '300'
                }}
              >
                Other
              </Text>
              <Text style={{ marginLeft: '5%', fontWeight: '700', fontSize: 18 }}>PayPal</Text>
            </View>
            <Pressable
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('AddCard');
              }}
            >
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  height: '30%',
                  marginTop: '10%',
                  marginLeft: '5%',
                  borderRadius: 15,
                  backgroundColor: '#6EBF34'
                }}
              >
                <Text style={{ color: 'black', marginTop: '3%' }}>Add a card</Text>
              </View>
            </Pressable>
          </View>
        </Modal>
        <Pressable
          onPress={() => {
            console.log('Pay');
            navigation.navigate('Wallet');
            //Should play a song
            //Should play an animation
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
            <Text style={{ color: 'white', marginTop: '0%', fontSize: 20 }}>Confirm</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
// }

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
    marginTop: '8%',
    width: '100%',
    height: '10%'
  },
  modal: {
    backgroundColor: 'white',
    height: '50%',
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    marginTop: '37%',
    marginLeft: '12%'
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
  }
});

export default Deposit;
