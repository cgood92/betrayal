import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {io} from 'socket.io-client';

const SOCKET_SERVER = 'https://zq38u.sse.codesandbox.io';

let socket = null;

const isWeb = Platform.OS === 'web';

if (isWeb) {
  window.onunload = window.onbeforeunload = () => {
    socket && socket.close();
  };
}

export default function useSocket() {
  const [_socket, _setSocket] = useState(socket);

  useEffect(() => {
    if (!socket) {
      socket = io.connect(SOCKET_SERVER);
    }

    _setSocket(socket);
  }, []);

  return _socket;
}
