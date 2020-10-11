import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {colors, fonts} from '../../../utils';

export default function InputText({
  title,
  value,
  onChangeText,
  secureTextEntry = false,
  disable = false,
}) {
  const [border, setBorder] = useState(colors.border.primary);
  const onFocusForm = () => {
    setBorder(colors.border.active);
  };
  const onBlurFrom = () => {
    setBorder(colors.border.primary);
  };
  return (
    <View>
      <Text style={styles.text}>{title}</Text>
      <TextInput
        onFocus={onFocusForm}
        onBlur={onBlurFrom}
        style={styles.input(border)}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        editable={!disable}
        selectTextOnFocus={!disable}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
  },
  input: (border) => ({
    borderWidth: 1,
    borderRadius: 10,
    borderColor: border,
    padding: 12,
    marginTop: 6,
    backgroundColor: colors.dark2,
    color: colors.text.primary,
  }),
});

InputText.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  secureTextEntry: PropTypes.bool,
  disable: PropTypes.bool,
};
