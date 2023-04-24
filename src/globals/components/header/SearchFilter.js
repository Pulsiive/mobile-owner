import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

/**
 *  Reusable Search filter component
 */
const SearchComponent = (array, toBeFound) => {
  console.log('Filter Function');
  console.log(toBeFound);
  const res = array.filter((obj) => Object.values(obj).some((val) => val.includes(toBeFound)));
  return res;
};

export default SearchComponent;
