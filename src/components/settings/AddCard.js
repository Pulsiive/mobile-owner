import React, { Component, useState } from 'react';
import { Image, View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const AddCard = ({ navigation }) => {
  const [cardInput, setCardInput] = useState({
    number: '4242424242424242',
    expiration: 'MM/AA',
    crypto: '000',
    user: 'FirstName and LastName',
    cardName: 'My Card'
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (text, field) => {
    cardInput[field] = text;
    setCardInput(cardInput);
  };
  const submit = () => {
    //Error checker
    if (!cardInput.number.match('^4[0-9]{12}(?:[0-9]{3})?$')) {
      setError(true);
      setErrorMessage('Invalid card number, syntax require no - and no space');
      alert(errorMessage);
      return;
    }
    if (cardInput.crypto.length != 3) {
      //|| !isNaN(cardInput.crypto))
      console.log(cardInput.crypto);
      console.log(cardInput.crypto.length);

      setError(true);
      setErrorMessage('Invalid crypto, syntax require 3 all-digit number');
      alert(errorMessage);
      return;
    }
    setError(false);
    setErrorMessage('');
    navigation.navigate('Deposit');
  };

  return (
    <View style={styles.viewTemplate}>
      <View style={styles.headWalletInformation}>
        <Pressable style={styles.backButton} onPress={() => navigation.navigate('Deposit')}>
          <Text style={styles.backButtonContent}>{'<'}</Text>
        </Pressable>
        <Text
          style={{
            color: 'white',
            width: '90%',
            fontSize: 35,
            fontWeight: '700',
            marginLeft: '3%'
          }}
        >
          Add a new card
        </Text>
      </View>
      {/* CARD NUMBER  */}
      <View>
        <Text
          style={{
            color: 'white',
            width: '30%',
            fontSize: 15,
            fontWeight: '400',
            marginTop: '5%',
            marginLeft: '5%'
          }}
        >
          Card number
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Icon
            style={{ marginLeft: '5%', marginTop: '3%' }}
            name="credit-card"
            size={30}
            color="grey"
          />
          <TextInput
            style={{
              color: 'grey',
              backgroundColor: 'white',
              borderRadius: 10,
              height: '74%',
              width: '82%',
              marginTop: '1%',
              marginLeft: '3%'
            }}
            onChangeText={(text) => handleChange(text, 'number')}
            placeholder="0,00"
            autoComplete="username"
          >
            {cardInput.number}
          </TextInput>
        </View>
        {/* EXPIRATION AND CRYPTO */}
        <View style={{ flexDirection: 'row', marginLeft: '2%' }}>
          {/* EXPIRATION */}
          <View style={{ width: '50%' }}>
            <Text
              style={{
                color: 'white',
                width: '30%',
                fontSize: 15,
                fontWeight: '400',
                marginTop: '5%',
                marginLeft: '5%'
              }}
            >
              Exp.Date
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Icon
                style={{ marginLeft: '5%', marginTop: '3%' }}
                name="calendar"
                size={30}
                color="grey"
              />
              <TextInput
                style={{
                  color: 'grey',
                  backgroundColor: 'white',
                  borderRadius: 10,
                  height: '74%',
                  width: '65%',
                  marginTop: '1%',
                  marginLeft: '3%'
                }}
                onChangeText={(text) => handleChange(text, 'expiration')}
                placeholder="0,00"
                autoComplete="username"
              >
                {cardInput.expiration}
              </TextInput>
            </View>
          </View>
          {/* CRYPTO */}
          <View style={{ width: '50%' }}>
            <Text
              style={{
                color: 'white',
                width: '30%',
                fontSize: 15,
                fontWeight: '400',
                marginTop: '5%'
              }}
            >
              Crypto
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Icon
                style={{ marginLeft: '5%', marginTop: '3%' }}
                name="lock"
                size={30}
                color="grey"
              />
              <TextInput
                style={{
                  color: 'grey',
                  backgroundColor: 'white',
                  borderRadius: 10,
                  height: '74%',
                  width: '70%',
                  marginTop: '1%',
                  marginLeft: '3%'
                }}
                onChangeText={(text) => handleChange(text, 'crypto')}
                placeholder="0,00"
                autoComplete="username"
              >
                {cardInput.crypto}
              </TextInput>
            </View>
          </View>
        </View>
        {/* NAME  */}
        <Text
          style={{
            color: 'white',
            width: '30%',
            fontSize: 15,
            fontWeight: '400',
            marginTop: '5%',
            marginLeft: '5%'
          }}
        >
          Card holder name
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Icon style={{ marginLeft: '5%', marginTop: '3%' }} name="user" size={30} color="grey" />
          <TextInput
            style={{
              color: 'grey',
              backgroundColor: 'white',
              borderRadius: 10,
              height: '74%',
              width: '82%',
              marginTop: '1%',
              marginLeft: '3%'
            }}
            onChangeText={(text) => handleChange(text, 'user')}
            placeholder="0,00"
            autoComplete="username"
          >
            {cardInput.user}
          </TextInput>
        </View>
        {/* CARD NAME */}
        <Text
          style={{
            color: 'white',
            width: '30%',
            fontSize: 15,
            fontWeight: '400',
            marginTop: '5%',
            marginLeft: '5%'
          }}
        >
          Label
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Icon style={{ marginLeft: '5%', marginTop: '3%' }} name="tag" size={30} color="grey" />
          <TextInput
            style={{
              color: 'grey',
              backgroundColor: 'white',
              borderRadius: 10,
              height: '74%',
              width: '82%',
              marginTop: '1%',
              marginLeft: '3%'
            }}
            onChangeText={(text) => handleChange(text, 'cardName')}
            placeholder="0,00"
            autoComplete="username"
          >
            {cardInput.cardName}
          </TextInput>
        </View>
        <Pressable onPress={submit}>
          <View
            style={{
              width: '90%',
              alignItems: 'center',
              height: '25%',
              marginTop: '10%',
              marginLeft: '5%',
              borderRadius: 15,
              backgroundColor: '#6EBF34'
            }}
          >
            <Text style={{ color: 'white', marginTop: '3%' }}>Add a card</Text>
          </View>
        </Pressable>
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
    marginTop: '8%',
    width: '100%',
    height: '10%'
  }
});

export default AddCard;
