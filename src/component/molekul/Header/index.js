import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Button, Gap} from '../../atom';
import {colors, fonts} from '../../../utils';

export default function Header({onPress, title, type, photo}) {
  return (
    <View style={styles.container(type)}>
      <Button type={type} onPress={onPress} Header="Header" />
      <View style={styles.content}>
        <Text style={styles.title(type)}>{title}</Text>
      </View>
      {type === 'Dark' ? <Image source={photo} style={styles.avatar} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: (type) => ({
    flexDirection: 'row',
    paddingVertical: 30,
    backgroundColor: type === 'Dark' ? colors.dark : colors.dark,
    paddingHorizontal: 16,
    alignItems: 'center',
  }),
  content: {
    flex: 1,
  },
  title: (type) => ({
    fontFamily: fonts.primary[600],
    color: type === 'Dark' ? colors.text.primary : colors.text.primary,
    fontSize: 20,
    textAlign: 'center',
  }),
  avatar: {
    height: 46,
    width: 46,
    borderRadius: 46 / 2,
  },
});
