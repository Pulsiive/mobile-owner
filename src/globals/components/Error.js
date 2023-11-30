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
import { showMessage } from 'react-native-flash-message';

export default function Error(message) {
  return showMessage({
    message: message,
    type: 'danger'
  });
}
