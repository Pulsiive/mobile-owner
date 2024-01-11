import React, { useEffect, useState, useRef } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Modal,
  Pressable,
  Image
} from 'react-native';
import { format } from 'date-fns';
import data from './agenda.json';
import calendar from './Asset/calendar.png';
import bill from './Asset/bill.png';
import api from '../../globals/query/API';
import { id } from 'date-fns/locale';
import { useFocusEffect } from '@react-navigation/native';

const FetchInfo = ({ date, data, openDate, setSlot }) => {
  const firstOpacity = useRef(new Animated.Value(0)).current;
  const TranslationUp = useRef(new Animated.Value(-20)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [reservationDeletionInfo, setReservationDeletionInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(()=> {
    try {
      setLoading(false)

    } catch (e) {
      alert(e)
    }
  }, [data[date]])

  const setModal = (event) => {
    setModalVisible(true);
  };

  async function submitDeletion() {
    try {
      console.log('deleting slot reservation ', reservationDeletionInfo.slotId);
      console.log('/api/v1/slot' + reservationDeletionInfo.slotId);
      const res = await api.send(
        'delete',
        '/api/v1/slot/' + reservationDeletionInfo.slotId,
        '',
        (auth = true)
      );

      if (res.status === 200) {
        setSlot((prevSlot) => {console.log(prevSlot)})
        console.log('Slot has been deleted.');
      } else {
        throw res;
      }
    } catch (e) {
      console.log(e);
      alert(`Deletion Error: ${e}`);
    }
    setModalVisible(false);
  }

  firstOpacity.setValue(0);
  TranslationUp.setValue(-20);
  Animated.parallel([
    Animated.timing(TranslationUp, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }),

    Animated.timing(firstOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    })
  ]).start();

  return (
    <ScrollView style={{ top: 30 }}>
      {data[date] &&
        data[date].map((plan) => {
          console.log(plan)
          return (
            <Pressable
              style={{ width: '100%', marginTop:30, height: '90%'}}
              onPress={() => {
                setReservationDeletionInfo(plan);
                plan.isBooked ? setModalVisible(false) : setModalVisible(true);
              }}
              key={plan.id}
            >
              <Animated.View
                style={[
                  plan.isBooked ? styles.itemBookedContainer : styles.itemContainer,
                  // { opacity: firstOpacity, transform: [{ translateY: TranslationUp }] }
                ]}
              >
                <View style={{marginLeft: 30}}>
                  <Text style={styles.name}>Borne {plan.Name.slice(0, 2)}</Text>
                  <Text style={{color: 'white', fontWeight: '700'}}>{plan.price} € ({plan.pricePerMin} € / Min)</Text>
                  {/*<Image style={styles.picture} source={{ uri: plan.picture }}></Image>*/}
                  <View style={styles.firstRow}>
                    <Image style={styles.rendCalendar} source={calendar}></Image>
                    <Text style={styles.Txtduration}>
                      {plan.date} - {plan.Hour}
                    </Text>
                  </View>
                </View>
              </Animated.View>
            </Pressable>
          );
        })}
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}
      >
        <View style={styles.modal}>
          <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: '800'}}>
              Souhaitez-vous supprimer cette réservation ?
            </Text>
            <Pressable
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={{ color: 'red', fontSize: 20 }}>X</Text>
            </Pressable>
          </View>
          <Text style={{ color: 'grey', fontSize: 12, marginTop: '5%' }}>
            Slot Id: {reservationDeletionInfo.slotId}
          </Text>
          <Text style={{ color: 'grey', fontSize: 12, marginTop: '5%' }}>
            Station Id: {reservationDeletionInfo.Name}
          </Text>
          <Text style={{ color: 'grey', fontSize: 12, marginTop: '5%' }}>
            Date: {reservationDeletionInfo.date} - {reservationDeletionInfo.Hour}
          </Text>
          <Pressable onPress={submitDeletion}>
            <View
              style={{
                width: '60%',
                alignItems: 'center',
                marginLeft: '20%',
                borderRadius: 15,
                backgroundColor: '#6EBF34',
                marginTop: 90,
              }}
            >
              <Text style={{ color: 'white', marginTop: '0%', fontSize: 15, padding: 8}}>
                Confirm Deletion
              </Text>
            </View>
          </Pressable>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  safe: {},
  picture: {
    position: 'absolute',
    right: -130,
    top: -5,
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 50
  },
  name: {
    color: 'white',
    position: 'absolute',
    fontWeight: '700',
    fontSize: 15,
    top: -20,
  },
  itemContainer: {
    backgroundColor: '#7FCB2B',
    margin: 5,
    marginTop: 20,
    width: '92%',
    height: 98,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'flex-start',
    overflow: 'hidden'
  },
  itemBookedContainer: {
    backgroundColor: 'grey',
    marginTop: 20,
    width: '92%',
    height: 98,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'flex-start',
    overflow: 'hidden'
  },
  rendCalendar: {
    width: 14,
    height: 11,
    top: 4,
  },
  firstRow: {
    top: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  Txtduration: {
    color: 'white',
    marginLeft: 10,
  },
  modal: {
    top: '30%',
    padding: 20,
    left: '5%',
    backgroundColor: 'white',
    height: '40%',
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D4D4D4',
  }
});

export default FetchInfo;
