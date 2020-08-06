import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  IcEditPassword,
  IcEditProfile,
  IcRate,
  IcSingout,
  IcNext,
} from '../../../assets';
import {colors, fonts} from '../../../utils';

export default function ListItem({onPress, name, desc, photo, icon}) {
  const Icon = () => {
    if (icon === 'edit_profile') {
      return <IcEditProfile />;
    }
    if (icon === 'edit_pass') {
      return <IcEditPassword />;
    }
    if (icon === 'rate') {
      return <IcRate />;
    }
    if (icon === 'singout') {
      return <IcSingout />;
    }
    return <IcEditProfile />;
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon ? <Icon /> : <Image source={photo} style={styles.profile} />}
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
      {icon ? <IcNext /> : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: colors.dark2,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  content: {
    paddingVertical: 16,
    flex: 1,
  },
  profile: {
    height: 46,
    width: 46,
    borderRadius: 46 / 2,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginLeft: 12,
  },
  desc: {
    fontSize: 12,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginLeft: 12,
  },
});
