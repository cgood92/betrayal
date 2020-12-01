import {useEffect, useRef} from 'react';
import {Platform} from 'react-native';

import useSocket from '../socket.io/use-socket';
import {config} from './constants';
import useMyStream from './use-my-stream';

const isWeb = Platform.OS === 'web';

export default function useBroadcaster() {
  const socket = useSocket();
  const myStream = useMyStream();

  const broadcastingConnections = useRef({});

  useEffect(() => {
    if (myStream) {
      socket.emit('canBroadcast');

      socket.on('canWatch', (id) => {
        const peerConnection = new RTCPeerConnection(config);
        broadcastingConnections.current[id] = peerConnection;

        addStream(myStream, peerConnection);

        peerConnection.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit('broadcastCandidate', id, event.candidate);
          }
        };

        peerConnection
          .createOffer()
          .then((description) =>
            peerConnection.setLocalDescription(description),
          )
          .then(() =>
            socket.emit('offer', id, peerConnection.localDescription),
          );
      });

      socket.on('answer', (id, description) =>
        broadcastingConnections.current[id].setRemoteDescription(description),
      );

      socket.on('watchCandidate', (id, candidate) =>
        broadcastingConnections.current[id]
          .addIceCandidate(new RTCIceCandidate(candidate))
          .catch((e) => console.error(e)),
      );

      socket.on('disconnectPeer', (id) => {
        broadcastingConnections.current[id].close();
        delete broadcastingConnections.current[id];
      });
    }
  }, [myStream]);
}

function addStream(stream, peerConnection) {
  if (isWeb) {
    stream
      .getTracks()
      .forEach((track) => peerConnection.addTrack(track, stream));
  } else {
    peerConnection.addStream(stream);
  }
}
