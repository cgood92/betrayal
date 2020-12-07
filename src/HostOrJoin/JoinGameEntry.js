import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, TextareaItem} from '@ant-design/react-native';
import {useHistory} from 'react-router-native';

const styles = StyleSheet.create({
  input: {
    alignSelf: 'center',
    width: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 4,
  },
});

export default function JoinGameEntry() {
  const history = useHistory();
  const [code, setCode] = useState('');

  const onPress = useCallback(() => {
    if (code.length === 6) {
      const joinLink = `/join/${code}`;
      history.push(joinLink);
    }
  }, [code]);

  return (
    <View>
      <TextareaItem
        autoFocus
        count={6}
        onChange={setCode}
        placeholder="Party code"
        style={styles.input}
        value={code}
      />
      <Button onPress={onPress} type="primary">
        Join a game
      </Button>
    </View>
  );
}
