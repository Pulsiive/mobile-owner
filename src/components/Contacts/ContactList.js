import { color } from '@rneui/base';
import React, { useState, useEffect } from 'react';
import {
  TextInput,
  Modal,
  Pressable,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import api from '../../globals/query/API';
import * as Animatable from 'react-native-animatable';

const ContactCard = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('newName');
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);

  const submitDeleteContact = async () => {
    try {
      const body = { id: props.id };
      const res = await api.send(
        'DELETE',
        '/api/v1/profile/contact/' + props.id,
        body,
        (auth = true)
      );
      console.log(res);
      if (res.status == 200) {
        console.log('Contact has been changed.');
        setModalVisible(false);
      } else {
        throw res;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const submit = async () => {
    try {
      //Error checker
      if (props.name == newName) {
        setError(true);
        setErrorMessage(
          'New contact name is the same as the old. Please set a different new name.'
        );
        alert(errorMessage);
        return;
      }
      setError(false);
      setErrorMessage('');
      const body = { contactName: props.name, newName: newName };
      const res = await api.send('PUT', '/api/v1/profile/contact', body, (auth = true));
      console.log(res);
      if (res.status == 200) {
        console.log('Contact has been changed.');
        setModalVisible(false);
      } else {
        throw res;
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    // <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
    <View style={styles.contactCard}>
      <View style={styles.cardHeader}>
        <Icon style={styles.userProfile} name="user" size={40} color="#04BF7B" />
        <View style={{ flex: 1 }}>
          <Text style={styles.userTransaction}>{props.name}</Text>
        </View>
        <Animatable.View animation="pulse" iterationCount="infinite">
          <Icon name="magic" color="#04BF7B" size={30} onPress={() => setModalVisible(true)} />
        </Animatable.View>
      </View>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}
      >
        <Animatable.View animation="fadeIn" duration={5000}>
          <View style={styles.modal}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Contact Information</Text>
              {/* <Text style={styles.closeButton} onPress={() => setModalVisible(false)}>X</Text> */}
              <Icon
                name="remove"
                color="#1bae7c"
                size={30}
                onPress={() => setModalVisible(false)}
              />
            </View>

            {/* Current Id/name */}
            <View style={styles.modalHeader}>
              <Text style={styles.label}>Current Name: {props.name} </Text>
            </View>

            {/* New Name Label */}
            <Text style={styles.label}>New Name</Text>
            <TextInput style={styles.inputField} onChangeText={(text) => setNewName(text)}>
              {newName}
            </TextInput>

            {/* PHONE NUMBER */}
            <Text style={styles.label}>Phone Number</Text>
            <TextInput style={styles.inputField}>{props.phoneNumber}</TextInput>

            {/* LABEL */}
            <Text style={styles.label}>Label</Text>
            <TextInput style={styles.inputField}>{props.label}</TextInput>

            <View style={styles.actionButton}>
              <Pressable
                onPress={() => {
                  submitDeleteContact();
                  console.log('Deleted.');
                }}
              >
                <Text style={styles.actionButtonText}>Delete Contact</Text>
              </Pressable>
            </View>
            {/* Add some vertical separation between buttons */}
            <View style={{ marginVertical: 10 }}></View>
            <View style={styles.actionButton}>
              <Pressable
                onPress={() => {
                  submit();
                  console.log('Modified.');
                }}
              >
                <Text style={styles.actionButtonText}>Modify</Text>
              </Pressable>
            </View>
          </View>
        </Animatable.View>
      </Modal>
    </View>
    // </TouchableWithoutFeedback>
  );
};

const ContactList = ({ navigation }) => {
  const [filterSelected, setFilterSelected] = useState(1);
  const [userDatabase, setUserDatabase] = useState([
    { name: 'No', lastMessage: 'Hi there !' },
    { name: 'User', lastMessage: 'I will be there soon' },
    { name: 'Found', lastMessage: 'Is it available ?' },
    { name: 'Esther', lastMessage: 'Hi, id like to book an apointment for tomorrow' },
    { name: 'Robert', lastMessage: 'Hi how is it going ? Ill be there at 4' },
    { name: 'Titouan', lastMessage: 'random message' },
    { name: 'Pomme', lastMessage: 'hello hello' },
    { name: 'Toto', lastMessage: 'Hi there !' },
    { name: 'Alex', lastMessage: 'Hi there !' }
  ]);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const res = await api.send('GET', '/api/v1/profile/contacts', null, true);
        console.log('data: ', res.data);
        console.log('length: ', res.data.length);

        if (res.status == 200) {
          const tmpContactList = [];
          for (let i = 0; i < res.data.length; i++) {
            console.log(i);
            console.log(res.data[i]);
            tmpContactList.push({
              id: res.data[i].user.id,
              name: res.data[i].user.firstName,
              lastName: res.data[i].user.lastName
            });
          }
          console.log('tmp list: ', tmpContactList);
          setUserDatabase(tmpContactList);
          //          setUserData({ firstName: res.data.firstName, lastName: res.data.lastName });
        } else {
          throw res;
        }
      } catch (e) {
        const code = e.status;
        alert('Error: Contact could not be fetched');
      }
    }
    fetchContacts();
  }, [filterSelected]);

  return (
    <View style={styles.viewTemplate}>
      {/* HEADER */}
      <View style={styles.headWalletInformation}>
        <Text style={styles.title}>Contact List</Text>
      </View>
      {/* CONTENT */}
      <View style={styles.container}>
        {/* Ajouter un ticket sur le filtre pour afficher un utilisateur ? 2.5J/h */}
        {/* <TextInput
          style={styles.input}
          // onChangeText={{}}
          placeholder="Research"
          autoComplete="username"
        /> */}
        {/* FILTER */}
        <View style={styles.filter}>
          <TouchableWithoutFeedback onPress={() => setFilterSelected(1)}>
            <Text style={filterSelected == 1 ? styles.selectedColor : styles.neutralColor}>
              ALL
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setFilterSelected(2)}>
            <Text style={filterSelected == 2 ? styles.selectedColor : styles.neutralColor}>
              FAVORITE
            </Text>
          </TouchableWithoutFeedback>
        </View>
        {/* VIEWLIST */}
        <View style={styles.cardList}>
          {userDatabase.map((elem, i) => (
            <ContactCard
              key={elem.id}
              id={elem.id}
              name={elem.name}
              phoneNumber="0602668784"
              label="Client Mercredi"
              navigation={navigation}
            />
          ))}
        </View>
      </View>

      {/* Add Contact Button */}
      <Animatable.View style={styles.addContactButton} animation="bounce" iterationCount="infinite">
        <TouchableHighlight
          style={styles.addContactButton}
          onPress={() => navigation.navigate('AddContact')}
        >
          <Text style={{ color: 'green', fontWeight: '700', fontSize: 32, marginLeft: '30%' }}>
            +
          </Text>
        </TouchableHighlight>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewTemplate: {
    backgroundColor: '#121212',
    width: '100%',
    height: '100%'
  },
  //HEADER
  headWalletInformation: {
    flexDirection: 'row',
    padding: 10,
    marginTop: '8%',
    width: '100%',
    height: '10%',
    justifyContent: 'space-between' // Add this line
  },
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
  title: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 25,
    color: 'white',
    width: '100%'
  },

  //CONTENT
  input: {
    borderRadius: 15,
    backgroundColor: '#474747',
    width: '90%',
    marginLeft: '5%',
    marginBottom: '2%'
  },
  filter: {
    flexDirection: 'row',
    width: '90%',
    height: '5%',
    marginLeft: '5%',
    marginTop: '5%',
    marginBottom: '2%',
    justifyContent: 'space-around'
  },
  selectedColor: {
    color: '#04BF7B',
    fontWeight: '900'
  },
  neutralColor: {
    color: 'grey',
    fontWeight: '300'
  },
  container: {
    marginTop: '5%',
    height: '90%'
  },
  scrollList: {
    width: '100%',
    height: '82%'
  },
  container: {
    flex: 1
  },
  scrollView: {
    marginHorizontal: 20
  },
  divider: {
    width: '80%',
    backgroundColor: 'grey',
    height: '0.5%',
    marginLeft: '10%',
    marginBottom: '10%'
  },
  addContactButton: {
    position: 'absolute',
    right: '5%',
    bottom: '10%',
    backgroundColor: 'lightgrey',
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#7FCB2B'
  },
  modal: {
    backgroundColor: '#121212', // Background color for the modal
    borderRadius: 10, // Rounded corners
    padding: 20, // Padding inside the modal
    width: '80%', // Width of the modal
    alignSelf: 'center', // Center the modal horizontally
    shadowColor: 'rgba(0, 0, 0, 0.3)', // Shadow color
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 5
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  modalTitle: {
    color: '#1bae7c',
    fontSize: 20,
    fontWeight: 'bold'
  },
  label: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 10
  },
  inputField: {
    backgroundColor: '#2d2d2d',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    color: '#737373'
  },
  actionButton: {
    backgroundColor: '#232222',
    borderRadius: 15,
    borderColor: '#1bae7c',
    borderWidth: 3,
    padding: 15,
    alignItems: 'center'
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
  contactCard: {
    backgroundColor: '#1d1d1d',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 15, // pour ajouter de l'espace de chaque coté d'un contact
    marginTop: 5,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5, // Adjusted vertical padding
    paddingHorizontal: 5, // Adjusted horizontal padding
    borderTopWidth: 5,
    borderTopColor: '#2d2d2d'
  },

  userProfile: {
    backgroundColor: 'transparent',
    borderRadius: 50,
    padding: 0,
    marginRight: 15 // Adjusted margin for better spacing
  },
  userTransaction: {
    color: '#e1e1e1',
    fontSize: 16,
    fontWeight: '600'
  }
});

export default ContactList;
