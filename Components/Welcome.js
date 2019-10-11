import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function Welcome({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Chat App"
        onPress={() => navigation.navigate('ChatApp')}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    color: 'teal'
  }
});
