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

type Props = {
  date: Date;
};

type Item = {
  name: string;
};

const FetchInfo: React.FC<Props> = ({ date }) => {
  const firstOpacity = useRef(new Animated.Value(0)).current;
  const TranslationUp = useRef(new Animated.Value(-20)).current;
  const [items, setItems] = useState<{ [key: string]: Item[] }>({ data });
  const [modalVisible, setModalVisible] = useState(false);
  const [reservationDeletionInfo, setReservationDeletionInfo] = useState({});

  useEffect(() => {
    function fillAgendaWithReservations(slot) {
      items.data = {};
      console.log('filling agenda');
      let isAlreadyInAgenda = false;

      for (let index = 0; index < slot.length; index++) {
        ///////////////////////////////////////////////////////////////////////
        //    Error checking to see if slot is already contained in Agenda    /
        for (const idToCheck in items.data[slot[index].date]) {
          if (parseInt(items.data[slot[index].date][idToCheck].id) == index)
            isAlreadyInAgenda = true;
        }
        if (isAlreadyInAgenda) {
          isAlreadyInAgenda = false;
          break;
        }
        ///////////////////////////////////////////////////////////////////////
        if (items.data[slot[index].date] == undefined) items.data[slot[index].date] = [];
        items.data[slot[index].date].push({
          date: slot[index].date,
          id: index,
          Hour: slot[index].opensAt + ' -> ' + slot[index].closeAt,
          Name: slot[index].stationId,
          picture:
            'https://thumbs.dreamstime.com/b/jeune-femme-heureuse-de-brunette-avec-le-sourire-%C3%A9tonnant-26038696.jpg',
          content: 'Content goes here...',
          isBooked: slot[index].isBooked,
          slotId: slot[index].id
        });
        console.log('pushed one new object');
      }
      console.log(items.data);
    }

    async function fetchSlot() {
      try {
        console.log('Fetching owner slot reservation to display');
        const slotParsed = [];
        const res = await api.send('GET', '/api/v1/slot', null, true);

        if (res.status == 200) {
          for (var index = 0; index < res.data.length; index++) {
            slotParsed.push({
              id: res.data[index].id,
              stationId: res.data[index].stationPropertiesId,
              date: res.data[index].opensAt.split('T')[0],
              opensAt: res.data[index].opensAt.split('T')[1].split('.')[0],
              closeAt: res.data[index].closesAt.split('T')[1].split('.')[0],
              isBooked: res.data[index].isBooked
            });
          }
          console.log('slotParsed: ', slotParsed);
          fillAgendaWithReservations(slotParsed);
        } else {
          throw res;
        }
      } catch (e) {
        alert(e);
      }
    }
    fetchSlot();
  });

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

      if (res.status == 200) {
        console.log('Slot has been deleted.');
      } else {
        throw res;
      }
    } catch (e) {
      console.log(e);
      alert(e);
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
    <ScrollView style={{ top: -30 }}>
      {items.data[date].map((plan) => {
        if (plan.id === 'undefined') {
          return (
            <View>
              <Text style={{ color: 'white' }}>Nothing</Text>
            </View>
          );
        } else if (plan.id < 0) {
          return <View></View>;
        }
        return (
          <Pressable
            style={{ width: '100%' }}
            onPress={() => {
              setReservationDeletionInfo(plan);
              plan.isBooked ? setModalVisible(false) : setModalVisible(true);
            }}
          >
            <Animated.View
              style={[
                plan.isBooked ? styles.itemBookedContainer : styles.itemContainer,
                { opacity: firstOpacity, transform: [{ translateY: TranslationUp }] }
              ]}
              key={plan.id}
            >
              <View>
                <Image style={styles.picture} source={{ uri: plan.picture }}></Image>
                <Text style={styles.name}>{plan.Name}</Text>
                <View style={styles.firstRow}>
                  <Image style={styles.rendCalendar} source={calendar}></Image>
                  <Text style={styles.Txtduration}>
                    {plan.date} - {plan.Hour}
                  </Text>
                </View>
                <View style={styles.secondRow}>
                  <Image style={styles.rendbill} source={bill}></Image>
                  <Text style={styles.Txtbill}>{plan.content}</Text>
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
          <View style={{ flexDirection: 'row', marginTop: '2%' }}>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: '800', marginLeft: '3%' }}>
              Delete reservation.
            </Text>
            <Pressable
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={{ color: 'red', fontSize: 20, marginLeft: '58%' }}>X</Text>
            </Pressable>
          </View>
          <Text style={{ color: 'grey', fontSize: 20, marginLeft: '3%', marginTop: '5%' }}>
            Slot Id: {reservationDeletionInfo.slotId}
          </Text>
          <Text style={{ color: 'grey', fontSize: 20, marginLeft: '3%', marginTop: '5%' }}>
            Station Id: {reservationDeletionInfo.Name}
          </Text>
          <Text style={{ color: 'grey', fontSize: 20, marginLeft: '3%', marginTop: '5%' }}>
            Date: {reservationDeletionInfo.date} - {reservationDeletionInfo.Hour}
          </Text>
          <Pressable onPress={submitDeletion}>
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
              <Text style={{ color: 'white', marginTop: '0%', fontSize: 20 }}>
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
    marginLeft: 20
  },
  itemContainer: {
    backgroundColor: '#7FCB2B',
    margin: 5,
    marginTop: 20,
    width: 92 + '%',
    height: 98,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'flex-start',
    overflow: 'hidden'
  },
  itemBookedContainer: {
    backgroundColor: 'grey',
    margin: 5,
    marginTop: 20,
    width: 92 + '%',
    height: 98,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'flex-start',
    overflow: 'hidden'
  },
  rendCalendar: {
    width: 14,
    height: 11,
    top: 4
  },
  firstRow: {
    top: 10,
    left: 20,
    display: 'flex',
    flexDirection: 'row'
  },
  Txtduration: {
    marginLeft: 10,
    color: 'white'
  },
  secondRow: {
    top: 20,
    left: 20,
    display: 'flex',
    flexDirection: 'row'
  },
  rendbill: {
    width: 14,
    height: 11,
    top: 4
  },
  Txtbill: {
    marginLeft: 10,
    color: 'white'
  },
  modal: {
    backgroundColor: 'white',
    height: '40%',
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    marginTop: '65%',
    marginLeft: '5%'
  }
});

export default FetchInfo;
