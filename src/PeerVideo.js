import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Video from './Video';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    minWidth: '33%',
    maxWidth: '50%',
    height: 'auto',
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default function PeerVideo({index, stream}) {
  return (
    <View style={styles.container}>
      <Text>Stream {index}</Text>
      <Video stream={stream} />
    </View>
  );
}
