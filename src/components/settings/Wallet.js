import React, { Component, useState } from 'react';
import {
  Image,
  View,
  Text,
  TouchableWithoutFeedback,
  Button,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

import WalletHead from './wallet/WalletHead';
import PulsiveCard from '../../globals/components/PulsiveCard';

const WalletGraph = () => {
  const [filterSelected, setFilterSelected] = useState(1);

  return (
    <View style={styles.walletGraphInformationView}>
      <View style={styles.walletGraphFilter}>
        <TouchableWithoutFeedback onPress={() => setFilterSelected(1)}>
          <Text style={filterSelected == 1 ? styles.selectedColor : styles.neutralColor}>
            This week
          </Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setFilterSelected(2)}>
          <Text style={filterSelected == 2 ? styles.selectedColor : styles.neutralColor}>
            Last month
          </Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setFilterSelected(3)}>
          <Text style={filterSelected == 3 ? styles.selectedColor : styles.neutralColor}>All</Text>
        </TouchableWithoutFeedback>
      </View>
      {/* TEMPORARY  */}
      <View style={{ width: '90%', height: '100%', marginLeft: '5%' }}>
        <Text style={{ color: 'white', marginTop: '30%', marginLeft: '30%' }}>
          Data not available for now
        </Text>
      </View>
    </View>
  );
};

const WalletBottomDrawer = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={styles.walletTransactionDropdownInformationView}
      onPress={() => navigation.navigate('AccountTransaction')}
    >
      <View>
        <View style={styles.bar} />
        <Text style={styles.bottomTitle}>My account</Text>
        <PulsiveCard height={'68%'} width={'85%'} />
      </View>
    </TouchableOpacity>
  );
};

const Wallet = ({ navigation }) => {
  return (
    <View style={styles.viewTemplate}>
      <WalletHead navigation={navigation} />
      <WalletGraph />
      <WalletBottomDrawer navigation={navigation} />
    </View>
  );
};
// }

const styles = StyleSheet.create({
  viewTemplate: {
    backgroundColor: '#0D0D0D',
    width: '100%',
    height: '100%'
  },

  // MAIN CONTENT
  walletGraphInformationView: {
    padding: 10,
    marginTop: '18%',
    width: '100%',
    height: '30%'
  },
  walletGraphFilter: {
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

  // Bottom CONTENT
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
    top: '7%',
    left: '5%'
  },
  tinyLogo: {
    position: 'absolute',
    top: '25%',
    left: '45%',
    width: 200,
    height: 100
  }
});

export default Wallet;
