import React from 'react';
import { View, TouchableHighlight, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

{
  /*
  <ButtonTouchable
    title(required)="ButtonTouchable" // text of the button
    onPress(required)={() => onPress()} // function called when the button is pressed
    style(optional)={{ insert style here }} // to change the style
    icon(optional)="icon-name" // to put or not an icon
    image(optional)="image-name" // to put or not an icon
  />
  */
}

const ButtonTouchable = ({ title, subtext, onPress, icon, image, action }) => {
  const handlePress = () => {
    if (onPress) onPress();
  };

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
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginLeft: 16
    },
    ButtonTouchableText: {
      textAlign: 'center',
      color: 'white',
      fontWeight: '300',
      fontSize: 16
    }
  });

  return (
    <TouchableHighlight onPress={handlePress} underlayColor={'grey'} style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.leftContent}>
          {icon && <Icon name={icon} size={24} color={'grey'} />}
          {image && <Image source={image[0]} style={{ width: image[1], height: image[1] }} />}
          <View style={styles.textContainer}>
            <Text style={styles.ButtonTouchableText}>{title}</Text>
            {subtext && <Text style={{ color: 'grey' }}>{subtext}</Text>}
          </View>
        </View>
        <Icon name={action ? action : 'chevron-right'} size={20} color="grey" />
      </View>
    </TouchableHighlight>
  );
};

export default ButtonTouchable;
