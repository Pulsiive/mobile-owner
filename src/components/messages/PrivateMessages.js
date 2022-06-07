import React, { useEffect, useState } from 'react';
import {
  TextInput,
  View,
  Text,
  Pressable,
  TouchableHighlight,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const Corechat = (props) => {
  return (
    <View>
      {props.messageList.map((elem) => (
        <Text style={elem.mine ? styles.myMessageCard : styles.otherMessageCard}>
          {elem.message}
        </Text>
      ))}
    </View>
  );
};

const PrivateMessages = ({ navigation }) => {
  const [userMessage, setUserMessage] = useState('');
  const [messageList, setMessageList] = useState([
    { mine: false, message: 'Hi there !' },
    { mine: false, message: 'Ill be here soon !' },
    { mine: true, message: 'Ok !' }
  ]);

  const submit = () => {
    messageList.push({ mine: true, message: userMessage });
    setUserMessage('');
  };

  useEffect(() => {
    console.log('re-redering');
    console.log(messageList);
  });

  return (
    <View style={styles.viewTemplate}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.navigate('Messages')}>
          <Text style={styles.backButtonContent}>{'<'}</Text>
        </Pressable>
        <Text style={styles.title}>Eric</Text>
      </View>
      {/* CONTENT */}
      <View style={styles.container}>
        {/* VIEWLIST */}
        <View style={styles.scrollList}>
          <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
              <Corechat messageList={messageList} />
            </ScrollView>
          </SafeAreaView>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setUserMessage(text)}
            onSubmitEditing={submit}
            placeholder="Research"
          >
            {userMessage}
          </TextInput>
          <TouchableHighlight onPress={submit}>
            <Icon
              style={{ marginLeft: '9%', marginTop: '28%' }}
              name="send"
              size={30}
              color="white"
            />
          </TouchableHighlight>
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
  header: {
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
    height: '90%'
  },
  container: {
    flex: 1
  },
  scrollView: {
    marginHorizontal: 20
  },
  myMessageCard: {
    backgroundColor: '#04BF7B',
    color: 'white',
    borderRadius: 20,
    marginBottom: '5%',
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 15,
    width: '80%',
    marginLeft: '20%'
  },
  otherMessageCard: {
    borderColor: 'grey',
    borderWidth: 0.5,
    color: 'white',
    borderRadius: 20,
    marginBottom: '5%',
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 15,
    width: '80%'
  },
  input: {
    borderRadius: 15,
    backgroundColor: 'white',
    width: '85%',
    marginTop: '3%',
    marginLeft: '0%',
    marginBottom: '2%'
  }
});

export default PrivateMessages;
