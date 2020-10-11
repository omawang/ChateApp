/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import {Header, Gap, InputText, Button} from '../../component';
import {colors, fonts, showSuccess, showError} from '../../utils';
import {IlLogo} from '../../assets';
import {Fire} from '../../config';

export default function EditPassword({navigation, route}) {
  const {email, fullName} = route.params;
  const [send, setSend] = useState(email);

  const Reset = () => {
    var auth = Fire.auth();
    auth
      .sendPasswordResetEmail(email)
      .then((res) => {
        showSuccess('The email was sent successfully');
        navigation.navigate('Profile');
      })
      .catch((err) => {
        showError(err.message);
      });
  };

  return (
    <View style={styles.container}>
      <Header title="Reset Password" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.logo}>
          <IlLogo />
          <Gap height={23} />
          <Text style={styles.title}>Do you have access to this email?</Text>
        </View>
        <Gap height={80} />
        <InputText title="Email Address" disable value={send} />
        <Gap height={120} />
        <Button title="Send Link" onPress={Reset} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 40,
  },
  logo: {
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 50,
  },
});

EditPassword.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};
