import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from '@ant-design/react-native';
import {useHistory} from 'react-router-native';
import JoinGameEntry from './JoinGameEntry';

const styles = StyleSheet.create({
  navContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
});

export default function HostOrJoin() {
  const history = useHistory();

  return (
    <View style={styles.navContainer}>
      <Button onPress={() => history.push('/host')}>Host a game</Button>
      <JoinGameEntry />
    </View>
  );
}
