import React, { useState, useEffect } from 'react';
import {
  Image,
  View,
  Text,
  Pressable,
  Button,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon5 from 'react-native-vector-icons/dist/FontAwesome5';
import Dropdown from 'react-native-input-select';

// import MapboxGL from '@rnmapbox/maps';
// import GetLocation from 'react-native-get-location';
import serviceAccessToken from '../../globals/query/AccessToken';
import api from '../../globals/query/API';

const DisclaimerSectionComponent = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: '12%',
        backgroundColor: '#1F1F1F',
        borderRadius: 15,
        marginTop: '1%',
        marginBottom: '3%'
      }}
    >
      {/* ROW1 */}
      <View style={{ width: '15%', height: '100%', marginTop: '1%' }}>
        <Icon5 style={{ marginLeft: '25%', marginTop: '25%' }} name="user" size={35} color="grey" />
      </View>
      {/* ROW2 */}
      <View style={{ width: '80%', height: '100%', marginTop: '5%', marginLeft: '3%' }}>
        <Text style={{ color: 'grey', fontWeight: '300', fontSize: 13 }}>
          You'll no longer be able to rate or tip your customer after 72 hours, or view customer
          details anymore.
        </Text>
      </View>
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
    <View style={{ height: '30%', width: '100%' }}>
      {/* <MapboxGL.MapView
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
      </MapboxGL.MapView> */}
    </View>
  );
};

const ModalRate = ({ setModal }) => {
  return (
    <View
      style={{
        backgroundColor: 'lightgrey',
        height: '87%',
        width: '100%',
        borderWidth: 1,
        marginTop: '14%'
      }}
    >
      <View style={{ flexDirection: 'row', marginTop: '2%' }}>
        <Text style={{ color: 'black', fontSize: 20, fontWeight: '800', marginLeft: '30%' }}>
          Payment Details
        </Text>
        <Pressable
          onPress={() => {
            setModal(false);
          }}
        >
          <Text style={{ color: 'red', fontSize: 20, marginLeft: '45%' }}>X</Text>
        </Pressable>
      </View>

      {/* MODAL CONTENT */}
      <View
        style={{
          flexDirection: 'row',
          marginTop: '10%',
          marginLeft: '0%',
          width: '100%'
        }}
      >
        <View style={{ heght: '10%', width: '100%', marginTop: '2%' }}>
          <Text
            style={{
              textAlign: 'left',
              fontWeight: '900',
              fontSize: 14,
              color: 'black',
              marginLeft: '5%'
            }}
          >
            Payment
          </Text>
        </View>
      </View>
      {/* Price per minute */}
      <View
        style={{
          height: '10%',
          width: '100%',
          marginTop: '2%',
          flexDirection: 'row',
          backgroundColor: 'white'
        }}
      >
        <View style={{ height: '100%', width: '80%' }}>
          <Text
            style={{
              color: 'black',
              fontWeight: '300',
              fontSize: 16,
              marginLeft: '5%',
              marginTop: '5%'
            }}
          >
            Price per minute
          </Text>
        </View>
        <View style={{ height: '100%', width: '20%' }}>
          <Text style={{ color: 'black', fontWeight: '400', fontSize: 16, marginTop: '20%' }}>
            1 euro
          </Text>
        </View>
      </View>
      {/* Total Paid */}
      <View
        style={{
          height: '10%',
          width: '100%',
          marginTop: '1%',
          flexDirection: 'row',
          backgroundColor: 'white'
        }}
      >
        <View style={{ height: '100%', width: '80%' }}>
          <Text
            style={{
              color: 'black',
              fontWeight: '500',
              fontSize: 16,
              marginLeft: '5%',
              marginTop: '5%'
            }}
          >
            Total Paid
          </Text>
        </View>
        <View style={{ height: '100%', width: '20%' }}>
          <Text style={{ color: 'black', fontWeight: '500', fontSize: 16, marginTop: '20%' }}>
            24 euro
          </Text>
        </View>
      </View>
      {/* paid by  */}
      <View
        style={{
          flexDirection: 'row',
          marginTop: '10%',
          marginLeft: '0%',
          width: '100%'
        }}
      >
        <View style={{ heght: '10%', width: '100%', marginTop: '2%' }}>
          <Text
            style={{
              textAlign: 'left',
              fontWeight: '900',
              fontSize: 14,
              color: 'black',
              marginLeft: '5%'
            }}
          >
            Paid by
          </Text>
        </View>
      </View>
      {/* payment method */}
      <View
        style={{
          height: '10%',
          width: '100%',
          marginTop: '2%',
          flexDirection: 'row',
          backgroundColor: 'white'
        }}
      >
        <Icon style={{ marginLeft: '2%', marginTop: '4%' }} name="dollar" size={25} color="grey" />
        <View style={{ height: '100%', width: '72%' }}>
          <Text
            style={{
              color: 'black',
              fontWeight: '300',
              fontSize: 16,
              marginLeft: '5%',
              marginTop: '5%'
            }}
          >
            Cash
          </Text>
        </View>
        <View style={{ height: '100%', width: '20%' }}>
          <Text style={{ color: 'black', fontWeight: '400', fontSize: 16, marginTop: '20%' }}>
            24 euro
          </Text>
        </View>
      </View>
    </View>
  );
};

const ActivityDetails = ({ navigation, route }) => {
  const [rating, setRating] = useState(0);
  const [modalRateVisible, setModalRateVisible] = useState(false);
  const { date, time, address } = route.params;

  const setRateModal = (event) => {
    console.log(event);
    setModalRateVisible(event);
  };
  return (
    <View style={styles.viewTemplate}>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={modalRateVisible}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}
      >
        <ModalRate setModal={setRateModal} />
      </Modal>
      {/* HEADER */}
      <View style={styles.headWalletInformation}>
        <View style={{ width: '100%', flexDirection: 'row' }}>
          <Pressable
            style={{ width: '10%', height: '100%' }}
            onPress={() => navigation.navigate('Activity')}
          >
            <Icon
              style={{ marginLeft: '30%', marginTop: '10%' }}
              name="arrow-down"
              size={25}
              color="white"
            />
          </Pressable>
          <Text style={styles.title}>
            {date}, {time}
          </Text>

          <View style={{ width: '100%' }}></View>
        </View>
      </View>
      <View style={{ width: '100%', height: 1, backgroundColor: 'grey' }} />
      {/* END HEADER */}
      {/* Booking ID */}
      <View style={{ heght: '10%', width: '100%', marginTop: '2%' }}>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: '600',
            fontSize: 14,
            color: 'darkgrey'
          }}
        >
          Booking ID: 38926182361
        </Text>
      </View>
      {/* END Booking ID */}
      <View style={styles.container}>
        {/* Disclaimer */}
        <DisclaimerSectionComponent />
        {/* END Disclaimer */}

        {/* TOTAL DETAILS */}
        <View
          style={{ height: '4%', width: '100%', flexDirection: 'row', backgroundColor: '#1F1F1F' }}
        >
          <View style={{ height: '100%', width: '80%' }}>
            <Text
              style={{
                color: 'white',
                fontWeight: '800',
                fontSize: 20,
                marginLeft: '5%',
                marginTop: '1%'
              }}
            >
              Total
            </Text>
          </View>
          <View>
            <Text style={{ color: 'white', fontWeight: '800', fontSize: 20, marginTop: '1%' }}>
              {' '}
              10 euro
            </Text>
          </View>
        </View>
        <View
          style={{ height: '6%', width: '100%', flexDirection: 'row', backgroundColor: '#1F1F1F' }}
        >
          <Text style={{ color: 'white', marginLeft: '70%' }}> Credit Card 4792</Text>
        </View>
        <Pressable
          style={{ height: '5%', width: '100%' }}
          onPress={() => {
            setRateModal(true);
          }}
        >
          <View
            style={{
              height: '100%',
              width: '100%',
              flexDirection: 'row'
            }}
          >
            <View style={{ height: '100%', width: '90%', backgroundColor: '#1F1F1F' }}>
              <Text style={{ color: 'lightblue', marginLeft: '5%' }}>View details</Text>
            </View>
            <View style={{ height: '100%', width: '10%', backgroundColor: '#1F1F1F' }}>
              <Icon name="arrow-right" size={25} color="lightblue" />
            </View>
          </View>
        </Pressable>
        {/* END TOTAL DETAILS */}

        {/* MAPBOX INTEGRATION */}
        <MapSectionComponent />

        {/* DETAILS SECTION */}
        <View
          style={{
            height: '5%',
            width: '100%',
            backgroundColor: '#1F1F1F',
            flexDirection: 'row'
          }}
        >
          <View
            style={{ height: '100%', width: '85%', backgroundColor: '#1F1F1F', marginTop: '3%' }}
          >
            <Text style={{ color: 'lightgreen', marginLeft: '5%' }}>PulsiveOwner</Text>
          </View>
          <View
            style={{ height: '100%', width: '15%', backgroundColor: '#1F1F1F', marginTop: '3%' }}
          >
            <Text style={{ color: 'lightgreen', marginLeft: '5%' }}>30 min</Text>
          </View>
        </View>
        <View
          style={{
            height: '13%',
            width: '100%',
            backgroundColor: '#1F1F1F',
            flexDirection: 'row'
          }}
        >
          <View style={{ height: '100%', width: '20%', backgroundColor: '#1F1F1F' }}>
            <Icon
              style={{ marginLeft: '25%', marginTop: '20%' }}
              name="arrow-right"
              size={25}
              color="lightgreen"
            />
          </View>
          <View>
            <View style={{ marginTop: '5%' }}>
              <Text style={{ color: 'white' }}> {address} </Text>
              <Text style={{ color: 'grey' }}> {time} </Text>
            </View>
          </View>
        </View>

        {/* RATING */}
        <View
          style={{
            height: '13%',
            width: '100%',
            marginTop: '2%',
            backgroundColor: '#1F1F1F',
            flexDirection: 'row'
          }}
        >
          <View style={{ height: '100%', width: '30%', backgroundColor: '#1F1F1F' }}>
            <Text style={{ color: 'white', marginTop: '25%', marginLeft: '30%' }}>Evaluation</Text>
          </View>
          <View>
            <View style={{ marginTop: '5%' }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: '6%',
                  marginLeft: '35%',
                  width: '100%'
                }}
              >
                <Pressable
                  onPress={() => {
                    setRating(1);
                  }}
                >
                  <Icon
                    style={{ marginLeft: '2%' }}
                    name="star"
                    size={25}
                    color={rating >= 1 ? 'yellow' : 'grey'}
                  />
                </Pressable>
                <Pressable
                  onPress={() => {
                    setRating(2);
                  }}
                >
                  <Icon
                    style={{ marginLeft: '2%' }}
                    name="star"
                    size={25}
                    color={rating >= 2 ? 'yellow' : 'grey'}
                  />
                </Pressable>
                <Pressable
                  onPress={() => {
                    setRating(3);
                  }}
                >
                  <Icon
                    style={{ marginLeft: '2%' }}
                    name="star"
                    size={25}
                    color={rating >= 3 ? 'yellow' : 'grey'}
                  />
                </Pressable>
                <Pressable
                  onPress={() => {
                    setRating(4);
                  }}
                >
                  <Icon
                    style={{ marginLeft: '2%' }}
                    name="star"
                    size={25}
                    color={rating >= 4 ? 'yellow' : 'grey'}
                  />
                </Pressable>
                <Pressable
                  onPress={() => {
                    setRating(5);
                  }}
                >
                  <Icon
                    style={{ marginLeft: '2%' }}
                    name="star"
                    size={25}
                    color={rating == 5 ? 'yellow' : 'grey'}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
        {/* END DETAILS SECTION */}
      </View>
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
    marginTop: '0%',
    width: '100%',
    height: '7%',
    backgroundColor: '#1F1F1F'
  },
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
  title: {
    textAlign: 'center',
    fontWeight: '600',
    marginLeft: '15%',
    fontSize: 25,
    color: 'white'
  },
  rating: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
    color: 'white'
  },

  //CONTENT
  container: {
    marginTop: '0%',
    height: '90%'
  },
  sectionTitle: {
    color: 'white',
    fontWeight: '200',
    fontSize: 18,
    marginBottom: '3%',
    marginLeft: '7%'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '6%',
    width: '90%',
    marginLeft: '5%',
    marginBottom: '2%',
    borderRadius: 10,
    backgroundColor: '#6EBF34'
  },
  buttonContent: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500'
  },
  disconnectBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '6%',
    width: '90%',
    position: 'absolute',
    bottom: '17%',
    left: '5%',
    borderRadius: 10,
    backgroundColor: '#1B2023'
  },
  filter: {
    flexDirection: 'row',
    width: '90%',
    height: '10%',
    marginLeft: '5%',
    justifyContent: 'space-around'
  },
  selectedColor: {
    color: '#04BF7B',
    fontWeight: '900',
    marginTop: '5%',
    fontSize: 15
  },
  neutralColor: {
    color: 'grey',
    fontWeight: '300'
  }
});

export default ActivityDetails;
