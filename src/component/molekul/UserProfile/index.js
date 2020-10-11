import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors, fonts, getData} from '../../../utils';

import {NullPhoto} from '../../../assets';

export default function UserProfile({onPress}) {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    photo: NullPhoto,
  });

  useEffect(() => {
    getData('user').then((res) => {
      const data = res;
      data.photo = res.photo ? {uri: res.photo} : NullPhoto;
      setProfile(data);
    });
  }, [profile.uid]);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={[
          colors.linier.color3,
          colors.linier.color2,
          colors.linier.color1,
        ]}
        style={styles.border}>
        <View style={styles.border2}>
          <Image source={profile.photo} style={styles.photo} />
        </View>
      </LinearGradient>
      <Text style={styles.name}>{profile.fullName}</Text>
      <Text style={styles.desc}>{profile.bio}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  border: {
    width: 120,
    height: 120,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: {
    width: 110,
    height: 110,
    borderRadius: 15,
  },
  border2: {
    width: 115,
    height: 115,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  name: {
    fontSize: 22,
    fontFamily: fonts.primary[700],
    paddingTop: 10,
    color: colors.text.primary,
  },
  desc: {
    fontSize: 12,
    fontFamily: fonts.primary[600],
    paddingTop: 5,
    color: colors.text.primary,
    textAlign: 'center',
  },
});

UserProfile.propTypes = {
  onPress: PropTypes.func.isRequired,
};
