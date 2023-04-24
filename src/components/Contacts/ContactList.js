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
    <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
      <View style={{ flexDirection: 'row', marginTop: '3%', height: '8%' }}>
        <Icon style={styles.userProfile} name="user" size={20} color="white" />
        <View style={{ marginLeft: '10%', marginTop: '1%' }}>
          <Text style={styles.userTransaction}>{props.name}</Text>
        </View>
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
                Contact information
              </Text>
              <Pressable
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={{ color: 'red', fontSize: 20, marginLeft: '55%' }}>X</Text>
              </Pressable>
            </View>

            {/* ID */}
            <Text
              style={{
                color: 'black',
                fontWeight: '600',
                fontSize: 10,
                marginLeft: '10%',
                marginTop: '5%'
              }}
            >
              {props.name} / {props.id}
            </Text>

            {/* NAME */}
            <Text
              style={{
                color: 'black',
                fontWeight: '600',
                fontSize: 15,
                marginLeft: '10%',
                marginTop: '5%'
              }}
            >
              New Name
            </Text>
            <TextInput
              style={{
                marginBottom: 20,
                backgroundColor: 'lightgrey',
                borderRadius: 10,
                borderWidth: 1,
                width: '80%',
                marginLeft: '10%',
                borderColor: 'white'
              }}
              onChangeText={(text) => setNewName(text)}
            >
              {newName}
            </TextInput>
            {/* PHONE NUMBER */}
            <Text
              style={{
                color: 'black',
                fontWeight: '600',
                fontSize: 15,
                marginLeft: '10%',
                marginTop: '2.5%'
              }}
            >
              Phone Number
            </Text>
            <TextInput
              style={{
                marginBottom: 20,
                backgroundColor: 'lightgrey',
                borderRadius: 10,
                borderWidth: 1,
                width: '80%',
                marginLeft: '10%',
                borderColor: 'white'
              }}
            >
              {props.phoneNumber}
            </TextInput>
            {/* LABEL */}
            <Text
              style={{
                color: 'black',
                fontWeight: '600',
                fontSize: 15,
                marginLeft: '10%',
                marginTop: '2.5%'
              }}
            >
              Label
            </Text>
            <TextInput
              style={{
                marginBottom: 20,
                backgroundColor: 'lightgrey',
                borderRadius: 10,
                borderWidth: 1,
                width: '80%',
                marginLeft: '10%',
                borderColor: 'white'
              }}
            >
              {props.label}
            </TextInput>

            <View style={styles.modalDeleteButton}>
              <Pressable
                onPress={() => {
                  submitDeleteContact();
                  console.log('Deleted.');
                }}
              >
                <Text style={{ color: 'black', marginTop: '3%' }}>Delete Contact</Text>
              </Pressable>
            </View>
            <View style={styles.modalModifyButton}>
              <Pressable
                onPress={() => {
                  submit();
                  console.log('Modified.');
                }}
              >
                <Text style={{ color: 'black', marginTop: '3%' }}>Modify</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
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
  }, []);

  return (
    <View style={styles.viewTemplate}>
      {/* HEADER */}
      <View style={styles.headWalletInformation}>
        <Text style={styles.title}>Contact List</Text>
        <TouchableHighlight
          style={styles.addContactButton}
          onPress={() => navigation.navigate('AddContact')}
        >
          <Text style={{ color: 'green', fontWeight: '700', fontSize: 32, marginLeft: '30%' }}>
            +
          </Text>
        </TouchableHighlight>
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
        <View style={styles.scrollList}>
          <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
              <View>
                <View style={styles.divider} />

                {userDatabase.map((elem, i) => (
                  <ContactCard
                    id={elem.id}
                    name={elem.name}
                    phoneNumber="0602668784"
                    label="Client Mercredi"
                    navigation={navigation}
                  />
                ))}
              </View>
            </ScrollView>
          </SafeAreaView>
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
  headWalletInformation: {
    flexDirection: 'row',
    padding: 10,
    marginTop: '8%',
    width: '100%',
    height: '10%'
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
  userProfile: {
    backgroundColor: 'black',
    marginTop: '3%',
    marginBottom: '2%'
  },
  userTransaction: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18
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
    right: '10%',
    top: '0%',
    backgroundColor: 'lightgrey',
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#7FCB2B'
  },
  modal: {
    backgroundColor: 'white',
    height: '65%',
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    marginTop: '50%',
    marginLeft: '12%'
  },
  modalDeleteButton: {
    width: '90%',
    alignItems: 'center',
    height: '10%',
    marginLeft: '5%',
    borderRadius: 15,
    backgroundColor: '#E71D36'
  },
  modalModifyButton: {
    width: '90%',
    alignItems: 'center',
    height: '10%',
    marginTop: '5%',
    marginLeft: '5%',
    borderRadius: 15,
    backgroundColor: '#6EBF34'
  }
});

export default ContactList;
