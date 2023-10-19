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
import Icon from 'react-native-vector-icons/dist/AntDesign';
import api from '../../globals/query/API';

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
      {props.messageList.map((elem) => (
        <View>
          {deleteConfirm.value &&
          deleteConfirm.message.id == elem.id &&
          deleteConfirm.message.mine == true ? (
            <Pressable onPress={() => deleteMessageRequest()}>
              <Icon
                style={{ marginTop: '2%', marginLeft: '0%' }}
                name="delete"
                size={25}
                color="red"
              />
            </Pressable>
          ) : null}
          <Pressable
            onPress={() => setDeleteConfirm({ value: !deleteConfirm.value, message: elem })}
          >
            <Text style={elem.mine ? styles.myMessageCard : styles.otherMessageCard}>
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
      }
    }
    fetchMessages();

    console.log(messageList);
  }, [render]);

  return (
    <View style={styles.viewTemplate}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => navigation.navigate('Messages')}>
          <Text style={styles.backButtonContent}>{'<'}</Text>
        </Pressable>
        <View style={{ width: '100%' }}>
          <Text style={styles.title}>
            {userProps.user.name} {userProps.user.lastName}
          </Text>
          <Text style={styles.id}>{userProps.user.id}</Text>
        </View>
      </View>
      {/* CONTENT */}
      <View style={styles.container}>
        {/* VIEWLIST */}
        <View style={styles.scrollList}>
          <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
              <Corechat messageList={messageList} update={setRender} />
            </ScrollView>
          </SafeAreaView>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setUserMessage(text)}
            onSubmitEditing={submit}
            placeholder="Type your message..."
          >
            {userMessage}
          </TextInput>
          <TouchableHighlight onPress={submit}>
            <Icon
              style={{ marginLeft: '9%', marginTop: '33%' }}
              name="send"
              size={30}
              color="lightblue"
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
    height: '85%'
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
    marginLeft: '3%',
    marginBottom: '2%'
  }
});

export default PrivateMessages;
