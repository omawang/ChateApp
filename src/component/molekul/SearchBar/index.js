import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {colors, fonts} from '../../../utils';
import {IcSearch} from '../../../assets';

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <IcSearch />
      <TextInput placeholder="Search..." style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    color: colors.text.primary,
    backgroundColor: colors.background.primary,
    borderRadius: 15,
    fontFamily: fonts.primary.normal,
    flex: 1,
  },
});
