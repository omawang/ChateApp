import React from 'react';
import PropTypes from 'prop-types';
import {IsMe, Other} from '..';

export default function ChatItem({isMe = false, text, date, photo}) {
  if (isMe) {
    return <IsMe text={text} date={date} />;
  }
  return <Other text={text} date={date} photo={photo} />;
}

ChatItem.propTypes = {
  isMe: PropTypes.bool,
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  photo: PropTypes.string,
};
