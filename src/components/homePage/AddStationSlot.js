import { isSameDay } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Button, Pressable, Text } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import DatePicker from 'react-native-date-picker';
import Stepper from 'react-native-stepper-ui';

import Logo from './Asset/logo.png';
import Pulsiive from './Asset/Pulsiive.png';
import api from '../../globals/query/API';

function SelectBorne(props) {
  return (
    <View style={{ backgroundColor: '#141414', height: 150, marginTop: '15%' }}>
      <Text
        style={{
          color: 'white',
          fontWeight: '400',
          fontSize: 15,
          marginLeft: '9%',
          marginTop: '5%'
        }}
      >
        1. Selectionnez votre borne privée.
      </Text>
      <View style={{ width: '55%', marginLeft: '22%', marginTop: '5%' }}>
        <SelectDropdown
          data={props.station}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            props.setSelectedStation(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />
      </View>
    </View>
  );
}

function SelectDate(props) {
  return (
    <View style={{ backgroundColor: '#141414', height: '100%', marginTop: '9%' }}>
      <Text
        style={{
          color: 'white',
          fontWeight: '400',
          fontSize: 15,
          marginLeft: '9%',
          marginTop: '9%'
        }}
      >
        2. Selectionnez une date et une heure de créneau.
      </Text>
      <View style={{ width: '50%', marginLeft: '22%', marginTop: '5%' }}>
        <Button title="Choisissez une date" onPress={() => props.setOpen(true)} />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text
          style={{
            color: 'grey',
            fontWeight: '400',
            fontSize: 15,
            marginLeft: '9%',
            marginTop: '5%'
          }}
        >
          {props.dateArray}
        </Text>
        <Text
          style={{
            color: 'grey',
            fontWeight: '400',
            fontSize: 15,
            marginLeft: '50%',
            marginTop: '5%'
          }}
        >
          {props.time}
        </Text>
      </View>

      <DatePicker
        modal
        open={props.open}
        date={props.date}
        onConfirm={(date) => {
          setOpen(false);
          var formattedDate = format(date, 'dd/MM/yyyy').split(',')[0];
          var time = format(date, 'HH:mm');
          props.setDateArray(formattedDate);
          props.setTime(time);
          props.setDate(date);
        }}
        onCancel={() => {
          props.setOpen(false);
        }}
      />
    </View>
  );
}

function Recap(props) {
  return (
    <View>
      <View style={{ marginTop: 50, height: 380 }}>
        <View>
          <Text style={{ color: 'white', fontWeight: '500', fontSize: 16, marginLeft: 20 }}>
            Verifiez vos informations avant d'enregistrer !
          </Text>
        </View>
        <View style={{ marginLeft: '25%', marginTop: '15%', width: '49%', alignItems: 'center' }}>
          <Text style={{ color: 'grey', fontWeight: '300' }}>Station</Text>
          <Text style={{ color: 'white' }}>{props.station}</Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: '15%' }}>
          <View style={{ marginLeft: -10, width: '49%', alignItems: 'center' }}>
            <Text style={{ color: 'grey', fontWeight: '300' }}>Heure</Text>
            <Text style={{ color: 'white' }}>{props.time}</Text>
          </View>
          <View style={{ marginLeft: 5, width: '49%', alignItems: 'center' }}>
            <Text style={{ color: 'grey', fontWeight: '300' }}>Date</Text>
            <Text style={{ color: 'white' }}>{props.dateArray}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function AddSlot({ navigation }) {
  const [station, setStation] = useState([]);
  const [selectedStation, setSelectedStation] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dateArray, setDateArray] = useState('');
  const [time, setTime] = useState('');
  const [active, setActive] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('Fetching owner private stations ID');
        const res = await api.send('GET', '/api/v1/profile/stations/', (auth = true));
        const stationParsed = [];
        if (res.status == 200) {
          for (let index = 0; index < res.data.stations.length; index++) {
            stationParsed.push(res.data.stations[index].properties.stationId);
          }
          setStation(stationParsed);
        } else {
          throw res;
        }
      } catch (e) {
        const code = e.status;
        alert('Error');
      }
    }
    fetchData();
  }, []);

  function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
  }

  const submit = async () => {
    try {
      console.log('Create new reservation slot');
      let body = {
        stationId: selectedStation,
        opensAt: date.toISOString(),
        closesAt: addMinutes(date, 30).toISOString()
      };
      console.log(body);
      const res = await api.send('post', '/api/v1/slot', body, (auth = true));
      console.log(res);

      if (res.status == 200) {
        console.log('Slot has been created.');
        navigation.navigate('Planning');
        alert(`Votre creneau de station station a ${time} le ${dateArray} a bien été crée.`);
      } else {
        throw res;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const content = [
    <SelectBorne station={station} setSelectedStation={setSelectedStation} />,
    <SelectDate
      setOpen={setOpen}
      dateArray={dateArray}
      setDateArray={setDateArray}
      date={date}
      setDate={setDate}
      time={time}
      setTime={setTime}
    />,
    <Recap station={station} time={time} dateArray={dateArray} />
  ];

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ backgroundColor: '#308C27', height: '10%' }}>
        <Text
          style={{
            color: 'white',
            fontWeight: '900',
            fontSize: 22,
            marginLeft: '5%',
            marginTop: '5%'
          }}
        >
          Ajoutez votre créneau de réservation.
        </Text>
      </View>

      <View style={{ marginVertical: 35, marginHorizontal: 20, height: '80%' }}>
        <Stepper
          active={active}
          content={content}
          onBack={() => setActive((p) => p - 1)}
          onFinish={() => {
            submit();
            navigation.navigate('Planning');
          }}
          onNext={() => setActive((p) => p + 1)}
          stepStyle={{
            backgroundColor: '#1EAE8D',
            width: 30,
            height: 30,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          buttonStyle={{
            marginTop: 10,
            marginLeft: '15%',
            marginRight: 10,
            borderRadius: 4,
            width: 100,
            alignItems: 'center',
            backgroundColor: active == content.length - 1 ? '#6EBF34' : '#1EAE8D'
          }}
          wrapperStyle={{ height: active == 0 ? '88%' : '88%' }}
        />
      </View>

      {/* <View style={{ backgroundColor: '#141414', height: '20%', marginTop: '15%' }}>
        <Text
          style={{
            color: 'white',
            fontWeight: '400',
            fontSize: 15,
            marginLeft: '9%',
            marginTop: '5%'
          }}
        >
          1. Selectionnez votre borne privée.
        </Text>
        <View style={{ width: '55%', marginLeft: '22%', marginTop: '5%' }}>
          <SelectDropdown
            data={station}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              setSelectedStation(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
        </View>
      </View> */}

      {/* <View style={{ backgroundColor: '#141414', height: '25%', marginTop: '9%' }}>
        <Text
          style={{
            color: 'white',
            fontWeight: '400',
            fontSize: 15,
            marginLeft: '9%',
            marginTop: '9%'
          }}
        >
          2. Selectionnez une date et une heure de créneau.
        </Text>
        <View style={{ width: '50%', marginLeft: '22%', marginTop: '5%' }}>
          <Button title="Choisissez une date" onPress={() => setOpen(true)} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              color: 'grey',
              fontWeight: '400',
              fontSize: 15,
              marginLeft: '9%',
              marginTop: '5%'
            }}
          >
            {dateArray}
          </Text>
          <Text
            style={{
              color: 'grey',
              fontWeight: '400',
              fontSize: 15,
              marginLeft: '50%',
              marginTop: '5%'
            }}
          >
            {time}
          </Text>
        </View>

        

        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={(date) => {
            setOpen(false);
            var formattedDate = format(date, 'dd/MM/yyyy').split(',')[0];
            var time = format(date, 'HH:mm');
            setDateArray(formattedDate);
            setTime(time);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View> */}

      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false);
          var formattedDate = format(date, 'dd/MM/yyyy').split(',')[0];
          var time = format(date, 'HH:mm');
          setDateArray(formattedDate);
          setTime(time);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      <Pressable
        style={{
          marginLeft: '35%',
          marginTop: '20%'
        }}
        onPress={() => {
          console.log('Submit to backend');
          submit();
          //          navigation.navigate('Planning');
        }}
      >
        <View
          style={{
            backgroundColor: '#308C27',
            height: '21%',
            width: '50%',
            alignItems: 'center',
            borderRadius: 20
          }}
        >
          <Text style={{ marginTop: '4%', color: 'white' }}>Submit</Text>
        </View>
      </Pressable>
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

export default AddSlot;
