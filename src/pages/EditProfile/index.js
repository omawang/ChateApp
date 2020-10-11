import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Gap, Header, InputText, ProfilePhoto} from '../../component';
import {colors, useForm, storeData, showError, showSuccess} from '../../utils';
import {Fire} from '../../config';
import ImagePicker from 'react-native-image-picker';

export default function EditProfile({navigation, route}) {
  const {fullName, email, photo, bio, uid, noPhone} = route.params;
  const [photoForDB, setPhotoForDB] = useState('');
  const [profile, setProfile] = useForm({
    email: email,
    fullName: fullName.length <= 0 ? '' : fullName,
    photo: photo.length <= 0 ? '' : photo,
    bio: bio.length <= 0 ? '' : bio,
    uid: uid,
    noPhone: noPhone,
  });

  const dataNew = {
    fullName: profile.fullName,
    noPhone: profile.noPhone,
    email: profile.email,
    uid: profile.uid,
    bio: profile.bio.length <= 0 ? 'Edit Your Biodata' : profile.bio,
    photo: photoForDB.length <= 0 ? photo.uri : photoForDB,
  };

  // Upload Photo

  const options = {
    title: 'Select Your Photo',

    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const UploadPhoto = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        showError('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = {uri: response.uri};

        setProfile('photo', source);
        setPhotoForDB(`data:${response.type};base64, ${response.data}`);

        // setPhotoForDB(photoData);
      }
    });
  };

  console.log('new Data', dataNew);

  const uploadAndContinue = () => {
    Fire.database().ref(`users/${uid}/`).update(dataNew);
    storeData('user', dataNew);
    showSuccess('Your profile has been updated successfully');
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <Header title="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <ProfilePhoto photo={profile.photo} onPress={UploadPhoto} />
          <Gap height={26} />
          <View>
            <InputText
              title="Full Name"
              value={profile.fullName}
              onChangeText={(value) => setProfile('fullName', value)}
            />
            <Gap height={24} />
            <InputText
              title="No Phone"
              value={profile.noPhone}
              disable
              onChangeText={(value) => setProfile('noPhone', value)}
            />
            <Gap height={24} />
            <InputText
              title="Email Address"
              disable
              value={profile.email}
              onChangeText={(value) => setProfile('email', value)}
            />
            <Gap height={24} />
            <InputText
              title="Your Biodata"
              value={profile.bio}
              onChangeText={(value) => setProfile('bio', value)}
            />
          </View>
          <View>
            <Gap height={60} />
            <Button title="Save Profile" onPress={uploadAndContinue} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  content: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
});

EditProfile.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};
