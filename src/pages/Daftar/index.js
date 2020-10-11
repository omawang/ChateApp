import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {Button, Gap, InputText, Header} from '../../component';
import {colors, useForm, showError, showSuccess, storeData} from '../../utils';
import {Fire} from '../../config';
import Loading from '../../component/atom/Loading';

export default function Daftar({navigation}) {
  const [loading, setLoading] = useState(false);
  const [form, SetForm] = useForm({
    fullName: '',
    noPhone: '',
    email: '',
    password: '',
  });

  const Register = () => {
    setLoading(true);
    // navigation.replace('UploadPhoto');

    Fire.auth()
      .createUserWithEmailAndPassword(form.email, form.password)
      .then((res) => {
        const data = {
          fullName: form.fullName,
          noPhone: form.noPhone,
          email: form.email,
          uid: res.user.uid,
          bio: 'Edit Your Biodata',
          photo: '',
        };
        Fire.database().ref(`users/${res.user.uid}/`).set(data);
        storeData('user', data);
        SetForm('reset');
        setLoading(false);
        showSuccess('Register Success');
        navigation.replace('UploadPhoto', data);
      })
      .catch(function (error) {
        showError(error.message);
        setLoading(false);
      });
  };

  return (
    <>
      <View style={styles.container}>
        <Header title="Daftar Akun" onPress={() => navigation.goBack()} />
        <View style={styles.content}>
          <View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <InputText
                title="Full Name"
                value={form.fullName}
                onChangeText={(value) => SetForm('fullName', value)}
              />
              <Gap height={24} />
              <InputText
                title="No Phone"
                value={form.noPhone}
                onChangeText={(value) => SetForm('noPhone', value)}
              />
              <Gap height={24} />
              <InputText
                title="Email Address"
                value={form.email}
                onChangeText={(value) => SetForm('email', value)}
              />
              <Gap height={24} />
              <InputText
                title="Password"
                secureTextEntry
                value={form.password}
                onChangeText={(value) => SetForm('password', value)}
              />
            </ScrollView>
          </View>
          <Gap height={30} />
          <Button title="Sign Up" onPress={Register} />
        </View>
      </View>
      {loading && <Loading />}
    </>
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
    paddingBottom: 40,
  },
});

Daftar.propTypes = {
  navigation: PropTypes.object,
};
