import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Button, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Divider } from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';

const GeneralSection = () => {
  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);
  const [modal4Visible, setModal4Visible] = useState(false);

  return (
    <View style={styles.viewTemplate}>
      {/* ---------------------------------------------------------MODAL SECTION START ---------------------------------------------------------------------------- */}
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={modal1Visible}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}
      >
        <View style={styles.modal}>
          <View style={{ flexDirection: 'row', marginTop: '2%' }}>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: '800', marginLeft: '3%' }}>
              Personnal data
            </Text>
            <Pressable
              onPress={() => {
                setModal1Visible(false);
              }}
            >
              <Text style={{ color: 'red', fontSize: 20, marginLeft: '73%' }}>X</Text>
            </Pressable>
          </View>
          <Text
            style={{
              color: 'grey',
              fontSize: 20,
              marginLeft: '5%',
              marginTop: '10%',
              width: '80%'
            }}
          >
            You will receive your personnal data at your mail address.
          </Text>
        </View>
      </Modal>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={modal2Visible}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}
      >
        <View style={styles.modal}>
          <View style={{ flexDirection: 'row', marginTop: '2%' }}>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: '800', marginLeft: '3%' }}>
              Delete my account
            </Text>
            <Pressable
              onPress={() => {
                setModal2Visible(false);
              }}
            >
              <Text style={{ color: 'red', fontSize: 20, marginLeft: '67%' }}>X</Text>
            </Pressable>
          </View>
          <Text
            style={{
              color: 'grey',
              fontSize: 20,
              marginLeft: '5%',
              marginTop: '10%',
              width: '80%'
            }}
          >
            Are you sure to delete your account ?
          </Text>
        </View>
      </Modal>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={modal3Visible}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}
      >
        <View style={styles.modal}>
          <View style={{ flexDirection: 'row', marginTop: '2%' }}>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: '800', marginLeft: '3%' }}>
              Share
            </Text>
            <Pressable
              onPress={() => {
                setModal3Visible(false);
              }}
            >
              <Text style={{ color: 'red', fontSize: 20, marginLeft: '85%' }}>X</Text>
            </Pressable>
          </View>
          <Text
            style={{
              color: 'grey',
              fontSize: 20,
              marginLeft: '5%',
              marginTop: '10%',
              width: '80%'
            }}
          >
            Define how your account is shared
          </Text>
        </View>
      </Modal>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={modal4Visible}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}
      >
        <View style={styles.modal}>
          <View style={{ flexDirection: 'row', marginTop: '2%' }}>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: '800', marginLeft: '3%' }}>
              Services
            </Text>
            <Pressable
              onPress={() => {
                setModal4Visible(false);
              }}
            >
              <Text style={{ color: 'red', fontSize: 20, marginLeft: '70' }}>X</Text>
            </Pressable>
          </View>
          <Text
            style={{
              color: 'grey',
              fontSize: 20,
              marginLeft: '5%',
              marginTop: '10%',
              width: '80%'
            }}
          >
            Check your account linked services
          </Text>
        </View>
      </Modal>
      {/* ---------------------------------------------------------MODAL SECTION END ---------------------------------------------------------------------------- */}

      <View
        style={{
          height: '12%',
          width: '100%',
          flexDirection: 'row',
          //   backgroundColor: '#292929',
          marginTop: '10%'
        }}
      >
        <Pressable
          style={{ width: '100%', flexDirection: 'row' }}
          onPress={() => {
            console.log('i');
            setModal1Visible(true);
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
              Ask to receive personnal data
            </Text>
            <Text style={{ marginLeft: '3%', color: 'grey' }}>
              We will give you data about your personnal data from our database.
            </Text>
          </View>

          <Icon
            style={{ marginTop: '7%', marginLeft: '10%' }}
            name="angle-right"
            size={30}
            color="white"
          />
        </Pressable>
      </View>

      <Divider style={{ marginTop: '5%', width: '90%', marginLeft: '5%' }} />
      <View
        style={{
          height: '12%',
          width: '100%',
          marginTop: '5%',
          flexDirection: 'row'
          //   backgroundColor: '#292929'
        }}
      >
        <Pressable
          style={{ width: '100%', flexDirection: 'row' }}
          onPress={() => {
            setModal2Visible(true);
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
              Delete my acccount
            </Text>
            <Text style={{ marginLeft: '3%', color: 'grey' }}>
              Your account and data will be permanently deleted, under legal legislation.
            </Text>
          </View>
          <Icon
            style={{ marginTop: '7%', marginLeft: '10%' }}
            name="angle-right"
            size={30}
            color="white"
          />
        </Pressable>
      </View>
      <Divider style={{ marginTop: '5%', width: '90%', marginLeft: '5%' }} />

      <View
        style={{
          height: '12%',
          width: '100%',
          marginTop: '5%',
          flexDirection: 'row'
          //   backgroundColor: '#292929'
        }}
      >
        <Pressable
          style={{ width: '100%', flexDirection: 'row' }}
          onPress={() => {
            setModal3Visible(true);
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
              Share
            </Text>
            <Text style={{ marginLeft: '3%', color: 'grey' }}>
              Choose how your profile and activity are shared with other users.
            </Text>
          </View>
          <Icon
            style={{ marginTop: '7%', marginLeft: '10%' }}
            name="angle-right"
            size={30}
            color="white"
          />
        </Pressable>
      </View>
      <Divider style={{ marginTop: '5%', width: '90%', marginLeft: '5%' }} />

      <View
        style={{
          height: '12%',
          width: '100%',
          marginTop: '5%',
          flexDirection: 'row'
          //   backgroundColor: '#292929'
        }}
      >
        <Pressable
          style={{ width: '100%', flexDirection: 'row' }}
          onPress={() => {
            // setModal4Visible(true);
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
              Services
            </Text>
            <Text style={{ marginLeft: '3%', color: 'grey' }}>
              Consult and manage which services are connected to your Pulsive account.
            </Text>
          </View>
          <Icon
            style={{ marginTop: '7%', marginLeft: '10%' }}
            name="angle-right"
            size={30}
            color="white"
          />
        </Pressable>
      </View>
    </View>
  );
};

const Confidentiality = ({ navigation }) => {
  return (
    <View style={{ height: '100%', width: '100%', backgroundColor: '#0D0D0D' }}>
      <View style={styles.headWalletInformation}>
        <View style={{ width: '100%', flexDirection: 'row' }}>
          <Text style={styles.title}>Confidentiality</Text>
        </View>
      </View>
      <GeneralSection />
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
  },
  modal: {
    backgroundColor: 'white',
    height: '82%',
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    marginTop: '35%'
  }
});

export default Confidentiality;
