import {useEffect, useRef, useState} from 'react';
import {Platform} from 'react-native';

import useSocket from '../socket.io/use-socket';
import {config} from './constants';

const isWeb = Platform.OS === 'web';

export default function usePeersWatching() {
  const socket = useSocket();

  const watchingConnections = useRef({});
  const [peersWatching, setPeersWatching] = useState({});

  useEffect(() => {
    if (socket) {
      socket.on('offer', (id, description) => {
        const watcherConnection = new RTCPeerConnection(config);
        watchingConnections.current[id] = watcherConnection;

        watcherConnection
          .setRemoteDescription(description)
          .then(() => watcherConnection.createAnswer())
          .then((sdp) => watcherConnection.setLocalDescription(sdp))
          .then(() => {
            socket.emit('answer', id, watcherConnection.localDescription);
          });

        if (isWeb) {
          watcherConnection.ontrack = (event) => {
            setPeersWatching((prev) => ({
              ...prev,
              [id]: event.streams[0],
            }));
          };
        } else {
          watcherConnection.onaddstream = (event) => {
            setPeersWatching((prev) => ({
              ...prev,
              [id]: event.stream,
            }));
          };
        }

        watcherConnection.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit('watchCandidate', id, event.candidate);
          }
        };
      });

      socket.on('connect', () => {
        socket.emit('canWatch');
      });

      socket.on('canBroadcast', () => {
        socket.emit('canWatch');
      });

      socket.on('broadcastCandidate', (id, candidate) => {
        watchingConnections.current[id]
          .addIceCandidate(new RTCIceCandidate(candidate))
          .catch((e) => console.error(e));
      });

      socket.on('disconnectPeer', (id) => {
        watchingConnections.current[id].close();
        setPeersWatching((previous) => {
          const {[id]: toRemove, ...rest} = previous;
          return rest;
        });
      });
    }
  }, [socket]);

  return peersWatching;
}
