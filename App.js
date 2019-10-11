import React from 'react';
import Header from './Components/Header';
import Welcome from './Components/Welcome';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
  Image
} from 'react-native';
import { send, subscribe } from './Services/chatServer';
import { NAME, CHANNEL, AVATAR } from './constants';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const renderItem = ({ item }) => {
  return (
    <View style={styles.row}>
      <Image style={styles.avatar} source={{ uri: item.avatar }} />
      <View style={styles.rowText}>
        <Text style={styles.sender}>{item.sender}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </View>
  );
};

function ChatApp() {
  const [messages, setMessages] = React.useState([]);
  const [text, setText] = React.useState('');

  React.useEffect(() => {
    subscribe(CHANNEL, messages => {
      setMessages(messages);
    });
  }, []);

  const sendMessage = React.useCallback(async () => {
    await send({
      channel: CHANNEL,
      sender: NAME,
      message: text,
      avatar: AVATAR
    });

    setText('');
  }, [text]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title={CHANNEL} />
      <FlatList data={messages} renderItem={renderItem} inverted />
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.footer}>
          <TextInput
            value={text}
            onChangeText={setText}
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Type something nice"
          />
          <TouchableOpacity onPress={sendMessage}>
            <Text style={styles.send}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const AppNavigator = createStackNavigator(
  {
    ChatApp: ChatApp,
    Home: Welcome
  },
  {
    initialRouteName: 'Home'
  }
);

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3e3e3'
  },
  row: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    backgroundColor: '#eee',
    borderRadius: 12,
    marginBottom: 12,
    marginLeft: 12,
    marginRight: 12
  },
  message: {
    fontSize: 18
  },
  sender: {
    fontWeight: 'bold',
    paddingRight: 10
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#e3e3e3'
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    flex: 1
  },
  send: {
    alignSelf: 'center',
    color: 'teal',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20
  },
  avatar: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginRight: 10
  },
  rowText: {
    flex: 1
  }
});
