import React, { useEffect, useState } from 'react';
import {
  TextInput,
  View,
  Text,
  Pressable,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator, // Import the ActivityIndicator component
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import api from '../../globals/query/API';
import * as Animatable from 'react-native-animatable';

const Corechat = (props) => {
  const [deleteConfirm, setDeleteConfirm] = useState({ value: false, message: {} });
  const deleteMessageRequest = async () => {
    try {
      console.log('Deleting msg :', '/api/v1/profile/message/' + deleteConfirm.message.id);
      const body = { id: props.id };
      const res = await api.send(
        'DELETE',
        '/api/v1/profile/message/' + deleteConfirm.message.id,
        body,
        (auth = true)
      );
      console.log(res);
      if (res.status == 200) {
        console.log('Message has been deleted.');
        setDeleteConfirm({ value: false, message: {} });
        props.update(true);
      } else {
        throw res;
      }
    } catch (e) {
      console.log('Error: ', e);
    }
  };

  return (
    <View>
      <View style={{ marginVertical: 10 }}/> 
      {props.messageList.map((elem) => (
        <View>
          {deleteConfirm.value &&
          deleteConfirm.message.id == elem.id &&
          deleteConfirm.message.mine == true ? (
            <Pressable onPress={() => deleteMessageRequest()}>
              <Icon
                style={{ marginTop: '2%', marginLeft: '0%' }}
                name="erase"
                size={25}
                color="red"
              />
            </Pressable>
          ) : null}
          <Pressable
            onPress={() => setDeleteConfirm({ value: !deleteConfirm.value, message: elem })}
          >
            <Text style={elem.mine ? styles.userMessageBubble : styles.otherMessageBubble}>
              {elem.message}
            </Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
};

const PrivateMessages = ({ route, navigation }) => {
  const userProps = route.params;
  const [userMessage, setUserMessage] = useState('');
  const [messageList, setMessageList] = useState([
    { mine: false, message: 'Seems like it is empty !' },
    { mine: false, message: 'Start a new conversation by sending the first message' },
    { mine: true, message: 'Your first message...' }
  ]);
  const [render, setRender] = useState(true);

  const [loading, setLoading] = useState(true);

  console.log('userProps: ', userProps);
  const submit = async () => {
    // messageList.push({ mine: true, message: userMessage });
    try {
      if (userMessage.length < 1) return;
      const body = {
        message: { receiverId: userProps.user.id, body: userMessage, createdAt: new Date() }
      };
      console.log(body);
      const res = await api.send('POST', '/api/v1/profile/message', body, (auth = true));

      console.log(res);
      if (res.status == 200) {
        console.log('Message has been sent.');
        setUserMessage('');
        setRender(true);
      } else {
        throw res;
      }
    } catch (e) {
      console.log('Error: ', e);
    }
  };

  useEffect(() => {
    console.log('re-redering');
    async function fetchMessages() {
      try {
        const res = await api.send('GET', '/api/v1/profile/messages', null, true);
        console.log('data messages: ', res.data);
        // console.log('data sent: ', res.data.sentMessages);
        console.log('length message sent: ', res.data.sentMessages.length);
        console.log('-------------------');
        // console.log('data sent: ', res.data.receivedMessages);
        console.log('length message received: ', res.data.receivedMessages.length);

        if (res.status == 200) {
          const tmpMsgList = [];
          // PARSING SENT MESSAGES
          console.log(res.status);

          for (let i = 0; i < res.data.sentMessages.length; i++) {
            if (res.data.sentMessages[i].receiverId == userProps.user.id)
              tmpMsgList.push({
                mine: true,
                id: res.data.sentMessages[i].id,
                message: res.data.sentMessages[i].body,
                createdAt: res.data.sentMessages[i].createdAt,
                authorId: res.data.sentMessages[i].authorId
              });
          }
          console.log('parse 1');
          // PARSING RECEIVED MESSAGES
          console.log(userProps.user.id, userProps.user.name);
          for (let i = 0; i < res.data.receivedMessages.length; i++) {
            // if (res.data.sentMessages[i].receiverId == userProps.user.id)
            console.log(res.data.receivedMessages[i]);
            if (res.data.receivedMessages[i].authorId == userProps.user.id)
              tmpMsgList.push({
                mine: false,
                id: res.data.receivedMessages[i].id,
                message: res.data.receivedMessages[i].body,
                createdAt: res.data.receivedMessages[i].createdAt,
                authorId: res.data.receivedMessages[i].authorId
              });
          }
          console.log('parse 2');

          console.log('Message got from backend : ', tmpMsgList);
          if (tmpMsgList.length > 0) {
            tmpMsgList.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            console.log(tmpMsgList.map((o) => o.createdAt));
            setMessageList(tmpMsgList);
          }
        } else {
          throw res;
        }
        setRender(false);
      } catch (e) {
        const code = e.status;
        alert('Error ', code, ': Messages could not be fetched');
      } finally {
        // Simulate a delay of 3 seconds before setting loading to false
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    }
    fetchMessages();

    console.log(messageList);
  }, [render]);

  return (
    <View style={styles.viewTemplate}>

      <View style={{ marginTop: 0, padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
      <Icon name="chevron-with-circle-left" size={30} style={styles.sendIcon} onPress={() => navigation.navigate('Messages')}/>
      <Animatable.View animation="pulse" iterationCount="infinite">
        <TouchableOpacity
          style={{
            backgroundColor: '#1a1a1a',
            paddingHorizontal: 20,
            paddingVertical: 10,
            shadowColor: 'white',
            shadowOffset: { width: 0, height: 4 }, 
            shadowOpacity: 1, 
            shadowRadius: 4,
            borderRadius: 10,
            marginHorizontal: 10,
            elevation: 10, 
          }}
        >
          <Text style={{color: 'white', fontWeight: 'bold',}}> {userProps.user.name} {userProps.user.lastName} </Text>
        </TouchableOpacity>
      </Animatable.View> 
        </View>

      {/* Loading Indicator */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#04BF7B" />
        </View>
      )}

      {/* CONTENT */}
      {!loading && (
      <View style={styles.container}>
        <View style={styles.scrollList}>
          <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
              <Corechat messageList={messageList} update={setRender} />
            </ScrollView>
          </SafeAreaView>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setUserMessage(text)}
            placeholder="Your message..."
            value={userMessage}
          />
          <Icon name="paper-plane" size={25} style={styles.sendIcon} onPress={submit} />
        </View>
      </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  viewTemplate: {
    backgroundColor: 'black',
    width: '100%',
    height: '95%'
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
  id: {
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 13,
    color: 'grey',
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
    height: '85%',
  },
  container: {
    flex: 1,
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
  inputView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  sendIcon: {
    padding: 10,
    color: 'white'
  },
  input: {
    height: 40,
    borderColor: 'transparent',
    borderWidth: 1,
    color: 'black',
    flex: 1,
    borderRadius: 15,
    paddingLeft: 15,
    backgroundColor: 'white',
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4, 
    elevation: 10, 
    marginLeft: 15,
  },
  userMessageBubble: {
    backgroundColor: '#4FC3F7',
    color: 'white',
    borderRadius: 15,
    padding: 10, 
    maxWidth: '70%',
    alignSelf: 'flex-end',
    marginBottom: 10, 
    fontSize: 16,
  },
  otherMessageBubble: {
    backgroundColor: '#DCF8C6',
    color: 'black', 
    borderRadius: 15, 
    padding: 10, 
    maxWidth: '70%',
    alignSelf: 'flex-start', 
    marginBottom: 10, 
    fontSize: 16, 
  },
});

export default PrivateMessages;
