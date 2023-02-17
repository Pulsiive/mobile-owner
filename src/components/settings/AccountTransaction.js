import React, { Component, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';

import PulsiveCard from '../../globals/components/PulsiveCard';

const TransactionCard = () => {
  //Function to retrieve Username from API
  //Function to retrieve Date from API
  //Function to retrieve amount from API

  return (
    <View style={{ flexDirection: 'row', marginTop: '5%' }}>
      <Icon style={styles.userProfile} name="user" size={30} color="white" />
      <View style={{ marginLeft: '3%', marginTop: '1%' }}>
        <Text style={styles.userTransaction}>M.XXXX</Text>
        <Text style={{ color: '#686868' }}>Today - 18:21</Text>
      </View>
      <Text style={styles.amount}>+2.00€</Text>
    </View>
  );
};

const AccountTransaction = ({ navigation }) => {
  return (
    <View style={styles.viewTemplate}>
      <TouchableOpacity
        style={styles.walletTransactionDropdownInformationView}
        onPress={() => navigation.navigate('Wallet')}
      >
        <View style={styles.bar} />
        <Text style={styles.bottomTitle}>My account</Text>
        <PulsiveCard />
      </TouchableOpacity>
      <View style={{ height: '10%', backgroundColor: '#1F1F1F' }}>
        <Text style={styles.bottomTitle}>My transactions</Text>
      </View>
      <View style={styles.transactionScrollList}>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View>
              <TransactionCard />
              <TransactionCard />
              <TransactionCard />
              <TransactionCard />
              <TransactionCard />
              <TransactionCard />
              <TransactionCard />
              <TransactionCard />
            </View>
          </ScrollView>
        </SafeAreaView>
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

  // Head CONTENT
  walletTransactionDropdownInformationView: {
    padding: 10,
    marginTop: '18%',
    backgroundColor: '#1F1F1F',
    width: '100%',
    height: '40%',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50
  },
  bar: {
    marginLeft: '45%',
    height: '1%',
    width: '10%',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 20,
    opacity: 0.9
  },
  bottomTitle: {
    textAlign: 'center',
    fontSize: 30,
    color: '#F2F2F2',
    position: 'absolute',
    top: '2%',
    left: '5%'
  },

  // LIST
  transactionScrollList: {
    padding: 10,
    backgroundColor: '#1F1F1F',
    width: '100%',
    height: '50%'
  },
  container: {
    flex: 1
  },
  scrollView: {
    marginHorizontal: 20
  },
  transaction: {
    width: '100%',
    height: '100%'
  },
  userProfile: {
    backgroundColor: 'black',
    borderRadius: 50,
    marginTop: '5%',
    marginBottom: '2%'
  },
  userTransaction: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18
  },
  amount: {
    position: 'absolute',
    right: '3%',
    top: '30%',
    color: 'white',
    fontWeight: '500',
    fontSize: 17
  }
});

export default AccountTransaction;
