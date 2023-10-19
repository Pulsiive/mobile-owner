import React, { useState, useEffect } from 'react';
import {
  TextInput,
  View,
  Text,
  Pressable,
  TouchableWithoutFeedback,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import MessagesViewInformation from './MessageInformationVariable';
import api from '../../globals/query/API';
import { set } from 'date-fns';
import SearchComponent from '../../globals/components/header/SearchFilter';

const MessageCard = (props) => {
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        props.navigation.navigate('PrivateMessages', {
          user: { id: props.id, name: props.name, lastName: props.lastName }
        })
      }
    >
      <View style={{ flexDirection: 'row', height: '10000%' }}>
        <Icon style={styles.userProfile} name="user" size={30} color="white" />
        <View style={{ marginLeft: '10%', marginTop: '1%' }}>
          <Text style={styles.userTransaction}>{props.name}</Text>
          <Text style={{ color: '#686868' }}>{props.lastMessage}</Text>
        </View>
        <Icon style={{ position: 'absolute', right: '3%' }} name="phone" size={20} color="white" />
      </View>
    </TouchableWithoutFeedback>
  );
};

const Messages = ({ navigation }) => {
  const [filterSelected, setFilterSelected] = useState(1);
  const [userDatabase, setUserDatabase] = useState([
    { name: 'John', lastMessage: 'Hi there !' },
    { name: 'Eric', lastMessage: 'I will be there soon' },
    { name: 'Joffrey', lastMessage: 'Is it available ?' },
    { name: 'Esther', lastMessage: 'Hi, id like to book an apointment for tomorrow' },
    { name: 'Robert', lastMessage: 'Hi how is it going ? Ill be there at 4' },
    { name: 'Titouan', lastMessage: 'random message' },
    { name: 'Pomme', lastMessage: 'hello hello' },
    { name: 'Toto', lastMessage: 'Hi there !' },
    { name: 'Alex', lastMessage: 'Hi there !' },
    { name: 'Toto', lastMessage: 'Hi there !' },
    { name: 'Toto', lastMessage: 'Hi there !' }
  ]);
  const [searchFilterValue, setSearchFilterValue] = useState('');

  const [filteredList, setFilteredList] = useState([]);

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
              lastName: res.data[i].user.lastName,
              lastMessage: 'xxxxxxxxxxxxxxxxxxxx'
            });
          }
          console.log('tmp message contact list: ', tmpContactList);
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
  }, [searchFilterValue]);

  useEffect(() => {
    console.log("Searching for:'", searchFilterValue, "'");
    console.log('Found: ', SearchComponent(userDatabase, searchFilterValue));
    setFilteredList(SearchComponent(userDatabase, searchFilterValue));
  }, [searchFilterValue]);

  return (
    <View style={styles.viewTemplate}>
      {/* HEADER */}
      <View style={styles.headWalletInformation}>
        <Text style={styles.title}>Messages</Text>
      </View>
      {/* CONTENT */}
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setSearchFilterValue(text)}
          placeholder="Research"
          autoComplete="username"
        />
        {/* FILTER */}
        <View style={styles.filter}>
          <TouchableWithoutFeedback onPress={() => setFilterSelected(1)}>
            <Text style={filterSelected == 1 ? styles.selectedColor : styles.neutralColor}>
              All
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setFilterSelected(2)}>
            <Text style={filterSelected == 2 ? styles.selectedColor : styles.neutralColor}>
              My Tenant
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setFilterSelected(3)}>
            <Text style={filterSelected == 3 ? styles.selectedColor : styles.neutralColor}>
              New tenant
            </Text>
          </TouchableWithoutFeedback>
        </View>
        {/* VIEWLIST */}
        <View style={styles.scrollList}>
          <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
              <View>
                {filteredList.map((elem, i) => (
                  <View style={{ height: 70 }}>
                    <MessageCard
                      name={elem.name}
                      lastName={elem.lastName}
                      id={elem.id}
                      lastMessage={elem.lastMessage}
                      navigation={navigation}
                    />
                  </View>
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
    height: '10%',
    marginLeft: '5%',
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
  }
});

export default Messages;
