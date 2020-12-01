import {useEffect, useState} from 'react';

import {constraints} from './constants';

let myStream;

export default function useBroadcaster() {
  const [_myStream, _setMyStream] = useState(myStream);

  useEffect(() => {
    if (!myStream) {
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        _setMyStream(stream);
        myStream = stream;
      });
    }
  }, []);

  return _myStream;
}
