import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';

export default function Other({text, date, photo}) {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.contant}>
          <Text style={styles.text}>{text}</Text>
        </View>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    marginBottom: 20,
    alignItems: 'flex-end',
    flexDirection: 'row',
    maxWidth: '80%',
  },
  contant: {
    padding: 12,
    paddingRight: 18,
    backgroundColor: colors.chat.other,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
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

Other.propTypes = {
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  photo: PropTypes.string,
};
