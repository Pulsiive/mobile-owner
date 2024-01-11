import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableHighlight, Text, SafeAreaView } from 'react-native';

import Logo from './Asset/logo.png';
import Pulsiive from './Asset/Pulsiive.png';
import DateSlider from './DateSlider';
import api from '../../globals/query/API';
import { useFocusEffect } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

function Planning({ navigation }) {
  const [date, setDate] = useState(new Date());

  const [data, setData] = useState({});
  const [slot, setSlot] = useState(null);
  const [openDate, setOpenDate] = useState([]);

  useEffect(() => {
    function fillAgendaWithReservations(slot) {
      // console.log('filling agenda');
      // console.log(slot);
      let isAlreadyInAgenda = false;

      for (let index = 0; index < slot.length; index++) {
        ///////////////////////////////////////////////////////////////////////
        //    Error checking to see if slot is already contained in Agenda    /
        for (const idToCheck in data[slot[index].date]) {
          if (parseInt(data[slot[index].date][idToCheck].id) === index) isAlreadyInAgenda = true;
        }
        if (isAlreadyInAgenda) {
          isAlreadyInAgenda = false;
          break;
        }
        ///////////////////////////////////////////////////////////////////////
        if (data[slot[index].date] === undefined) data[slot[index].date] = [];
        data[slot[index].date].push({
          date: slot[index].date,
          id: index,
          price: slot[index].price,
          pricePerMin: slot[index].price_per_minute,
          Hour: slot[index].opensAt + ' -> ' + slot[index].closeAt,
          Name: slot[index].stationId,
          isBooked: slot[index].isBooked,
          slotId: slot[index].id
        });
        // console.log('pushed one new object');
      }
      // console.log('HERE   ', data[date]);
    }

    const addElementSorted = (array, element) => {
      const opensAtElement = new Date(element.opensAt).getTime();

      let index = 0;
      while (index < array.length && opensAtElement > new Date(array[index].opensAt).getTime()) {
        index++;
      }
      return array.splice(index, 0, element);
    };
    async function fetchSlot() {
      try {
        return await api.send('GET', '/api/v1/slot', null, true);
      } catch (error) {
        console.error('Error fetching slot information:', error);
      }
    }

    fetchSlot().then((res) => {
      if (res.status === 200) {
        setOpenDate(res.data.map((item) => new Date(item.opensAt).toLocaleDateString()));
        let slotParsed = [];
        for (let index = 0; index < res.data.length; index++) {
          let element = {
            id: res.data[index].id,
            stationId: res.data[index].stationPropertiesId,
            date: new Date(res.data[index].opensAt).toLocaleDateString(),
            opensAt: res.data[index].opensAt.split('T')[1].split('.')[0],
            price: res.data[index].price,
            price_per_minute: res.data[index].price_per_minute,
            closeAt: res.data[index].closesAt.split('T')[1].split('.')[0],
            isBooked: res.data[index].isBooked
          };
          addElementSorted(slotParsed, element);
        }
        fillAgendaWithReservations(slotParsed);
      }
    });
    console.log('something changed');
  }, [slot]);

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={styles.group}>
        <Image source={Logo} style={styles.logo} />
        <Image source={Pulsiive} style={styles.Pulsiive} />
        {/*<TouchableHighlight style={styles.avisButton} onPress={() => navigation.navigate('Avis')}>*/}
        {/*  <Image style={styles.avis} source={avis}></Image>*/}
        {/*</TouchableHighlight>*/}
        {/*<Image style={styles.notif} source={notif}></Image>*/}
      </View>
      <View style={styles.welcome}>
        <Text style={styles.first}>Bonjour, User !</Text>
        <Text style={styles.second}>Voyons voir le planning d'aujourd'hui !</Text>

        <TouchableHighlight
          style={styles.addSlotButton}
          onPress={() => navigation.navigate('AddSlot')}
        >
          <Animatable.Text
            animation="pulse"
            iterationCount="infinite"
            style={{ color: 'green', fontWeight: '700', fontSize: 32, marginLeft: '30%' }}
          >
            +
          </Animatable.Text>
        </TouchableHighlight>
      </View>
      <DateSlider
        date={date}
        onChange={(newDate) => setDate(newDate)}
        openDate={openDate}
        data={data}
        slot={slot}
        setSlot={setSlot}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    left: 3 + '%',
    marginTop: 10 + '%'
  },
  welcome: {
    position: 'absolute',
    top: 12 + '%',
    left: 4 + '%',
    width: 91 + '%'
  },
  first: {
    color: 'white',
    fontWeight: '900',
    width: 326,
    textAlign: 'left',
    lineHeight: 18,
    letterSpacing: 0
  },
  second: {
    color: 'white',
    fontWeight: '500',
    width: 326,
    textAlign: 'left',
    lineHeight: 18,
    letterSpacing: 0,
    marginTop: 15
  },
  Line2: {
    width: 240,
    height: 1,
    position: 'absolute',
    top: 35 + '%',
    backgroundColor: 'grey'
  },
  logo: {
    width: 28,
    height: 28,
    resizeMode: 'cover'
  },
  Pulsiive: {
    width: 80,
    height: 27,
    resizeMode: 'cover',
    marginLeft: 12
  },
  group: {
    position: 'absolute',
    top: 6 + '%',
    left: 4 + '%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    alignContent: 'flex-start',
    width: 91 + '%'
  },
  addSlotButton: {
    position: 'absolute',
    right: 0 + '%',
    backgroundColor: 'lightgrey',
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#7FCB2B'
  },
  profilButton: {
    position: 'absolute',
    right: 0
  },
  profil: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#7FCB2B'
  },
  avis: {
    height: 20,
    width: 20
  },
  avisButton: {
    position: 'absolute',
    right: 0
  },
  notif: {
    height: 20,
    width: 20,
    position: 'absolute',
    right: 40
  }
});

export default Planning;
