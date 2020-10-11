import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';

export default function IsMe({text, date}) {
  return (
    <View style={styles.container}>
      <View style={styles.contant}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 16,
    marginBottom: 20,
    alignItems: 'flex-end',
  },
  contant: {
    padding: 12,
    paddingRight: 18,
    backgroundColor: colors.chat.isMe,
    borderRadius: 10,
    borderBottomRightRadius: 0,
    maxWidth: '80%',
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary,
  },
  date: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginTop: 8,
  },
});

IsMe.propTypes = {
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};
