import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import {Gap, Header, ListItem} from '../../component';
import {Fire} from '../../config';
import {colors, fonts} from '../../utils';

export default function SettingProfile({navigation, route}) {
  const {fullName, email, photo, bio, uid, noPhone} = route.params;

  const data = {
    email: email,
    fullName: fullName,
    photo: photo,
    bio: bio,
    uid: uid,
    noPhone: noPhone,
  };

  const Singout = () => {
    Fire.auth()
      .signOut()
      .then(function () {
        navigation.replace('GetStarted');
      })
      .catch(function (error) {
        // An error happened.
      });
  };
  return (
    <View style={styles.container}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <Text style={styles.name}>{`Hi, ${fullName}`}</Text>
        <Text style={styles.desc}>is there anything we can help you with?</Text>
      </View>
      <Gap height={58} />
      <ListItem
        icon="edit_profile"
        name="Edit Profile"
        desc="Edit Profile As Desired"
        onPress={() => navigation.navigate('EditProfile', data)}
      />
      <ListItem
        icon="edit_pass"
        name="Change Your Password"
        desc="Keep Your Account Safe"
        onPress={() => navigation.navigate('EditPassword', data)}
      />
      <ListItem icon="rate" name="Give Us Rate" desc="On Google Play Store" />
      <ListItem
        icon="singout"
        name="Sing Out"
        desc="Exit The Aplication"
        onPress={Singout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    flex: 1,
  },
  content: {
    paddingVertical: 10,
    borderBottomColor: colors.border.secondary,
    borderBottomWidth: 1,
    paddingHorizontal: 16,
  },
  name: {
    fontSize: 22,
    fontFamily: fonts.primary[700],
    color: colors.text.primary,
    paddingBottom: 5,
  },
  desc: {
    fontSize: 12,
    fontFamily: fonts.primary[500],
    color: colors.text.secondary,
    paddingBottom: 5,
  },
});

SettingProfile.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};
