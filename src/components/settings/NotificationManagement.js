import React, { useState, useEffect } from 'react';
import {
  Image,
  View,
  Text,
  Pressable,
  Button,
  StyleSheet,
  Switch,
  TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon5 from 'react-native-vector-icons/dist/FontAwesome5';

const Section1 = () => {
  const [isNotificationOn, setIsNotificationOn] = useState(false);
  const toggleNotification = () => setIsNotificationOn((previousState) => !previousState);

  const [isNewsletterOn, setIsNewsletterOn] = useState(false);
  const toggleNewsletter = () => setIsNewsletterOn((previousState) => !previousState);

  const [isUnsubscribeOn, setIsUnsubscribeOn] = useState(false);
  const toggleUnsubscribe = () => setIsUnsubscribeOn((previousState) => !previousState);

  return (
    <View style={styles.viewTemplate}>
      <Text
        style={{
          color: 'white',
          fontWeight: '500',
          fontSize: 18,
          marginBottom: '5%',
          marginLeft: '6%'
        }}
      >
        Tips and recommandation
      </Text>
      <Text
        style={{
          color: 'grey',
          fontWeight: '400',
          fontSize: 16,
          marginBottom: '10%',
          marginLeft: '3%'
        }}
      >
        Get special recommandation from Pulsive newsletter for your next appointment or reservation
        !
      </Text>
      <View
        style={{
          height: '12%',
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#292929'
        }}
      >
        <View style={{ width: '80%', marginTop: '3%' }}>
          <Text
            style={{
              color: 'white',
              fontWeight: '300',
              fontSize: 15,
              marginBottom: '5%',
              marginLeft: '6%'
            }}
          >
            Inspiration and offers
          </Text>
          <Text style={{ marginLeft: '3%', color: 'grey' }}>get recommandation from pulsive</Text>
        </View>

        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isNotificationOn ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleNotification}
          value={isNotificationOn}
        />
      </View>
      <View
        style={{
          height: '12%',
          width: '100%',
          marginTop: '10%',
          flexDirection: 'row',
          backgroundColor: '#292929'
        }}
      >
        <View style={{ width: '80%', marginTop: '3%' }}>
          <Text
            style={{
              color: 'white',
              fontWeight: '300',
              fontSize: 15,
              marginBottom: '5%',
              marginLeft: '6%'
            }}
          >
            Pulsive newsletter
          </Text>
          <Text style={{ marginLeft: '3%', color: 'grey' }}>
            All the latest news and release from Pulsive
          </Text>
        </View>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isNewsletterOn ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleNewsletter}
          value={isNewsletterOn}
        />
      </View>
      <View
        style={{
          height: '12%',
          width: '100%',
          marginTop: '10%',
          flexDirection: 'row',
          backgroundColor: '#292929'
        }}
      >
        <View style={{ width: '80%', marginTop: '3%' }}>
          <Text
            style={{
              color: 'white',
              fontWeight: '300',
              fontSize: 15,
              marginBottom: '5%',
              marginLeft: '6%'
            }}
          >
            Unsubscribe from offers and newsletter
          </Text>
          <Text style={{ marginLeft: '3%', color: 'grey' }}>
            I don't want to receive any news anymore
          </Text>
        </View>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isUnsubscribeOn ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleUnsubscribe}
          value={isUnsubscribeOn}
        />
      </View>
    </View>
  );
};

const Section2 = () => {
  const [isActivityOn, setIsActivityOn] = useState(false);
  const toggleActivity = () => setIsActivityOn((previousState) => !previousState);

  const [isRappelOn, setIsRappelOn] = useState(false);
  const toggleRappel = () => setIsRappelOn((previousState) => !previousState);

  const [isMessagesOn, setIsMessagesOn] = useState(false);
  const toggleMessages = () => setIsMessagesOn((previousState) => !previousState);

  return (
    <View style={styles.viewTemplate}>
      <Text
        style={{
          color: 'white',
          fontWeight: '500',
          fontSize: 18,
          marginBottom: '5%',
          marginLeft: '6%'
        }}
      >
        Account related notification
      </Text>
      <Text
        style={{
          color: 'grey',
          fontWeight: '400',
          fontSize: 16,
          marginBottom: '10%',
          marginLeft: '3%'
        }}
      >
        Confirm your reservation, check the activity of your account and set reminders for the
        incoming messages or reservation.
      </Text>
      <View
        style={{ height: '12%', width: '100%', flexDirection: 'row', backgroundColor: '#292929' }}
      >
        <View style={{ width: '80%', marginTop: '3%' }}>
          <Text
            style={{
              color: 'white',
              fontWeight: '300',
              fontSize: 15,
              marginBottom: '5%',
              marginLeft: '6%'
            }}
          >
            Account activity
          </Text>
          <Text style={{ marginLeft: '3%', color: 'grey' }}>
            get information on your account activty
          </Text>
        </View>

        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isActivityOn ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleActivity}
          value={isActivityOn}
        />
      </View>
      <View
        style={{
          height: '12%',
          width: '100%',
          marginTop: '10%',
          flexDirection: 'row',
          backgroundColor: '#292929'
        }}
      >
        <View style={{ width: '80%', marginTop: '3%' }}>
          <Text
            style={{
              color: 'white',
              fontWeight: '300',
              fontSize: 15,
              marginBottom: '5%',
              marginLeft: '6%'
            }}
          >
            Rappels
          </Text>
          <Text style={{ marginLeft: '3%', color: 'grey' }}>
            get reminder for incoming reservation
          </Text>
        </View>

        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isRappelOn ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleRappel}
          value={isRappelOn}
        />
      </View>
      <View
        style={{
          height: '12%',
          width: '100%',
          marginTop: '10%',
          flexDirection: 'row',
          backgroundColor: '#292929'
        }}
      >
        <View style={{ width: '80%', marginTop: '3%' }}>
          <Text
            style={{
              color: 'white',
              fontWeight: '300',
              fontSize: 15,
              marginBottom: '5%',
              marginLeft: '6%'
            }}
          >
            Messages
          </Text>
          <Text style={{ marginLeft: '3%', color: 'grey' }}>
            get notifications for incoming messages
          </Text>
        </View>

        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isMessagesOn ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleMessages}
          value={isMessagesOn}
        />
      </View>
    </View>
  );
};

const NotificationManagement = ({ navigation }) => {
  const [filterSelected, setFilterSelected] = useState(1);

  return (
    <View style={{ height: '100%', width: '100%', backgroundColor: '#0D0D0D' }}>
      <View style={styles.headWalletInformation}>
        <View style={{ width: '100%', flexDirection: 'row' }}>
          <Text style={styles.title}>Notifications</Text>
        </View>
      </View>
      <View style={styles.filter}>
        <TouchableWithoutFeedback onPress={() => setFilterSelected(1)}>
          <Text style={filterSelected == 1 ? styles.selectedColor : styles.neutralColor}>Mail</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setFilterSelected(2)}>
          <Text style={filterSelected == 2 ? styles.selectedColor : styles.neutralColor}>
            Compte
          </Text>
        </TouchableWithoutFeedback>
      </View>
      {filterSelected == 1 ? <Section1 /> : <Section2 />}
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
    marginTop: '5%',
    width: '100%',
    height: '10%'
  },

  title: {
    textAlign: 'center',
    fontWeight: '600',
    marginLeft: '5%',
    fontSize: 25,
    color: 'white'
  },

  //CONTENT
  container: {
    marginTop: '3%',
    height: '90%'
  },
  sectionTitle: {
    color: 'white',
    fontWeight: '200',
    fontSize: 18,
    marginBottom: '3%',
    marginLeft: '7%'
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
  }
});

export default NotificationManagement;
