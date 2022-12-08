import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, Pressable, StyleSheet, PermissionsAndroid } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Settings from '../settings/Settings';
import Icon from 'react-native-vector-icons/Entypo';
import api from '../../globals/query/API';
import MapboxGL from '@rnmapbox/maps';
import GetLocation from 'react-native-get-location';

MapboxGL.setAccessToken(
  'pk.eyJ1Ijoic2h5bGsiLCJhIjoiY2w0cmhncHdwMDZydTNjcDhkbTVmZm8xZCJ9.uxYLeAuZdY5VMx4EUBaw_A'
);
MapboxGL.setConnected(true);

const ProfileHeaderComponent = () => {
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe'
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.send('GET', '/api/v1/profile', (auth = true));
        if (res.status == 200) {
          setUserData({ firstName: res.data.firstName, lastName: res.data.lastName });
        } else {
          throw res;
        }
      } catch (e) {
        const code = e.status;
        alert({ code } + 'Error User Profile could not get fetch');
      }
    }
    fetchData();
  }, []);

  return (
    <View style={styles.profileHeader}>
      <View style={{ flexDirection: 'row' }}>
        <Icon style={styles.userProfile} name="user" size={50} color="white" />
        <View style={{ height: '100%', marginTop: '5%', marginLeft: '5%' }}>
          <Text style={{ color: 'lightgrey' }}>
            {userData.firstName} {userData.lastName}
          </Text>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>120$</Text>
        </View>
        <View style={{ flexDirection: 'row', position: 'absolute', right: '5%', top: '30%' }}>
          <Icon name="star" size={30} color="white" />
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>4.32</Text>
        </View>
      </View>
    </View>
  );
};

const PlanningSectionComponent = ({ navigation }) => {
  return (
    <View style={styles.planningSection}>
      <Text
        style={{
          color: 'white',
          marginLeft: '3%',
          marginTop: '2%',
          fontSize: 20,
          fontWeight: '700'
        }}
      >
        Planning
      </Text>
      <Pressable onPress={() => navigation.navigate('Planning')}>
        <View
          style={{
            width: '90%',
            height: '70%',
            marginLeft: '5%',
            marginTop: '2%',
            backgroundColor: 'green'
          }}
        ></View>
      </Pressable>
    </View>
  );
};

const MapSectionComponent = () => {
  const [userPosition, setUserPosition] = useState([48.856614, 2.3522219]);

  useEffect(() => {
    try {
      PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
        ],
        {
          title: 'Give Location Permission',
          message: 'App needs location permission to find your position.'
        }
      )
        .then(async (granted) => {
          console.log(granted);
          GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000
          })
            .then((location) => {
              setUserPosition([location.latitude, location.longitude]);
            })
            .catch((error) => {
              const { code, message } = error;
              console.warn(code, message);
            });
        })
        .catch((err) => {
          console.warn(err);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <View style={styles.mapSection}>
      <MapboxGL.MapView
        style={{ flex: 1 }}
        styleURL={'mapbox://styles/mapbox/dark-v9'}
        zoomLevel={16}
        center={userPosition}
      >
        <MapboxGL.Camera
          zoomLevel={13}
          centerCoordinate={[userPosition[1], userPosition[0]]}
          animationMode={'flyTo'}
          animationDuration={3}
        ></MapboxGL.Camera>
        <MapboxGL.UserLocation visible={true} />
      </MapboxGL.MapView>
    </View>
  );
};

const OtherSectionComponent = () => {
  return (
    <View style={styles.otherSection}>
      <View style={{ flexDirection: 'row', height: '45%', Width: '100%', marginTop: '2.5%' }}>
        <View
          style={{ height: '100%', width: '25%', marginLeft: '6.5%', backgroundColor: 'green' }}
        >
          <Text>1</Text>
        </View>
        <View
          style={{ height: '100%', width: '25%', marginLeft: '6.5%', backgroundColor: 'green' }}
        >
          <Text>2</Text>
        </View>
        <View
          style={{ height: '100%', width: '25%', marginLeft: '6.5%', backgroundColor: 'green' }}
        >
          <Text>3</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', height: '45%', Width: '100%', marginTop: '2.5%' }}>
        <View
          style={{ height: '100%', width: '25%', marginLeft: '6.5%', backgroundColor: 'green' }}
        >
          <Text>4</Text>
        </View>
        <View
          style={{ height: '100%', width: '25%', marginLeft: '6.5%', backgroundColor: 'green' }}
        >
          <Text>5</Text>
        </View>
        <View
          style={{ height: '100%', width: '25%', marginLeft: '6.5%', backgroundColor: 'green' }}
        >
          <Text>6</Text>
        </View>
      </View>
    </View>
  );
};

const HomePage = ({ navigation }) => {
  return (
    <View style={{ height: '100%', width: '100%', backgroundColor: 'white' }}>
      <ProfileHeaderComponent />
      <PlanningSectionComponent navigation={navigation} />
      <MapSectionComponent />
      <OtherSectionComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  profileHeader: {
    height: '10%',
    width: '90%',
    marginTop: '5%',
    marginLeft: '5%',
    backgroundColor: '#0D0D0D',
    borderRadius: 10
  },
  userProfile: {
    marginTop: '3.5%',
    marginLeft: '3%'
  },

  planningSection: {
    height: '20%',
    width: '100%',
    marginTop: '5%',
    backgroundColor: '#0D0D0D'
  },

  mapSection: {
    height: '30%',
    width: '100%',
    marginTop: '2%',
    backgroundColor: '#0D0D0D'
  },

  otherSection: {
    height: '27%',
    width: '100%',
    marginTop: '2%',
    backgroundColor: '#0D0D0D'
  }
});

export default HomePage;
