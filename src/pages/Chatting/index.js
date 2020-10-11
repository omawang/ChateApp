import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
import {Header, ChatContent, Gap, InputChat} from '../../component';
import {fonts, colors, getData, setDateChat, getTimeChat} from '../../utils';
import {Fire} from '../../config';

// eslint-disable-next-line no-unused-vars
const Width = Dimensions.get('window').width;
// eslint-disable-next-line no-unused-vars
const Height = Dimensions.get('window').height;

export default function Chatting({navigation, route}) {
  const {fullName, photo, uid} = route.params;
  const [chatContent, setChatContent] = useState('');
  const [chatData, setChatData] = useState([]);
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    uid: '',
  });

  useEffect(() => {
    getDataLoka();
    getChatData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid, profile.uid]);

  const getDataLoka = () => {
    getData('user').then((res) => {
      setProfile(res);
    });
  };

  const PushChat = () => {
    const today = new Date();
    const chatIdUser = `${profile.uid}_${uid}`;
    const chatId = `${uid}_${profile.uid}`;
    const url = `chatting/${chatIdUser}/allChat/${setDateChat(today)}`;
    const urlUser = `chatting/${chatId}/allChat/${setDateChat(today)}`;
    const dataChat = {
      sendBy: profile.uid,
      chatDate: new Date().getTime(),
      chatTime: getTimeChat(today),
      chatContent: chatContent,
    };

    Fire.database()
      .ref(url)
      .push(dataChat)
      .then((res) => {
        Fire.database().ref(urlUser).push(dataChat);
        setChatContent('');
      });
  };

  const getChatData = () => {
    const rootDb = Fire.database().ref();

    const ChatIdUser = `${profile.uid}_${uid}`;
    const ChatId = `${uid}_${profile.uid}`;
    const url = `chatting/${ChatId}/allChat/`;
    const urlUser = `chatting/${ChatIdUser}/allChat/`;
    const messageDb = rootDb.child(url);

    messageDb.on('value', async (snapshot) => {
      if (snapshot.val()) {
        const dataSnapshot = snapshot.val();
        const allDataChat = [];
        const promises = await Object.keys(dataSnapshot).map(async (key) => {
          // Join Database
          const messageDbUser = await rootDb.child(urlUser).once('value');

          const dataChat = dataSnapshot[key];
          const newData = [];

          Object.keys(dataChat).map((itemChat) => {
            newData.push({
              id: itemChat,
              messageDbUser: messageDbUser.val(),
              data: dataChat[itemChat],
            });
          });

          allDataChat.push({
            id: key,
            data: newData,
          });
        });
        await Promise.all(promises);
        console.log('new data', allDataChat);
        setChatData(allDataChat);
      }
    });
  };

  console.log(chatData);

  return (
    <View style={styles.container}>
      <Header
        title={fullName}
        type="Dark"
        onPress={() => navigation.goBack()}
        photo={{uri: photo}}
      />
      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={(scroll) => {
            this.scroll = scroll;
          }}
          onContentSizeChange={() => this.scroll.scrollToEnd()}>
          {chatData.map((item) => {
            return (
              <View key={item.id}>
                <Text style={styles.date}>{item.id}</Text>
                <Gap height={23} />
                {item.data.map((itemChat, index) => {
                  const isMe = profile.uid === itemChat.data.sendBy;
                  return (
                    <ChatContent
                      key={`${item.id}-${index}`}
                      isMe={isMe}
                      text={itemChat.data.chatContent}
                      date={itemChat.data.chatTime}
                    />
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>
      <InputChat
        name={fullName}
        disable={chatContent <= 0 ? true : false}
        onChangeText={(value) => setChatContent(value)}
        value={chatContent}
        onPress={PushChat}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: colors.dark2, flex: 1},
  content: {flex: 1},
  date: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginVertical: 20,
    textAlign: 'center',
  },
});

Chatting.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};
