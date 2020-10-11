import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ListItem} from '../../component';
import {Fire} from '../../config';
import {colors, fonts, getData} from '../../utils';
import LoaderMessage from '../../utils/LoaderMessage';

export default function Message({navigation}) {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    uid: '',
  });

  useEffect(() => {
    getDataUser();
    GetDataFire();
  }, [profile.uid]);

  const getDataUser = () => {
    getData('user').then((res) => {
      setProfile(res);
      console.log(res);
    });
  };

  const GetDataFire = () => {
    setLoading(true);
    const url = 'users/';
    Fire.database()
      .ref(url)
      // eslint-disable-next-line no-shadow
      .on('value', (content) => {
        if (content.val()) {
          const dataContent = content.val();
          const allDataContent = [];
          const newData = [];

          Object.keys(dataContent).map((itemContent) => {
            newData.push({
              id: itemContent,
              data: dataContent[itemContent],
            });
          });

          Object.keys(newData).map((item) => {
            allDataContent.push({
              id: item,
              data: newData[item],
            });
          });
          setLoading(false);
          setContent(newData);
        }
      });
  };

  // const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* <SearchBar /> */}
        <Text style={styles.title}>Message</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {loading && <LoaderMessage />}
        {content.map((item, index) => {
          const data = item.data;
          const isMe = item.data.uid === profile.uid;

          return (
            <ListItem
              key={`${index}-${item.uid}`}
              onPress={() => navigation.navigate('Chatting', data)}
              photo={{uri: item.data.photo}}
              name={item.data.fullName}
              desc={item.data.bio}
              isMe={isMe}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: colors.dark,
    flex: 1,
  },
  content: {paddingHorizontal: 16},
  title: {
    paddingTop: 25,
    fontFamily: fonts.primary[600],
    fontSize: 18,
    color: colors.text.primary,
  },
});

Message.propTypes = {
  navigation: PropTypes.object,
};
