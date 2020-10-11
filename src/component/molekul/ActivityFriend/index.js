import React from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet, Text, View} from 'react-native';
import ViewMoreText from 'react-native-view-more-text';
import {colors, fonts} from '../../../utils';

const Viewmore = {
  renderViewMore(onPress) {
    return (
      <Text onPress={onPress} style={styles.link}>
        View more
      </Text>
    );
  },
  renderViewLess(onPress) {
    return (
      <Text onPress={onPress} style={styles.link}>
        View less
      </Text>
    );
  },
};

export default function ActivityFriend({photo, desc, name, imageContent}) {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Image source={photo} style={styles.profile} />

          <Text style={styles.name}>{name}</Text>
        </View>
        <Image source={imageContent} style={styles.image} />
        <View>
          <ViewMoreText
            numberOfLines={1}
            renderViewMore={Viewmore.renderViewMore}
            renderViewLess={Viewmore.renderViewLess}
            textStyle={styles.desc}>
            <Text>{desc}</Text>
          </ViewMoreText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {padding: 16},
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profile: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
  },
  name: {
    padding: 5,
    fontSize: 14,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
  image: {
    alignSelf: 'center',
    height: 300,
    width: 300,
    borderRadius: 10,
    marginTop: 10,
  },
  page: {
    margin: 16,
    backgroundColor: colors.dark2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  link: {
    color: colors.text.secondary,
    fontFamily: fonts.primary[700],
    fontSize: 14,
  },
  desc: {
    textAlign: 'justify',
    paddingTop: 10,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
  },
});

ActivityFriend.propTypes = {
  photo: Image.propTypes.source.isRequired,
  desc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imageContent: Image.propTypes.source.isRequired,
};
