import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import {IlWelcome} from '../../assets';
import {Button, Gap, Link} from '../../component';
import {colors, fonts} from '../../utils';

export default function GetStarted({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <IlWelcome />
        <Text
          style={styles.title}>{`Start your day\nby greeting the world`}</Text>
      </View>
      <View>
        <Button title="Sign In" onPress={() => navigation.navigate('Login')} />
        <Gap height={16} />
        <Link
          align="center"
          title="Create New Account"
          onPress={() => navigation.navigate('Daftar')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 50,
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.dark,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    textAlign: 'center',
    marginTop: 30,
  },
  logo: {
    alignItems: 'center',
    marginTop: 70,
  },
});

GetStarted.propTypes = {
  navigation: PropTypes.object,
};
