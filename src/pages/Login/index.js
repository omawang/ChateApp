import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {IlLogo} from '../../assets';
import {Button, Gap, InputText, Link} from '../../component';
import {
  colors,
  fonts,
  useForm,
  showSuccess,
  showError,
  storeData,
} from '../../utils';
import Loading from '../../component/atom/Loading';
import {Fire} from '../../config';

export default function Login({navigation}) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const submitLogin = () => {
    setLoading(true);
    Fire.auth()
      .signInWithEmailAndPassword(form.email, form.password)
      .then((res) => {
        setLoading(false);
        Fire.database()
          .ref(`users/${res.user.uid}/`)
          .once('value')
          .then((resDB) => {
            if (resDB.val()) {
              storeData('user', resDB.val());
              showSuccess('Login Success');
              navigation.replace('MainApp');
            }
          });
      })
      .catch(function (error) {
        setLoading(false);
        showError(error.message);
      });
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <IlLogo />
          <Text style={styles.text}>
            {'Start your day\nby greeting the world'}
          </Text>
        </View>
        <View>
          <InputText
            title="Email Address"
            value={form.email}
            onChangeText={(value) => setForm('email', value)}
          />
          <Gap height={24} />
          <InputText
            title="Password"
            secureTextEntry
            value={form.password}
            onChangeText={(value) => setForm('password', value)}
          />
          <Gap height={30} />
          <Link
            title="Forgot Password"
            onPress={() => navigation.navigate('ForgotPass')}
          />
          <Gap height={15} />
          <Button title="Sing In" onPress={submitLogin} />
          <Gap height={15} />
          <Link
            align="center"
            title="Create New Account"
            onPress={() => navigation.navigate('Daftar')}
          />
        </View>
      </View>
      {loading && <Loading />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 40,
    backgroundColor: colors.dark,
    flex: 1,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    marginTop: 28,
    color: colors.text.primary,
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};
