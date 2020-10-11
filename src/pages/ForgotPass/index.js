import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import {Header, Gap, InputText, Button} from '../../component';
import {colors, fonts, showError, showSuccess} from '../../utils';
import {IlLogo} from '../../assets';
import {Fire} from '../../config';

export default function ForgotPass({navigation}) {
  const [email, setEmail] = useState('');

  const SendEmail = () => {
    var auth = Fire.auth();
    auth
      .sendPasswordResetEmail(email)
      .then((res) => {
        showSuccess('The email was sent successfully');
        navigation.replace('Login');
      })
      .catch((err) => {
        showError(err.message);
      });
  };
  return (
    <View style={styles.container}>
      <Header title="Forgot Password" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.logo}>
          <IlLogo />
          <Gap height={23} />
          <Text style={styles.title}>
            {'Enter your email \nto get the password reset link from us'}
          </Text>
        </View>
        <Gap height={80} />
        <InputText
          title="Email Address"
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <Gap height={120} />
        <Button title="Reset Password" onPress={SendEmail} />
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
  },
});

ForgotPass.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};
