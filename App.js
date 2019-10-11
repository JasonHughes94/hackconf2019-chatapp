import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { send, subscribe } from './chatServer';

const NAME = 'Jason';
const CHANNEL = 'hackconf';

const renderItem = ({ item }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.sender}>{item.sender}</Text>
      <Text style={styles.message}>{item.message}</Text>
    </View>
  );
};

export default function App() {
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    subscribe(CHANNEL, messages => {
      setMessages(messages);
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList data={messages} renderItem={renderItem} inverted />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3e3e3'
  },
  row: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    backgroundColor: '#eee'
  },
  message: {
    fontSize: 18
  },
  sender: {
    fontWeight: 'bold',
    paddingRight: 10
  }
});
