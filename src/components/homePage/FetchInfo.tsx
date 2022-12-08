import React, { useEffect, useState, useRef } from 'react';
import { Animated, View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { format } from 'date-fns';
import data from './agenda.json';
import calendar from './Asset/calendar.png';
import bill from './Asset/bill.png';
import api from '../../globals/query/API';

type Props = {
  date: Date;
};

type Item = {
  name: string;
};

type slot = {
  id: number;
  stationId: string;
  day: string;
  opensAt: string;
  closeAt: string;
};

const FetchInfo: React.FC<Props> = ({ date }) => {
  const firstOpacity = useRef(new Animated.Value(0)).current;

  const TranslationUp = useRef(new Animated.Value(-20)).current;

  const [items, setItems] = useState<{ [key: string]: Item[] }>({ data });

  useEffect(() => {
    function fillAgendaWithReservations(slot, formattedDate) {
      console.log('filling agenda');
      console.log('SlotData: ', slot);
      console.log('items: ', items.data);

      for (const current in items.data) {
        console.log('index', current);
        let currentDay = items.data[current][0].day;
        let isAlreadyInAgenda = false;
        for (let index = 0; index < slot.length; index++) {
          if (slot[index].day == currentDay) {
            ///////////////////////////////////////////////////////////////////////
            //    Error checking to see if slot is already contained in Agenda    /
            for (const idToCheck in items.data[current]) {
              if (parseInt(items.data[current][idToCheck].id) == index) {
                isAlreadyInAgenda = true;
              }
            }
            if (isAlreadyInAgenda) {
              isAlreadyInAgenda = false;
              break;
            }
            ///////////////////////////////////////////////////////////////////////

            items.data[current].push({
              day: currentDay,
              id: index,
              Hour: slot[index].opensAt + ' -> ' + slot[index].closeAt,
              Name: slot[index].stationId,
              picture:
                'https://thumbs.dreamstime.com/b/jeune-femme-heureuse-de-brunette-avec-le-sourire-%C3%A9tonnant-26038696.jpg',
              content: 'Content goes here...'
            });

            console.log('pushed one new object');
          }
        }
      }
      for (const i in items.data['12/11/2022']) console.log(items.data['12/11/2022'][i]);
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
              day: res.data[index].day,
              opensAt: res.data[index].opensAt.split('T')[1].split('.')[0],
              closeAt: res.data[index].closesAt.split('T')[1].split('.')[0]
            });
          }
          console.log('slotParsed: ', slotParsed);
          fillAgendaWithReservations(slotParsed, format(date, 'Pp').split(',')[0]);
        } else {
          throw res;
        }
      } catch (e) {
        const code = e.status;
        alert('Error');
      }
    }
    fetchSlot();
  }, []);

  var formattedDate = format(date, 'Pp').split(',')[0];
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
      {items.data[formattedDate].map((plan) => {
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
          <Animated.View
            style={[
              styles.itemContainer,
              { opacity: firstOpacity, transform: [{ translateY: TranslationUp }] }
            ]}
            key={plan.id}
          >
            <Image style={styles.picture} source={{ uri: plan.picture }}></Image>
            <Text style={styles.name}>{plan.Name}</Text>
            <View style={styles.firstRow}>
              <Image style={styles.rendCalendar} source={calendar}></Image>
              <Text style={styles.Txtduration}>{plan.Hour}</Text>
            </View>
            <View style={styles.secondRow}>
              <Image style={styles.rendbill} source={bill}></Image>
              <Text style={styles.Txtbill}>{plan.content}</Text>
            </View>
          </Animated.View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  safe: {},
  picture: {
    position: 'absolute',
    right: 20,
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 50
  },
  // picture:{
  //     position: 'absolute',
  //     right: 0,
  //     width:100,
  //     height:100+'%',
  //     // borderRadius: 50,
  // },
  name: {
    color: 'white',
    position: 'absolute',
    fontWeight: '700',
    fontSize: 15,
    top: 15,
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
  }
});

export default FetchInfo;
