import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {fonts, colors} from '../../../utils';

export default function Link({title, onPress, align}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.title(align)}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  title: align => ( {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    textAlign: align === 'center' ? 'center' : null,
    marginTop: 15,
  }),
});
