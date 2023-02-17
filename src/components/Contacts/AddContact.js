import React, { Component, useState } from 'react';
import { Image, View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import api from '../../globals/query/API';

const AddContact = ({ navigation }) => {
  const [cardInput, setCardInput] = useState({
    number: 'xx xx xx xx xx',
    user: 'Fabien Barthez',
    cardName: 'memo...'
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (text, field) => {
    cardInput[field] = text;
    setCardInput(cardInput);
  };
  const submit = async () => {
    try {
      //Error checker
      console.log(cardInput.number);
      if (
        !cardInput.number.match(
          /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/
        )
      ) {
        setError(true);
        setErrorMessage(
          'Invalid phone number, syntax require 10 digits, in a french format with countrycode or not'
        );
        alert(errorMessage);
        return;
      }
      setError(false);
      setErrorMessage('');
      const body = { contactName: cardInput.user };
      const res = await api.send('POST', '/api/v1/profile/contact', body, (auth = true));
      console.log(res);
      if (res.status == 200) {
        console.log('Contact has been added.');
        navigation.navigate('Planning');
      } else {
        throw res;
      }
      navigation.navigate('ContactList');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.viewTemplate}>
      <View style={styles.headWalletInformation}>
        <Pressable style={styles.backButton} onPress={() => navigation.navigate('ContactList')}>
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
          Add a new contact
        </Text>
      </View>
      {/* NAME  */}
      <Text
        style={{
          color: 'white',
          width: '30%',
          fontSize: 15,
          fontWeight: '400',
          marginTop: '15%',
          marginLeft: '5%'
        }}
      >
        Contact name
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
          Phone number
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Icon style={{ marginLeft: '5%', marginTop: '3%' }} name="phone" size={30} color="grey" />
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
              height: '15%',
              marginTop: '40%',
              marginLeft: '5%',
              borderRadius: 15,
              backgroundColor: '#6EBF34'
            }}
          >
            <Text style={{ color: 'white', marginTop: '3%' }}>Add Contact</Text>
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

export default AddContact;
