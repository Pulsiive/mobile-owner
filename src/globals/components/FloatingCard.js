import React from 'react';
import { StyleSheet, View } from 'react-native';

{
  /*
  <FloatingCard
    children(required) // content of the card
    style(optional)={{ insert style here }} // to change the style
  />
  */
}

const FloatingCard = ({ children, style }) => {
  const styles = StyleSheet.create({
    FloatingCard: {
      width: '90%',
      alignSelf: 'center',
      backgroundColor: 'black',
      borderRadius: 20,
      elevation: 10,
      shadowColor: 'white',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      paddingVertical: 35,
      paddingHorizontal: 15,
      marginVertical: 30
    },
    container: {
      alignItems: 'center'
    }
  });

  return (
    <View
      style={{
        ...styles.FloatingCard,
        ...(style || {})
      }}
    >
      <View style={styles.container}>{children}</View>
    </View>
  );
};

export default FloatingCard;
