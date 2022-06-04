import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  Pressable,
  TouchableWithoutFeedback,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const MessageCard = (props) => {
  //Function to retrieve Username from API
  //Function to retrieve Date from API
  //Function to retrieve Messages from API

  return (
    <View style={{ flexDirection: 'row', marginTop: '3%' }}>
      <Icon style={styles.userProfile} name="user" size={30} color="white" />
      <View style={{ marginLeft: '10%', marginTop: '1%' }}>
        <Text style={styles.userTransaction}>{props.name}</Text>
        <Text style={{ color: '#686868' }}>{props.lastMessage}</Text>
      </View>
      <Text style={styles.amount}>+2.00€</Text>
    </View>
  );
};

const Messages = ({ navigation }) => {
  const [filterSelected, setFilterSelected] = useState(1);
  //   const [userInput, setUserInput] = useState({
  //     email: '',
  //     password: ''
  //   });
  //   const [errorMessage, setErrorMessage] = useState('');
  //   const [error, setError] = useState(false);

  //   const handleChange = (text, field) => {
  //     if (error) setError(false);
  //     userInput[field] = text;
  //     setUserInput(userInput);
  //   };

  return (
    <View style={styles.viewTemplate}>
      {/* HEADER */}
      <View style={styles.headWalletInformation}>
        <Pressable style={styles.backButton} onPress={() => navigation.navigate('HomePage')}>
          <Text style={styles.backButtonContent}>{'<'}</Text>
        </Pressable>
        <Text style={styles.title}>Messages</Text>
      </View>
      {/* CONTENT */}
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={{}}
          placeholder="Research"
          autoComplete="username"
        />
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

        <View style={styles.scrollList}>
          <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
              <View>
                <MessageCard name={'John'} lastMessage={'Hi there !'} />
                <MessageCard name={'Eric'} lastMessage={'Are you available soon ?'} />
                <MessageCard
                  name={'Joffrey'}
                  lastMessage={'I need to book an appointment for today is it okay ?'}
                />
                <MessageCard name={'Esther'} lastMessage={'I will pass by in 20 minutes !'} />
                <MessageCard name={'John'} lastMessage={'Hi there !'} />
                <MessageCard name={'Eric'} lastMessage={'Are you available soon ?'} />
                <MessageCard
                  name={'Joffrey'}
                  lastMessage={'I need to book an appointment for today is it okay ?'}
                />
                <MessageCard name={'Esther'} lastMessage={'I will pass by in 20 minutes !'} />
                <MessageCard name={'John'} lastMessage={'Hi there !'} />
                <MessageCard name={'Eric'} lastMessage={'Are you available soon ?'} />
                <MessageCard
                  name={'Joffrey'}
                  lastMessage={'I need to book an appointment for today is it okay ?'}
                />
                <MessageCard name={'Esther'} lastMessage={'I will pass by in 20 minutes !'} />
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
    width: '80%'
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
