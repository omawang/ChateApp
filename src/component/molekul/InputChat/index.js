import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {IcSendActive} from '../../../assets';
import {colors, fonts} from '../../../utils';

const ButtonIcon = ({disable = false, onPress}) => {
  if (disable) {
    return (
      <View style={styles.send(disable)}>
        <IcSendActive />
      </View>
    );
  }
  return (
    <TouchableOpacity style={styles.send(disable)} onPress={onPress}>
      <IcSendActive />
    </TouchableOpacity>
  );
};

ButtonIcon.propTypes = {
  disable: PropTypes.bool,
  onPress: PropTypes.func,
};

export default function InputChat({
  name,
  disable = false,
  onPress,
  value,
  onChangeText,
}) {
  return (
    <View style={styles.container}>
      <View>
        {/* <TouchableOpacity style={styles.emot}>
          <IcEmot />
        </TouchableOpacity> */}
      </View>
      <TextInput
        style={styles.input}
        placeholder={`Tulis pesan untuk ${name}`}
        value={value}
        onChangeText={onChangeText}
      />
      <ButtonIcon disable={disable} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  input: {
    backgroundColor: colors.inputchat.primary,
    borderRadius: 10,
    padding: 14,
    height: 45,
    flex: 1,
    fontFamily: fonts.primary[600],
  },
  send: (disable) => ({
    width: 45,
    height: 45,
    backgroundColor: disable ? colors.dark : colors.inputchat.btn,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 7,
  }),
  emot: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
});

InputChat.propTypes = {
  name: PropTypes.string.isRequired,
  disable: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
};
