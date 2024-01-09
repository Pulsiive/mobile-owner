import React, { useState, useEffect } from 'react';
import {
  TextInput,
  View,
  Text,
  Pressable,
  TouchableWithoutFeedback,
  StyleSheet,
  FlatList,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import MessagesViewInformation from './MessageInformationVariable';
import api from '../../globals/query/API';
import { set } from 'date-fns';
import SearchComponent from '../../globals/components/header/SearchFilter';
import * as Animatable from 'react-native-animatable';

const MessageCard = (props) => {
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        props.navigation.navigate('PrivateMessages', {
          user: { id: props.id, name: props.name, lastName: props.lastName }
        })
      }
    >
      <View style={styles.cardContainer}>
        <Icon style={styles.userProfile} name="user-circle-o" size={50} color="white" />
        <View style={styles.cardContent}>
          <Text style={styles.userName}>{props.name}</Text>
          <Animatable.Text animation="fadeInRight" duration={7000} style={styles.lastMessage}>
            ... {props.lastMessage}
          </Animatable.Text>
        </View>
        <Icon style={styles.phoneIcon} name="comment-o" size={30} color="white" />
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
              lastMessage: 'have a nice day!'
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
  }, [searchFilterValue, filteredList]);

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
        <View style={styles.searchBarContainer}>
          <Icon style={styles.searchIcon} name="search" size={20} color="gray" />
          <TextInput
            style={styles.searchBarInput}
            onChangeText={(text) => setSearchFilterValue(text)}
            placeholder="Recherche"
            autoComplete="off"
          />
        </View>
        {/* FILTER */}
        <View style={styles.filter}>
          <TouchableWithoutFeedback onPress={() => setFilterSelected(1)}>
            <Text style={filterSelected == 1 ? styles.selectedColor : styles.neutralColor}>
              Tous
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setFilterSelected(2)}>
            <Text style={filterSelected == 2 ? styles.selectedColor : styles.neutralColor}>
              Mes locataires
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setFilterSelected(3)}>
            <Text style={filterSelected == 3 ? styles.selectedColor : styles.neutralColor}>
              Nouveaux
            </Text>
          </TouchableWithoutFeedback>
        </View>
        {/* VIEWLIST */}
        <FlatList
          data={filteredList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <MessageCard
              name={item.name}
              lastName={item.lastName}
              id={item.id}
              lastMessage={item.lastMessage}
              navigation={navigation}
            />
          )}
          contentContainerStyle={styles.cardList}
          style={{ flexGrow: 1 }} // Add this line
        />
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
  title: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 25,
    color: 'white',
    width: '100%'
  },
  //CONTENT
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
    paddingHorizontal: 10,
    flex: 1 // Add this line
  },
  userProfile: {
    marginTop: '3%',
    marginBottom: '2%'
  },
  userTransaction: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: '#000000', // Make the space between cards white
    borderRadius: 10, // Optional: Add rounded corners
    padding: 10 // Optional: Add padding to the cards
  },
  cardContent: {
    flex: 1,
    marginLeft: 20
  },
  userName: {
    fontSize: 20,
    color: '#e6e6e6',
    fontWeight: 'bold'
  },
  lastMessage: {
    fontSize: 14,
    color: '#04BF7B'
  },
  phoneIcon: {
    position: 'absolute',
    right: 10
  },
  cardList: {
    paddingBottom: 40
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10
  },
  searchIcon: {
    marginRight: 10
  },
  searchBarInput: {
    flex: 1,
    fontSize: 16
  }
});

export default Messages;
