import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  IcHome,
  IcHomeAvtive,
  IcMessage,
  IcMessageActive,
  IcProfile,
  IcProfileActive,
} from '../../../assets';
import {colors, fonts} from '../../../utils';

export default function TabItem({title, active, onPress, onLongPress}) {
  const Icon = () => {
    if (title === 'Home') {
      return active ? <IcHomeAvtive /> : <IcHome />;
    }
    if (title === 'Message') {
      return active ? <IcMessageActive /> : <IcMessage />;
    }
    if (title === 'Profile') {
      return active ? <IcProfileActive /> : <IcProfile />;
    }
    return <IcHome />;
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Icon />
      <Text style={styles.title(active)}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: (active) => ({
    fontSize: 10,
    fontFamily: fonts.primary.normal,
    marginTop: 4,
    color: active ? colors.text.active : colors.text.inactive,
  }),
});

TabItem.propTypes = {
  title: PropTypes.string,
  active: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  onLongPress: PropTypes.func,
};
