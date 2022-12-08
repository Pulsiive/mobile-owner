import { isSameDay } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, TouchableHighlight, Text, SafeAreaView } from 'react-native';

import Logo from './Asset/logo.png';
import Pulsiive from './Asset/Pulsiive.png';
import DateSlider from './DateSlider';
import FetchInfo from './FetchInfo';
import avis from './Asset/avis.png';
import notif from './Asset/notif.png';
import api from '../../globals/query/API';

function Planning({ navigation }) {
  const [date, setDate] = useState(new Date());
  //   const [slot, setSlot] = useState([]);

  //   useEffect(() => {
  //     // async function fetchData() {
  //     //   try {
  //     //     console.log('Fetching owner private stations ID');
  //     //     const res = await api.send('GET', '/api/v1/profile/stations/', (auth = true));
  //     //     if (res.status == 200) {
  //     //     } else {
  //     //       throw res;
  //     //     }
  //     //   } catch (e) {
  //     //     const code = e.status;
  //     //     alert('Error');
  //     //   }
  //     // }
  //     async function fetchSlot() {
  //       try {
  //         console.log('Fetching owner slot reservation to display');
  //         const slotParsed = [];
  //         const res = await api.send('GET', '/api/v1/slot', (auth = true));
  //         if (res.status == 200) {
  //           for (var index = 0; index < res.data.length; index++) {
  //             slotParsed.push({
  //               id: res.data[index].id,
  //               stationId: res.data[index].stationPropertiesId,
  //               day: res.data[index].day,
  //               opensAt: res.data[index].opensAt.split('T')[1].split('.')[0],
  //               closeAt: res.data[index].closesAt.split('T')[1].split('.')[0]
  //             });
  //           }
  //           setSlot(slotParsed);
  //         } else {
  //           throw res;
  //         }
  //       } catch (e) {
  //         const code = e.status;
  //         alert('Error');
  //       }
  //     }
  //     // fetchData();
  //     fetchSlot();
  //   }, []);
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={styles.group}>
        <Image source={Logo} style={styles.logo} />
        <Image source={Pulsiive} style={styles.Pulsiive} />
        <TouchableHighlight style={styles.avisButton} onPress={() => navigation.navigate('Avis')}>
          <Image style={styles.avis} source={avis}></Image>
        </TouchableHighlight>
        <Image style={styles.notif} source={notif}></Image>
      </View>
      <View style={styles.welcome}>
        <Text style={styles.first}>Bonjour, User !</Text>
        <Text style={styles.second}>Voyons voir le planning d'aujourd'hui !</Text>
        <TouchableHighlight
          style={styles.addSlotButton}
          onPress={() => navigation.navigate('AddSlot')}
        >
          <Text style={{ color: 'green', fontWeight: '700', fontSize: 32, marginLeft: '30%' }}>
            +
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.profilButton}
          onPress={() => navigation.navigate('Home2')}
        >
          <Image
            style={styles.profil}
            source={{
              uri: 'https://image.shutterstock.com/image-photo/photo-handsome-nice-guy-getting-260nw-1478654612.jpg'
            }}
          ></Image>
        </TouchableHighlight>
      </View>
      <DateSlider date={date} onChange={(newDate) => setDate(newDate)} />
      <View>
        <Text style={{ color: 'white', fontWeight: '700', left: 4 + '%', marginTop: 8 + '%' }}>
          Vos dernières locations
        </Text>
      </View>
      <View style={styles.safe}>
        <FetchInfo date={date} />
      </View>
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
    right: 18 + '%',
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
