import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Image,
  Pressable
} from 'react-native';
import api from '../../globals/query/API';
import { showMessage } from 'react-native-flash-message';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const RenderReservationRequest = ({ item: request, handleStatusUpdate }) => {
  const dateOpenAt = new Date(request.slot.opensAt);
  const dateEndsAt = new Date(request.slot.closesAt);

  const day = dateOpenAt.toISOString().split('T')[0];
  const openAtTime = `${dateOpenAt.getUTCHours()}:${
    dateOpenAt.getUTCMinutes() === 0 ? '00' : dateOpenAt.getUTCMinutes()
  }`;
  const endsAtTime = `${dateEndsAt.getUTCHours()}:${
    dateEndsAt.getUTCMinutes() === 0 ? '00' : dateEndsAt.getUTCMinutes()
  }`;

  const driverRating =
    request.driver.receivedRatings.length > 0
      ? (
          request.driver.receivedRatings.reduce((sum, nextValue) => sum + nextValue, 0) /
          request.driver.receivedRatings.length
        ).toFixed(2)
      : 0;
  return (
    <View
      style={{
        backgroundColor: '#C0C0C0',
        borderWidth: 0.5,
        borderRadius: 15,
        marginBottom: 20
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          backgroundColor: '#4c8635',
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          padding: 20
        }}
      >
        <Text style={{ color: 'lightgray', fontSize: 16, marginBottom: 10 }}>
          {request.isPending ? 'En attente' : request.isAccepted ? 'Acceptée' : 'Refusée'}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <Icon name="clock-o" color="white" size={20} />
          <Text style={{ color: 'white', fontSize: 20, fontWeight: '600', marginLeft: 10 }}>
            {day}, {openAtTime} - {endsAtTime === '0' ? '00' : endsAtTime}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          marginBottom: 20,
          marginLeft: 20
        }}
      >
        <View style={{ flex: 1, marginRight: 10 }}>
          <Image
            style={{ width: 75, height: 75, borderRadius: 25 }}
            source={{ uri: `https://ucarecdn.com/${request.driver.profilePictureId}/` }}
          />
        </View>
        <View style={{ flex: 3 }}>
          <Text style={{ color: 'black', fontSize: 20, marginBottom: 5, fontWeight: '500' }}>
            {request.driver.firstName} {request.driver.lastName}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Icon name="star" size={15} color={'black'} />
            <Text style={{ color: 'black', fontSize: 18, marginLeft: 5 }}>
              {driverRating === 0 ? 'No rating' : driverRating}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Icon name="euro" size={15} color={'black'} />
            <Text style={{ color: 'black', fontSize: 18, marginLeft: 10 }}>
              {request.price / 100}
            </Text>
          </View>
        </View>
      </View>
      {request.isPending && (
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            marginBottom: 10
          }}
        >
          <Pressable
            style={{
              flex: 2,
              backgroundColor: '#4c8635',
              padding: 10,
              borderRadius: 15,
              marginRight: 10
            }}
            onPress={() => handleStatusUpdate(request.id, true)}
          >
            <Text
              style={{
                textTransform: 'uppercase',
                color: 'white',
                fontSize: 15,
                textAlign: 'center'
              }}
            >
              Accepter
            </Text>
          </Pressable>
          <Pressable
            style={{ flex: 1, backgroundColor: 'black', padding: 10, borderRadius: 15 }}
            onPress={() => handleStatusUpdate(request.id, false)}
          >
            <Text
              style={{
                textTransform: 'uppercase',
                color: 'lightgray',
                fontSize: 15,
                textAlign: 'center'
              }}
            >
              Refuser
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const ReservationRequests = () => {
  const [reservations, setReservations] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const showErrorMessage = (message) => {
    showMessage({
      message: message,
      type: 'danger'
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      api.send('GET', '/api/v1/owner/reservations/requests').then((res) => {
        if (res.status !== 200) {
          showErrorMessage('Failed to fetch reservations requests');
        } else {
          setReservations(
            res.data.filter((res) => {
              const today = new Date();
              const slotStartsAt = new Date(res.slot.opensAt);
              return today.getTime() < slotStartsAt.getTime(); // get incoming date only
            })
          );
        }
        setIsLoading(false);
      });
    }, [])
  );

  const onStatusUpdate = (requestId, isAccepted) => {
    api
      .send('PUT', `/api/v1/owner/reservations/requests/${requestId}`, { isAccepted })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setReservations(
            reservations.map((r) =>
              r.id === requestId ? { ...r, isPending: false, isAccepted } : r
            )
          );
        } else {
          showErrorMessage('Failed to update reservation status');
        }
      });
  };

  return (
    <View style={{ backgroundColor: 'black', height: '100%' }}>
      <View style={{ padding: 10 }}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
          Vos demandes de réservations
        </Text>
        <SafeAreaView style={{ marginTop: 20, marginBottom: 100 }}>
          {isLoading && <ActivityIndicator size="large" />}
          {reservations && reservations.length > 0 ? (
            <FlatList
              data={reservations}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <RenderReservationRequest item={item} handleStatusUpdate={onStatusUpdate} />
              )}
            />
          ) : (
            <Text style={{ color: 'white', fontSize: 20, fontWeight: '700' }}>
              Aucune demande de réservation en attente
            </Text>
          )}
        </SafeAreaView>
      </View>
    </View>
  );
};

export default ReservationRequests;
