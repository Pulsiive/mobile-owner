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
    setCardInput({
      ...cardInput,
      [field]: text
    });
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
      console.log(cardInput.user);
      const resContactName = await api.send(
        'GET',
        '/api/v1/users/find?searchBy=first_name&key=' + cardInput.user,
        (auth = true)
      );
      console.log('response: ', resContactName);
      if (resContactName.status != 200 || resContactName.data.users.length == 0) {
        setError(true);
        setErrorMessage(
          'The contact name does not exist within the database. Please try with another contact name.'
        );
        alert(errorMessage);
        setError(false);
        return;
      }
      console.log(resContactName.data.users[0].firstName);
      console.log(resContactName.data.users[0].lastName);
      console.log(resContactName.data.users[0].id);
      console.log('sending to: ', '/api/v1/profile/contact/' + resContactName.data.users[0].id);

      const body = { contactName: cardInput.user };
      const res = await api.send(
        'POST',
        '/api/v1/profile/contact/' + resContactName.data.users[0].id,
        body,
        (auth = true)
      );
      console.log(res);
      if (res.status == 200) {
        console.log('Contact has been added.');
        navigation.navigate('ContactList');
      } else {
        throw res;
      }
      navigation.navigate('ContactList');
    } catch (e) {
      console.log(e);
      alert(e.data.message, errorMessage);
    }
  };

  return (
    <View style={styles.viewTemplate}>
      <View style={styles.headWalletInformation}>
        {/* <Pressable style={styles.backButton} onPress={() => navigation.navigate('ContactList')}>
          <Text style={styles.backButtonContent}>{'<'}</Text>
        </Pressable> */}
        <Icon
          name="chevron-with-circle-left"
          size={40}
          style={{ padding: 10, color: 'white' }}
          onPress={() => navigation.navigate('ContactList')}
        />
        <Text style={styles.title}>Add a new contact</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Icon style={styles.inputIcon} name="user" size={40} color="#04BF7B" />
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => handleChange(text, 'user')}
            placeholder="Contact name"
            value={cardInput.user}
          />
        </View>
        <View style={styles.inputRow}>
          <Icon style={styles.inputIcon} name="phone" size={40} color="#04BF7B" />
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => handleChange(text, 'number')}
            placeholder="Phone number"
            value={cardInput.number}
          />
        </View>
        <View style={styles.inputRow}>
          <Icon style={styles.inputIcon} name="tag" size={40} color="#04BF7B" />
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => handleChange(text, 'cardName')}
            placeholder="Label"
            value={cardInput.cardName}
          />
        </View>
        <Pressable style={styles.addButton} onPress={submit}>
          <Text style={styles.addButtonLabel}>Add Contact</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewTemplate: {
    backgroundColor: '#121212',
    flex: 1
  },
  headWalletInformation: {
    flexDirection: 'row',
    padding: 10,
    marginTop: '8%',
    alignItems: 'center'
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
    backgroundColor: 'white'
  },
  backButtonContent: {
    color: '#04BF7B',
    fontSize: 24,
    fontWeight: 'bold'
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginTop: 20
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40
  },
  inputIcon: {
    marginRight: 10
  },
  inputField: {
    flex: 1,
    height: 40,
    backgroundColor: '#2d2d2d',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#737373'
  },
  addButton: {
    backgroundColor: '#232222',
    borderColor: '#1bae7c',
    borderWidth: 3,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  addButtonLabel: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default AddContact;
