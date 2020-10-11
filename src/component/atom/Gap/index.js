import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';

export default function Gap({height = 0, width = 0}) {
  return <View style={{height: height, width: width}} />;
}

Gap.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};
