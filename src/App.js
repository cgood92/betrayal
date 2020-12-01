import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Provider} from '@ant-design/react-native';

import useBroadcaster from './webrtc/use-broadcaster';
import useMyStream from './webrtc/use-my-stream';
import usePeersWatching from './webrtc/use-peers-watching';

import PeerVideo from './PeerVideo';
import ErrorBoundary from './ErrorBoundary';

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function App() {
  const myVideoStream = useMyStream();
  const peersWatching = usePeersWatching();
  useBroadcaster();

  const videos = [myVideoStream]
    .concat(Object.values(peersWatching))
    .filter(Boolean);

  return (
    <Provider>
      <View style={styles.flexContainer}>
        {videos.map((stream, index) => (
          <PeerVideo key={stream.id} index={index} stream={stream} />
        ))}
      </View>
    </Provider>
  );
}

export default function AppWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
