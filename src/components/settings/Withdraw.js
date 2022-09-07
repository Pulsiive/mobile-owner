import React, { Component, useState } from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Modal
} from 'react-native';

import Sound from 'react-native-sound';
import Slider from '@react-native-community/slider';

const Withdraw = ({ navigation }) => {
  const [amountSelected, setAmountSelected] = useState(0);
  const [maxAmount, setMaxAmount] = useState(200);
  const [iban, setIban] = useState('FRXX XXXX XXXX XXXX');
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  Sound.setCategory('Playback');

  var pay = new Sound('pay.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
  });

  const toggleSwitch = () => setIsSwitchEnabled((previousState) => !previousState);

  const handleChange = (text) => {
    setAmountInput(text);
    console.log(amountInput);
  };
  const handleChangeCard = (data) => {
    console.log(data);
    setPaymentMethod(data);
  };
  const setModal = (event) => {
    console.log(event);
    setModalVisible(true);
  };
  return (
    <View style={styles.viewTemplate}>
      <View style={{ width: '100%', height: '2%', backgroundColor: '#266400' }} />
      <View style={styles.headWalletInformation}>
        <Pressable style={styles.backButton} onPress={() => navigation.navigate('Wallet')}>
          <Text style={styles.backButtonContent}>{'<'}</Text>
        </Pressable>
        <Text
          style={{
            color: 'white',
            width: '40%',
            fontSize: 35,
            fontWeight: '700',
            marginLeft: '3%'
          }}
        >
          Withdraw
        </Text>
      </View>
      <View>
        <View style={{ marginTop: '20%' }}>
          <Text style={{ marginLeft: '13%', color: 'white', fontSize: 20 }}>IBAN:</Text>
          <TextInput
            accessibilityLabel="iban"
            onChangeText={(text) => setIban(text)}
            placeholder="Your account information"
            autoComplete="email"
            style={{
              marginTop: '2%',
              marginLeft: '10%',
              marginBottom: '15%',
              backgroundColor: 'white',
              borderRadius: 10,
              width: '80%'
            }}
            value={iban}
          />
          <Text style={{ marginLeft: '13%', color: 'white', fontSize: 20 }}>
            Amount: {amountSelected} €
          </Text>
          <Slider
            style={{ marginLeft: '10%', width: '80%', height: 40 }}
            value={amountSelected}
            onValueChange={(value) => setAmountSelected(value)}
            minimumValue={0}
            maximumValue={maxAmount}
            step={1}
            minimumTrackTintColor="white"
            maximumTrackTintColor="green"
          />
          <Text style={{ marginLeft: '72%', color: 'grey', fontSize: 10 }}>
            Balance: {maxAmount} €
          </Text>

          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginLeft: '13%', marginTop: '15%', color: 'white', fontSize: 20 }}>
              Monthly Withdrawal
            </Text>
            <View
              style={{
                backgroundColor: '#424242',
                height: 20,
                width: 20,
                marginLeft: '3%',
                marginTop: '16%',
                alignItems: 'center',
                borderRadius: 20
              }}
            >
              <Pressable
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <Text style={{ color: 'grey' }}>i</Text>
              </Pressable>
            </View>
          </View>
          <Modal
            animationType={'fade'}
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              console.log('Modal has been closed.');
            }}
          >
            <View style={styles.modal}>
              <View style={{ flexDirection: 'row', marginTop: '2%' }}>
                <Text style={{ color: 'black', fontSize: 20, fontWeight: '800', marginLeft: '3%' }}>
                  Monthly Withdrawal
                </Text>
                <Pressable
                  onPress={() => {
                    setModalVisible(false);
                  }}
                >
                  <Text style={{ color: 'red', fontSize: 20, marginLeft: '58%' }}>X</Text>
                </Pressable>
              </View>
              <Text style={{ color: 'grey', fontSize: 20, marginLeft: '5%', marginTop: '10%' }}>
                Your balance will be withdraw to your IBAN account every at the start of each month
                on the 5th
              </Text>
            </View>
          </Modal>

          <View style={{ marginBottom: '15%' }}>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isSwitchEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isSwitchEnabled}
              style={{ width: '23%' }}
            />
          </View>
        </View>
        <Pressable
          onPress={() => {
            if (amountSelected != 0) {
              pay.play((success) => {
                if (success) {
                  console.log('successfully finished playing');
                } else {
                  console.log('playback failed due to audio decoding errors');
                }
              });
              //Should play an animation
            }
            navigation.navigate('Wallet');
          }}
        >
          <View
            style={{
              width: '60%',
              alignItems: 'center',
              marginTop: '10%',
              marginLeft: '20%',
              borderRadius: 15,
              backgroundColor: '#6EBF34'
            }}
          >
            <Text style={{ color: 'white', marginTop: '0%', fontSize: 20 }}>Confirm Withdraw</Text>
          </View>
        </Pressable>
        <View
          style={{
            height: 150,
            width: 150,
            backgroundColor: '#266400',
            borderRadius: 100,
            position: 'absolute',
            top: '65%',
            right: '-20%'
          }}
        ></View>
        <Image
          style={{ width: 100, height: 100, position: 'absolute', top: '108%', left: '0%' }}
          source={require('../../images/bottom_left_corner.png')}
        />
      </View>
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
    flexDirection: 'row',
    padding: 10,
    width: '100%',
    height: '10%',
    backgroundColor: '#266400',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  modal: {
    backgroundColor: 'white',
    height: '25%',
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    marginTop: '65%',
    marginLeft: '10%'
  },
  selectedCard: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: '5%',
    backgroundColor: '#CDCDCD'
  },
  nonSelectedCard: {
    flexDirection: 'row',
    marginBottom: '5%',
    backgroundColor: 'white'
  }
});

export default Withdraw;
