import React, { Component, useState } from 'react';
import { Image, View, Text, TextInput, Pressable, StyleSheet, Switch, Modal } from 'react-native';

import Dropdown from 'react-native-input-select';
import Slider from '@react-native-community/slider';

const RegisterStation = ({ navigation }) => {
  const [userInput, setUserInput] = useState({
    name: '',
    input: '',
    voltage: '',
    amount: 0
  });
  const [amountSelected, setAmountSelected] = useState(0);
  const [maxAmount, setMaxAmount] = useState(20);
  const [iban, setIban] = useState('FRXX XXXX XXXX XXXX');
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleSwitch = () => setIsSwitchEnabled((previousState) => !previousState);

  const handleChange = (text) => {
    setAmountInput(text);
    console.log(amountInput);
  };
  const handleUserInputChange = (text, field) => {
    // if (error) setError(false);
    userInput[field] = text;
    console.log(userInput);
    console.log(text);
    setUserInput(userInput);
  };

  const handleChangeCard = (data) => {
    console.log(data);
    setPaymentMethod(data);
  };
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
      <View style={{ backgroundColor: '#3D3D3D', height: '60%', width: '90%', marginLeft: '5%' }}>
        <Text style={styles.inputText}>Station Name:</Text>
        <TextInput
          accessibilityLabel="stationName"
          onChangeText={(text) => handleUserInputChange(text, 'name')}
          style={styles.inputField}
          placeholder="Station name"
          autoComplete="email"
          // value={userInput.name}
        />
        <Text style={styles.inputText}>Station input:</Text>
        <View style={{ height: '20%', width: '75%', marginLeft: '12%' }}>
          <Dropdown
            placeholder="Select an option..."
            options={[
              { name: 'IV-1', code: 'AL' },
              { name: 'IV-2', code: 'AX' },
              { name: 'IV-3', code: 'DZ' }
            ]}
            optionLabel={'name'}
            optionValue={'code'}
            selectedValue={userInput.input}
            onValueChange={(text) => handleUserInputChange(text, 'input')}
            primaryColor={'green'}
          />
        </View>
        <Text style={styles.inputText}>Voltage:</Text>
        <TextInput
          accessibilityLabel="voltage"
          onChangeText={(text) => handleUserInputChange(text, 'voltage')}
          style={styles.inputField}
          placeholder="Voltage"
          autoComplete="email"
          // value={userInput.voltage}
        />
        <Text style={styles.inputText}>Amount:</Text>
        <Slider
          style={{ marginLeft: '10%', width: '80%', height: 40 }}
          value={amountSelected}
          onValueChange={(value) => setAmountSelected(value)}
          minimumValue={0}
          maximumValue={maxAmount}
          step={1}
          minimumTrackTintColor="white"
          maximumTrackTintColor="green"
        />
        <Text style={{ marginLeft: '72%', color: 'grey', fontSize: 10 }}>
          {amountSelected}€ / 15 min
        </Text>
      </View>
      <View>
        <View>
          <Pressable
            onPress={() => {
              navigation.navigate('Settings');
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
  inputField: {
    marginLeft: '13%',
    marginTop: '2%',
    marginBottom: '5%',
    width: '74%',
    backgroundColor: 'white',
    borderRadius: 10
  },
  inputText: {
    marginLeft: '13%',
    color: 'white',
    fontSize: 20
  }
});

export default RegisterStation;
