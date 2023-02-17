import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import api from '../../globals/query/API';

const ChangePassword = ({ navigation }) => {
  const [cardInput, setCardInput] = useState({
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (text, field) => {
    cardInput[field] = text;
    setCardInput(cardInput);
  };
  const submit = async () => {
    try {
      //Error checker
      console.log(cardInput.newPassword);
      if (newPassword != newPasswordConfirm) {
        setError(true);
        setErrorMessage('Invalid Password: New password is not the same.');
        alert(errorMessage);
        return;
      }
      if (newPassword == oldPassword) {
        setError(true);
        setErrorMessage(
          'Invalid Password: New password should not be the same as the current one.'
        );
        alert(errorMessage);
        return;
      }
      setError(false);
      setErrorMessage('');
      const body = {
        email: '',
        password: cardInput.newPassword,
        password_confirmation: cardInput.newPasswordConfirm
      };
      const res = await api.send('POST', '/api/v1/auth/resetPassword', body, (auth = true));
      console.log(res);
      if (res.status == 200) {
        console.log('Password has been changed.');
        navigation.navigate('Settings');
      } else {
        throw res;
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.viewTemplate}>
      <View style={styles.headWalletInformation}>
        <Pressable style={styles.backButton} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.backButtonContent}>{'<'}</Text>
        </Pressable>
        <Text
          style={{
            color: 'white',
            width: '90%',
            fontSize: 35,
            fontWeight: '700',
            marginLeft: '3%'
          }}
        >
          Reset Password
        </Text>
      </View>
      {/* MIDDLE BAR */}
      <View style={styles.divider} />

      <View
        style={{
          transform: [{ rotate: '-40.13deg' }],
          width: '70%',
          height: '18%',
          backgroundColor: '#525252',
          position: 'absolute',
          top: '34%',
          left: '12%'
        }}
      ></View>

      {/* Old Password  */}
      <View
        style={{
          width: '90%',
          height: '15%',
          backgroundColor: '#232323',
          marginTop: '15%',
          borderBottomRightRadius: 10,
          borderTopRightRadius: 10
        }}
      >
        <Text
          style={{
            color: 'white',
            width: '30%',
            fontSize: 15,
            fontWeight: '400',
            marginLeft: '15%',
            marginTop: '5%'
          }}
        >
          Old Password
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={{
              color: 'grey',
              backgroundColor: 'white',
              borderRadius: 10,
              height: '74%',
              width: '82%',
              marginTop: '1%',
              marginLeft: '15%'
            }}
            onChangeText={(text) => handleChange(text, 'oldPassword')}
            placeholder="Enter your old password"
            secureTextEntry={true}
            autoComplete="username"
          >
            {cardInput.oldPassword}
          </TextInput>
        </View>
      </View>
      {/* New Password  */}
      <View>
        <View
          style={{
            width: '90%',
            height: '35%',
            backgroundColor: '#232323',
            marginTop: '15%',
            marginLeft: '10%',
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10
          }}
        >
          <Text
            style={{
              color: 'white',
              width: '30%',
              fontSize: 15,
              fontWeight: '400',
              marginTop: '5%',
              marginLeft: '3%'
            }}
          >
            New Password
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={{
                color: 'grey',
                backgroundColor: 'white',
                borderRadius: 10,
                height: '74%',
                width: '82%',
                marginTop: '1%',
                marginLeft: '3%'
              }}
              onChangeText={(text) => handleChange(text, 'newPassword')}
              secureTextEntry={true}
              placeholder="Enter your new password"
              autoComplete="username"
            >
              {cardInput.newPassword}
            </TextInput>
          </View>

          {/* Confirm Password */}
          <Text
            style={{
              color: 'white',
              width: '40%',
              fontSize: 15,
              fontWeight: '400',
              marginTop: '5%',
              marginLeft: '3%'
            }}
          >
            Confirm Password
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={{
                color: 'grey',
                backgroundColor: 'white',
                borderRadius: 10,
                height: '74%',
                width: '82%',
                marginTop: '1%',
                marginLeft: '3%'
              }}
              secureTextEntry={true}
              onChangeText={(text) => handleChange(text, 'newPasswordConfirm')}
              placeholder="Confirm your password"
              autoComplete="username"
            >
              {cardInput.newPasswordConfirm}
            </TextInput>
          </View>
          <View
            style={{
              width: '100%',
              height: '5%',
              marginTop: '4%',
              marginLeft: '0%',
              backgroundColor: '#525252',
              borderBottomLeftRadius: 10
            }}
          ></View>
        </View>
        <Pressable onPress={submit}>
          <View
            style={{
              width: '90%',
              alignItems: 'center',
              height: '25%',
              marginTop: '15%',
              marginLeft: '5%',
              borderRadius: 15,
              backgroundColor: '#6EBF34'
            }}
          >
            <Text style={{ color: 'white', marginTop: '3%' }}>Confirm password changes</Text>
          </View>
        </Pressable>
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
  headWalletInformation: {
    flexDirection: 'row',
    padding: 10,
    marginTop: '8%',
    width: '100%',
    height: '10%'
  },
  divider: {
    width: '80%',
    backgroundColor: 'grey',
    height: '0.1%',
    marginLeft: '10%',
    marginBottom: '0%'
  }
});

export default ChangePassword;
