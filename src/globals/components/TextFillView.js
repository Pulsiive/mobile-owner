import React from 'react';
import { View, TouchableHighlight, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

{
  /*
  <TextFillView
    title(required)="TextFillView" // text of the button
    style(optional)={{ insert style here }} // to change the style
  />
  */
}

const TextFillView = ({ title, subtext }) => {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      paddingVertical: 14,
      borderBottomColor: 'lightgrey',
      borderBottomWidth: 1,
      backgroundColor: 'transparent',
      alignSelf: 'center'
    },
    contentWrapper: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginRight: 24
    },
    leftContent: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginRight: '20%'
    },
    textContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginLeft: 16
    },
    ButtonTouchableText: {
      textAlign: 'center',
      color: 'white',
      fontWeight: '200',
      fontSize: 16
    },
    ButtonSubtext: {
      textAlign: 'center',
      color: 'white',
      fontWeight: '400',
      fontSize: 16,
      position: 'absolute',
      left: 100
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.leftContent}>
          <View style={styles.textContainer}>
            <Text style={styles.ButtonTouchableText}>{title}</Text>
            <Text style={styles.ButtonSubtext}>{subtext}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TextFillView;
