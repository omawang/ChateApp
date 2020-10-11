import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IcPost, NullPhoto} from '../../assets';
import {UserProfile} from '../../component';
import {Fire} from '../../config';
import {colors, fonts, getData} from '../../utils';
import LoaderProfile from '../../utils/LoaderProfile';

const windowWidth = Dimensions.get('window').width;
const photo = windowWidth / 3 - 17;

export default function Profile({navigation}) {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    uid: '',
  });
  // const [photoContent, setPhotoContent] = useState('');
  const [content, setContent] = useState([]);

  useEffect(() => {
    getData('user').then((res) => {
      const data = res;
      data.photo = res?.photo?.length > 1 ? {uri: res.photo} : NullPhoto;
      setProfile(data);
    });
    getDataFire();
  }, [profile.uid]);

  // upload PhotoData

  const getDataFire = () => {
    setLoading(true);
    const url = 'contentUser/';
    Fire.database()
      .ref(url)
      // eslint-disable-next-line no-shadow
      .on('value', (content) => {
        if (content.val()) {
          const dataContent = content.val();
          const newData = [];
          Object.keys(dataContent).map((item) => {
            newData.push({
              id: item,
              data: dataContent[item],
            });
          });
          setLoading(false);
          setContent(newData);
        }
      });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Your Profile</Text>
          <UserProfile
            onPress={() => navigation.navigate('SettingProfile', profile)}
          />

          {/* post photo */}

          <TouchableOpacity
            style={styles.postPhoto}
            onPress={() => navigation.navigate('ShareMoments', profile)}>
            <IcPost />
            <Text style={styles.post}>post your moments</Text>
          </TouchableOpacity>
        </View>

        {/* data Content */}
        <>
          <View style={styles.containerContent}>
            <Text style={styles.titleContent}>Post</Text>

            {loading && <LoaderProfile />}
            <View style={styles.contentContent}>
              {content.map((item, index) => {
                const isMe = item.data.uid === profile.uid;
                console.log(isMe);
                if (isMe) {
                  return (
                    <Image
                      key={`${index}-${item.id}`}
                      source={{uri: item.data.imageContent}}
                      style={styles.photoContent}
                    />
                  );
                }
                return <View key={`${index}-${item.id}`} />;
              })}
            </View>
          </View>
        </>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  content: {alignItems: 'center', flex: 1},
  page: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  title: {
    textAlign: 'center',
    fontFamily: fonts.primary[600],
    fontSize: 18,
    color: colors.text.primary,
    paddingBottom: 15,
  },
  postPhoto: {
    width: 125,
    height: 55,
    backgroundColor: colors.background.primary,
    opacity: 7,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  post: {
    fontSize: 12,
    color: colors.text.secondary,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
  },
  containerContent: {
    flex: 1,
    maxWidth: windowWidth,
  },
  titleContent: {
    fontSize: 18,
    fontFamily: fonts.primary[700],
    color: colors.text.primary,
    paddingTop: 20,
  },
  contentContent: {
    flexDirection: 'row',
    paddingTop: 10,
    flexWrap: 'wrap',
  },
  photoContent: {
    height: photo,
    width: photo,
    margin: 3,
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};
