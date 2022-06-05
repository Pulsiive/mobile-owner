import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import { Image, View } from 'react-native';

const PulsiveCard = () => {
  return (
    <View>
      <LinearGradient
        colors={['#333333', '#525252']}
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        style={{
          padding: 10,
          marginTop: '17%',
          marginLeft: '7.5%',
          width: '85%',
          height: '68%',
          borderRadius: 20
        }}
      />
      <Image
        style={{
          position: 'absolute',
          top: '25%',
          left: '45%',
          width: 200,
          height: 100
        }}
        source={require('../../images/logo_pulsive.png')}
      />
      {/* Maybe add a name ?  */}
    </View>
  );
};

export default PulsiveCard;
