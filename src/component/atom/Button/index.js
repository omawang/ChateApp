import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {colors, fonts} from '../../../utils';
import {IcBackLight} from '../../../assets';

export default function Button({
  onPress,
  title,
  type,
  header = false,
  disable = false,
}) {
  if (header) {
    return (
      <TouchableOpacity onPress={onPress}>
        {type === 'Dark' ? <IcBackLight /> : <IcBackLight />}
      </TouchableOpacity>
    );
  }

  if (disable) {
    return (
      <View style={styles.disableBg}>
        <Text style={styles.disableText}>{title}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    backgroundColor: colors.button.primary,
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    color: colors.text.primary,
    textAlign: 'center',
    fontFamily: fonts.primary.normal,
  },
  disableBg: {
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.disable.background,
  },
  disableText: {
    fontSize: 18,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
    color: colors.disable.text,
  },
});

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string,
  type: PropTypes.string,
  header: PropTypes.bool,
  disable: PropTypes.bool,
};
