import React from 'react';
import { View, Text, TouchableWithoutFeedback, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';

const WalletHead = ({ navigation }) => {
  return (
    <View style={styles.headWalletInformation}>
      <Pressable style={styles.backButton} onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.backButtonContent}>{'<'}</Text>
      </Pressable>
      <Text style={styles.title}>My Wallet</Text>
      {/* this amount should be loaded from api */}
      <Text style={styles.amount}> € 210.00</Text>
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Profile')}>
        <Icon style={styles.userProfileButton} name="user" size={30} color="white" />
      </TouchableWithoutFeedback>
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
  headWalletInformation: {
    padding: 10,
    marginTop: '8%',
    width: '100%',
    height: '10%'
  },
  title: {
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 25,
    color: '#F2F2F2',
    position: 'absolute',
    top: '10%',
    left: '18%'
  },
  amount: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 30,
    color: '#F2F2F2',
    position: 'absolute',
    top: '70%',
    left: '16%'
  },
  userProfileButton: {
    color: '#F2F2F2',
    position: 'absolute',
    top: '26%',
    left: '90%'
  }
});

export default WalletHead;
