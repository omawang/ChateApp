import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {Button, Gap, Header} from '../../component';
import {colors, fonts, showError, setDate, getTime} from '../../utils';
import {Fire} from '../../config';
import ImagePicker from 'react-native-image-picker';
import {ImagePick} from '../../assets';

export default function ShareMoments({navigation, route}) {
  const {fullName, photo, uid} = route.params;
  const [moments, setMoments] = useState('');
  const [imageMoments, setImageMoments] = useState(ImagePick);
  const [border, setBorder] = useState(colors.border.secondary);
  const [momentsDb, setMomentsDb] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);

  const onFocusForm = () => {
    setBorder(colors.border.active);
  };
  const onBlurFrom = () => {
    setBorder(colors.border.secondary);
  };

  // Upload Photo

  const options = {
    title: 'Select Your Photo',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const UploadMoments = () => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        showError(`You don't take pictures`);
      } else if (response.error) {
        showError('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};
        setImageMoments(source);
        setMomentsDb(`data:${response.type};base64, ${response.data}`);
        setHasPhoto(true);
      }
    });
  };

  // ============

  // useEffect(() => {});

  const UploadData = () => {
    const profile = photo.uri;
    const today = new Date();

    const data = {
      photo: profile,
      uid: uid,
      fullName: fullName,
      content: moments,
      imageContent: momentsDb,
      date: getTime(today) + setDate(today),
    };

    console.log('data', data);

    const urlUser = `contentUser`;

    Fire.database().ref(urlUser).push(data);
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <Header
        title="Share Your Experience"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={UploadMoments}>
          <Image source={imageMoments} style={styles.image} />
        </TouchableOpacity>
        <Gap height={50} />
        <TextInput
          style={styles.input(border)}
          placeholder="Share Your Experience"
          placeholderTextColor={'white'}
          onFocus={onFocusForm}
          onBlur={onBlurFrom}
          value={moments}
          onChangeText={(value) => setMoments(value)}
        />
        <Gap height={150} />
        <Button title="Continue" onPress={UploadData} disable={!hasPhoto} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    flex: 1,
  },
  content: {
    padding: 16,
    flex: 1,
  },
  image: {
    height: 150,
    width: 150,
    paddingTop: 35,
    borderRadius: 10,
  },
  input: (border) => ({
    borderBottomColor: border,
    borderBottomWidth: 1,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    // backgroundColor: colors.dark2,
  }),
});

ShareMoments.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};
